import React, { useState, useEffect } from 'react';
import { Sprout, Users, IndianRupee, Sparkles, TrendingUp, Calendar, Bell } from 'lucide-react';
import SalesChart from '../../components/SalesChart';

const AdminDashboard = () => {
  const [plantCount, setPlantCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchPlantCount = async () => {
    try {
      const res = await fetch('/api/plants');
      if (res.ok) {
        const data = await res.json();
        setPlantCount(data.length);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUserCount = async () => {
    try {
      const res = await fetch('/api/auth');
      if (res.ok) {
        const data = await res.json();
        setUserCount(data.length);
        setRecentUsers(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOrdersData = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        const ordersList = data.data || [];
        setOrderCount(ordersList.length);
        setRecentOrders(ordersList);
        
        // Sum up totalAmount of all delivered orders
        const deliveredOrders = ordersList.filter(o => o.orderStatus === 'Delivered');
        const sum = deliveredOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
        setTotalRevenue(sum);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPlantCount();
    fetchUserCount();
    fetchOrdersData();
  }, []);

  useEffect(() => {
    const list = [];
    
    // 1. Static system online alert
    list.push({
      id: 'db-status',
      title: 'Greenhouse Systems Online',
      description: 'Nursery database and server connections are nominal.',
      time: 'Just now',
      unread: true
    });

    // 2. Revenue Milestone
    if (totalRevenue > 0) {
      list.push({
        id: 'revenue-alert',
        title: 'Revenue Milestone Reach',
        description: `Total revenue reaches ₹${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`,
        time: '5m ago',
        unread: true
      });
    }

    // 3. Dynamic new orders list
    const pendingOrders = recentOrders.filter(o => o.orderStatus === 'Confirmed');
    if (pendingOrders.length > 0) {
      pendingOrders.slice(0, 2).forEach((order, idx) => {
        list.push({
          id: `order-${order._id}`,
          title: 'Pending Order Confirmed',
          description: `Order #${order._id.substring(order._id.length - 8).toUpperCase()} is awaiting logistics processing.`,
          time: idx === 0 ? '10m ago' : '1h ago',
          unread: true
        });
      });
    }

    // 4. Dynamic new users list
    if (recentUsers.length > 0) {
      const sortedUsers = [...recentUsers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      sortedUsers.slice(0, 2).forEach((userRecord, idx) => {
        list.push({
          id: `user-${userRecord._id}`,
          title: 'New Member Onboarded',
          description: `${userRecord.fullname} registered a new account profile.`,
          time: idx === 0 ? '2h ago' : '1d ago',
          unread: true
        });
      });
    }

    setNotifications(list);
    setUnreadCount(list.length);
  }, [recentOrders, recentUsers, totalRevenue]);

  return (
    <div className="space-y-10">
      
      {/* Top Welcome Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-base-200/50 p-6 rounded-3xl border border-base-300/40 glass-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold font-heading text-base-content">GreenThumb Control Console</h1>
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <p className="text-base-content/70 text-sm">System parameters: online. Greenhouse status: nominal.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-base-100 border border-base-300/40 text-base-content/80 flex items-center gap-2 text-sm font-semibold">
            <Calendar className="h-4.5 w-4.5 text-primary" />
            <span>{new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setUnreadCount(0);
              }}
              className="p-3 rounded-xl bg-base-100 border border-base-300/40 text-base-content/80 cursor-pointer hover:text-primary transition-all relative flex items-center justify-center h-11 w-11 focus:outline-none"
              aria-label="Toggle notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-error border-2 border-base-100 rounded-full"></span>
              )}
            </button>

            {/* Notifications popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 p-4 shadow-2xl border border-base-300 rounded-2xl w-80 animate-fade-in-up z-50 text-left space-y-3 opaque-dropdown">
                <div className="flex justify-between items-center pb-2 border-b border-base-300/40">
                  <span className="font-extrabold text-sm tracking-tight text-base-content font-heading">Greenhouse Alerts</span>
                  <button 
                    onClick={() => {
                      setNotifications([]);
                      setUnreadCount(0);
                    }} 
                    className="text-xs font-semibold text-primary hover:text-accent transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {notifications.length > 0 ? (
                    notifications.map(n => (
                      <div key={n.id} className="p-3 rounded-xl bg-base-200 border border-base-300/20 text-xs space-y-1 hover:bg-base-300/30 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-base-content font-heading">{n.title}</span>
                          <span className="text-[10px] text-base-content/50">{n.time}</span>
                        </div>
                        <p className="text-base-content/75 leading-relaxed">{n.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-base-content/50 text-xs">
                      No active greenhouse alerts.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Statistics Tiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat: Total Plants */}
        <div className="p-6 rounded-[28px] border border-base-300/40 bg-gradient-to-tr from-primary/10 to-primary-focus/5 shadow-md flex justify-between items-start relative overflow-hidden group">
          <div className="space-y-4 relative z-10">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Active Inventory</span>
            <div className="space-y-1">
              <h2 className="text-5xl font-extrabold text-base-content font-heading">{plantCount}</h2>
              <p className="text-emerald-500 font-semibold text-sm flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> +12% this week
              </p>
            </div>
          </div>
          <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-300 relative z-10">
            <Sprout className="w-8 h-8" />
          </div>
        </div>

        {/* Stat: Total Users */}
        <div className="p-6 rounded-[28px] border border-base-300/40 bg-gradient-to-tr from-accent/10 to-accent-focus/5 shadow-md flex justify-between items-start relative overflow-hidden group">
          <div className="space-y-4 relative z-10">
            <span className="text-accent font-bold text-sm tracking-wider uppercase">Registered Users</span>
            <div className="space-y-1">
              <h2 className="text-5xl font-extrabold text-base-content font-heading">{userCount}</h2>
              <p className="text-emerald-500 font-semibold text-sm flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> +8% this month
              </p>
            </div>
          </div>
          <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:scale-110 transition-transform duration-300 relative z-10">
            <Users className="w-8 h-8" />
          </div>
        </div>

        {/* Stat: Total Revenue */}
        <div className="p-6 rounded-[28px] border border-base-300/40 bg-gradient-to-tr from-primary/10 to-primary-focus/5 shadow-md flex justify-between items-start relative overflow-hidden group">
          <div className="space-y-4 relative z-10">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Total Revenue</span>
            <div className="space-y-1">
              <h2 className="text-5xl font-extrabold text-base-content font-heading">
                ₹{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              <p className="text-emerald-500 font-semibold text-sm flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> +15% more than last week
              </p>
            </div>
          </div>
          <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-300 relative z-10">
            <IndianRupee className="w-8 h-8" />
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="p-6 sm:p-8 rounded-[28px] border border-base-300/40 bg-base-200/50 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-base-content font-heading">Financial Metrics</h2>
          <span className="badge badge-primary border-none font-bold text-xs px-3 py-2.5">Live Feed</span>
        </div>
        <div className="h-96 w-full flex items-center justify-center p-2 rounded-2xl bg-base-100 border border-base-300/30 overflow-hidden shadow-inner">
          <SalesChart />
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;