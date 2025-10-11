import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShoppingBag, Calendar, DollarSign, Package, Truck, XCircle } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchOrders = async () => {
    if (user) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
          method: 'PUT',
        });
        if (response.ok) {
          fetchOrders(); // Refresh the orders list
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to cancel order');
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('An error occurred while cancelling the order.');
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p>You need to be logged in to view your orders.</p>
        </div>
      </div>
    );
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 'Delivered':
        return { icon: <Truck size={20} className="text-success" />, text: 'Delivered', color: 'text-success' };
      case 'Shipped':
        return { icon: <Truck size={20} className="text-info" />, text: 'Shipped', color: 'text-info' };
      case 'Processing':
        return { icon: <Package size={20} className="text-warning" />, text: 'Processing', color: 'text-warning' };
      case 'Confirmed':
        return { icon: <Package size={20} className="text-primary" />, text: 'Confirmed', color: 'text-primary' };
      case 'Cancelled':
        return { icon: <XCircle size={20} className="text-error" />, text: 'Cancelled', color: 'text-error' };
      default:
        return { icon: <Package size={20} />, text: status, color: 'text-gray-500' };
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-center">My Orders</h1>
          <p className="text-center text-gray-500 mt-2">Manage Your Current & Past Orders.</p>
        </header>

        {orders.length === 0 ? (
          <div className="text-center bg-base-100 p-16 rounded-2xl shadow-lg">
            <ShoppingBag size={64} className="mx-auto text-primary mb-6" />
            <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-base-content/70">When you place an order, it will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => {
              const statusInfo = getStatusInfo(order.orderStatus);
              const canBeCancelled = order.orderStatus === 'Confirmed' || order.orderStatus === 'Processing';
              return (
                <div key={order._id} className="card bg-base-100 shadow-xl transition-all hover:shadow-2xl">
                  <div className="card-body p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-bold text-lg">Order #{order._id.substring(0, 8)}</p>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Calendar size={16} className="mr-2" />
                          <span>Ordered on {new Date(order.orderDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${statusInfo.color}`}>{statusInfo.text}</p>
                        <p className="text-sm text-gray-500">Total: <span className="font-semibold text-base-content">₹{order.totalAmount.toFixed(2)}</span></p>
                      </div>
                    </div>

                    <div className="divider my-2"></div>

                    <div className="space-y-4 py-4">
                      {order.items.map(item => (
                        item.plant ? (
                          <div key={item.plant._id} className="flex items-center justify-between">
                            <div className="flex items-center justify-between gap-4">
                              <div className="avatar">
                                <div className="w-28 h-28 rounded-lg overflow-hidden">
                                  <img src={item.plant.image} alt={item.plant.name} className="w-full h-full object-cover" />
                                </div>
                              </div>
                              <div>
                                <p className="font-bold text-lg">{item.plant.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                <p className="text-sm text-gray-500">Price: ₹{item.plant.price ? item.plant.price.toFixed(2) : 'N/A'}</p>
                                <p className="font-semibold text-lg mt-1">₹{item.plant.price ? (item.plant.price * item.quantity).toFixed(2) : 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        ) : null
                      ))}
                    </div>

                    <div className="divider my-2"></div>

                    <div className="card-actions justify-end items-center pt-4">
                      {canBeCancelled && (
                        <button className="btn btn-error btn-sm" onClick={() => handleCancelOrder(order._id)}>Cancel Order <XCircle size={16} className="ml-2" /></button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
