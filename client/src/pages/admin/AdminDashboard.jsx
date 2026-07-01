import React, { useState, useEffect } from 'react';
import { Sprout, Users, DollarSign, Sparkles, TrendingUp, Calendar, Bell } from 'lucide-react';
import SalesChart from '../../components/SalesChart';

const AdminDashboard = () => {
  const [plantCount, setPlantCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

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
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOrderCount = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrderCount(data.data?.length || 0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPlantCount();
    fetchUserCount();
    fetchOrderCount();
  }, []);

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
          <div className="p-3 rounded-xl bg-base-100 border border-base-300/40 text-base-content/80 cursor-pointer hover:text-primary transition-colors">
            <Bell className="h-4.5 w-4.5" />
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
              <h2 className="text-5xl font-extrabold text-base-content font-heading">₹12,000</h2>
              <p className="text-emerald-500 font-semibold text-sm flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> +15% more than last week
              </p>
            </div>
          </div>
          <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-300 relative z-10">
            <DollarSign className="w-8 h-8" />
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