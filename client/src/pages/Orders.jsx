import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { ShoppingBag, Calendar, Truck, XCircle, Clock, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const { showPopup } = useModal();

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

  const handleCancelOrder = (orderId) => {
    showPopup({
      title: 'Cancel Order Specimen',
      message: 'Are you sure you want to cancel this order?',
      type: 'confirm',
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
            method: 'PUT',
          });
          if (response.ok) {
            fetchOrders(); // Refresh
            showPopup({
              title: 'Cancelled',
              message: 'Your order was successfully cancelled.',
              type: 'success'
            });
          } else {
            const data = await response.json();
            showPopup({
              title: 'Cancellation Failed',
              message: data.error || 'Failed to cancel order.',
              type: 'error'
            });
          }
        } catch (error) {
          console.error('Error cancelling order:', error);
          showPopup({
            title: 'Error',
            message: 'An error occurred while cancelling the order.',
            type: 'error'
          });
        }
      }
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md p-8 rounded-[32px] border border-base-300/40 glass-card space-y-6">
          <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-2xl font-bold font-heading text-base-content">Access Restricted</h1>
          <p className="text-base-content/75 text-sm">Please log in to view your nursery order history.</p>
          <Link to="/login" className="btn btn-primary w-full h-12 rounded-xl btn-premium font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const orderStatuses = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="bg-base-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <header className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-bold text-sm tracking-wider uppercase">Purchase History</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-base-content font-heading">My Botanical Orders</h1>
          <p className="text-base-content/75 text-sm">Track deliveries, manage status coordinates, and review receipt records.</p>
        </header>

        {orders.length === 0 ? (
          <div className="text-center p-16 rounded-[32px] border border-base-300/40 glass-card max-w-md mx-auto space-y-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary">
              <ShoppingBag size={28} />
            </div>
            <h2 className="text-2xl font-bold font-heading text-base-content">No orders placed</h2>
            <p className="text-base-content/75 text-sm">You haven't ordered any premium specimens yet. Your order history will appear here once placed.</p>
            <Link to="/category" className="btn btn-primary h-12 px-6 rounded-xl btn-premium text-sm font-semibold flex items-center justify-center gap-2">
              Explore Specimens Catalog <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => {
              const isCancelled = order.orderStatus === 'Cancelled';
              const activeStatusIdx = orderStatuses.indexOf(order.orderStatus);
              const canBeCancelled = order.orderStatus === 'Confirmed' || order.orderStatus === 'Processing';

              return (
                <div key={order._id} className="p-6 rounded-[28px] border border-base-300/40 bg-base-200/50 shadow-md space-y-6 hover:border-primary/15 transition-all duration-300">
                  
                  {/* Top bar: ID and dates */}
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-base-300/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-base-content font-heading">Order #{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                        <span className={`badge border-none font-bold text-sm px-3.5 py-2.5 ${
                          isCancelled ? 'bg-error/10 text-error' : 
                          order.orderStatus === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-base-content/65 font-medium">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Ordered on {new Date(order.orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-base-content/60 font-semibold uppercase tracking-wider">Total Value</p>
                      <p className="text-2xl font-bold text-primary font-heading">₹{order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Visual Status Stepper Tracker */}
                  {!isCancelled ? (
                    <div className="py-4">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-base-content/60 relative">
                        <div className="absolute left-4 right-4 top-[15px] h-[3px] bg-base-300 -translate-y-1/2 z-0"></div>
                        <div 
                          className="absolute left-4 top-[15px] h-[3px] bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                          style={{ width: `${(activeStatusIdx / 3) * 100}%` }}
                        ></div>

                        {orderStatuses.map((status, index) => {
                          const isDone = index <= activeStatusIdx;
                          return (
                            <div key={status} className="z-10 flex flex-col items-center gap-2 shrink-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ring-4 ring-base-100 shadow-sm transition-colors duration-300 ${
                                isDone ? 'bg-primary text-white' : 'bg-base-300 text-base-content/50'
                              }`}>
                                {isDone ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                              </div>
                              <span className={isDone ? 'text-primary font-bold' : 'font-medium'}>{status}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 p-4 rounded-xl bg-error/10 border border-error/20 flex items-center gap-3 text-error">
                      <XCircle className="h-5 w-5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-bold font-heading">This order has been cancelled</p>
                        <p className="text-error/80 mt-0.5">Refund processing status: Completed (if paid via Card/UPI).</p>
                      </div>
                    </div>
                  )}

                  {/* Items List */}
                  <div className="space-y-4 pt-2">
                    <p className="text-sm font-bold text-base-content uppercase tracking-wider">Specimens Included</p>
                    <div className="divide-y divide-base-300/40">
                      {order.items.map(item => (
                        item.plant ? (
                          <div key={item.plant._id} className="flex items-center justify-between py-4.5 gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-xl overflow-hidden bg-base-200 border border-base-300/30 p-1 flex items-center justify-center shrink-0">
                                <img src={item.plant.image} alt={item.plant.name} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <h4 className="font-bold text-base-content text-base font-heading">{item.plant.name}</h4>
                                <p className="text-sm text-base-content/65 font-medium">{item.plant.category} • Qty: {item.quantity}</p>
                                <p className="text-sm text-primary font-semibold">₹{item.plant.price.toFixed(2)} each</p>
                              </div>
                            </div>
                            <p className="font-bold text-base-content text-lg">₹{(item.plant.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ) : (
                          <div key={Math.random()} className="text-sm text-base-content/60 py-3">Removed plant specimen</div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Actions (Cancellation) */}
                  {canBeCancelled && (
                    <div className="flex justify-end pt-4 border-t border-base-300/50">
                      <button 
                        onClick={() => handleCancelOrder(order._id)}
                        className="btn btn-error btn-sm rounded-xl px-4 py-2 font-semibold flex items-center gap-1.5 shadow-md btn-premium text-sm"
                      >
                        <XCircle size={16} /> Cancel Order Specimen
                      </button>
                    </div>
                  )}

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
