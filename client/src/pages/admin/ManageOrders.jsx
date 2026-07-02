import React, { useState, useEffect } from 'react';
import { Eye, X, User, Home, ShoppingCart, Sparkles, Calendar, CreditCard } from 'lucide-react';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [taxRate, setTaxRate] = useState(0.05);
  const ordersPerPage = 8;

  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data.data);
    setFilteredOrders(data.data);
  };

  const fetchTaxRate = async () => {
    try {
      const res = await fetch('/api/tax');
      if (res.ok) {
        const data = await res.json();
        setTaxRate(data.rate / 100);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTaxRate();
  }, []);

  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.orderStatus === statusFilter));
    }
    setCurrentPage(1);
  }, [statusFilter, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    await fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderStatus: newStatus }),
    });
    fetchOrders();
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const statuses = ['All', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-200/50 p-6 rounded-3xl border border-base-300/40 glass-card">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-heading text-base-content flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" /> Order Management console
          </h1>
          <p className="text-base-content/70 text-sm">Review shipping logistics, update status parameters, and examine invoices.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3 bg-base-200/40 p-3 rounded-2xl border border-base-300/30 w-fit">
        <span className="text-sm font-bold text-base-content/70 uppercase tracking-wider px-2">Status:</span>
        <div className="flex flex-wrap gap-1.5">
          {statuses.map(status => (
            <button 
              key={status} 
              onClick={() => setStatusFilter(status)}
              className={`btn btn-sm rounded-xl font-semibold text-sm transition-all duration-300 h-9 px-4 ${
                statusFilter === status 
                  ? 'btn-primary shadow-sm border-transparent' 
                  : 'btn-ghost hover:bg-primary/10 hover:text-primary text-base-content/80'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table view */}
      <div className="rounded-[28px] border border-base-300/40 bg-base-200/50 p-6 glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300/60 text-sm font-bold text-base-content/70">
                <th className="py-4">Order ID</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Total Value</th>
                <th>Payment Method</th>
                <th>Logistics Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300/30">
              {filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage).map(order => (
                <tr key={order._id} className="hover:bg-primary/5 transition-colors duration-200 text-sm">
                  <td className="py-4 font-bold text-base-content font-heading text-base">
                    #{order._id.substring(order._id.length - 8).toUpperCase()}
                  </td>
                  <td className="font-bold text-base-content font-heading">{order.user ? order.user.fullname : 'Removed User'}</td>
                  <td className="text-base-content/85">{new Date(order.orderDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="font-bold text-primary font-heading text-base">₹{order.totalAmount.toFixed(2)}</td>
                  <td>
                    <span className="badge bg-base-300 border-none font-bold text-sm px-2.5 py-1.5 rounded-lg text-base-content/80">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="select select-bordered select-sm rounded-xl glass-input text-sm h-9 px-3 disabled:opacity-75 disabled:cursor-not-allowed" 
                      value={order.orderStatus} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={order.orderStatus === 'Cancelled'}
                    >
                      <option>Confirmed</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      {order.orderStatus === 'Cancelled' && <option>Cancelled</option>}
                    </select>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary text-base-content/70 transition-colors" onClick={() => viewOrderDetails(order)}>
                      <Eye className="w-4.5 h-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {Math.ceil(filteredOrders.length / ordersPerPage) > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-base-300/30">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="btn btn-outline rounded-xl px-4 py-2 border border-base-300 disabled:opacity-40"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn rounded-xl w-9 h-9 text-md font-bold transition-all duration-300 ${
                  currentPage === page 
                    ? 'btn-primary shadow-md' 
                    : 'btn-ghost hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredOrders.length / ordersPerPage)))}
              className="btn btn-outline rounded-xl px-4 py-2 border border-base-300 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal modal-open bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="p-6 sm:p-8 rounded-[32px] border border-base-300/40 bg-base-100 max-w-2xl w-full shadow-2xl relative glass-card animate-fade-in-up space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 btn btn-ghost btn-circle btn-sm text-base-content/60 hover:bg-base-200"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-2xl font-extrabold text-base-content font-heading tracking-tight">Order Specifications</h3>
              <p className="text-sm text-base-content/65">ID: #{selectedOrder._id.toUpperCase()}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-base-200 border border-base-300/30 space-y-3">
                <h4 className="font-bold text-base-content font-heading text-base flex items-center gap-2"><User size={18} className="text-primary" /> Customer Parameters</h4>
                <div className="space-y-1 text-sm text-base-content/85">
                  <p><strong>Name:</strong> {selectedOrder.user ? selectedOrder.user.fullname : 'N/A'}</p>
                  <p><strong>Email:</strong> {selectedOrder.user ? selectedOrder.user.email : 'N/A'}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-base-200 border border-base-300/30 space-y-3">
                <h4 className="font-bold text-base-content font-heading text-base flex items-center gap-2"><Home size={18} className="text-primary" /> Shipping Coordinates</h4>
                <div className="space-y-1 text-sm text-base-content/85">
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>{`${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state} ${selectedOrder.shippingAddress.zip}`}</p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-base-300/40 my-4"></div>

            {/* Specimen items list */}
            <div className="space-y-3">
              <h4 className="font-bold text-base-content font-heading text-base flex items-center gap-2"><ShoppingCart size={18} className="text-primary" /> Specimen List</h4>
              <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
                {selectedOrder.items.map(item => (
                  <div key={item.plant?._id || Math.random()} className="flex justify-between items-center bg-base-200 p-3 rounded-2xl border border-base-300/20 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-base-100 p-1 flex items-center justify-center border border-base-300/20 overflow-hidden shrink-0">
                        <img src={item.plant?.image} alt={item.plant?.name} className="w-full h-full object-contain"/>
                      </div>
                      <div>
                        <p className="font-bold text-base-content font-heading">{item.plant?.name || 'Removed Specimen'}</p>
                        <p className="text-base-content/65 text-xs">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-base-content font-heading text-base">₹{((item.plant?.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-base-300/40 my-4"></div>

            {/* Invoice Breakdown Details */}
            <div className="space-y-2.5 text-sm text-base-content/85 px-1">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="font-semibold">₹{selectedOrder.items.reduce((acc, item) => acc + ((item.plant?.price || 0) * item.quantity), 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Value ({Math.round(taxRate * 100)}%)</span>
                <span className="font-semibold">₹{(selectedOrder.items.reduce((acc, item) => acc + ((item.plant?.price || 0) * item.quantity), 0) * taxRate).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Cost</span>
                <span className="font-semibold text-emerald-500">Complimentary</span>
              </div>
            </div>

            <div className="border-t border-base-300/40 my-4"></div>

            <div className="flex justify-between items-baseline font-heading">
              <span className="font-bold text-lg text-base-content">Grand Invoice Value</span>
              <span className="font-extrabold text-2xl text-primary">₹{selectedOrder.totalAmount.toFixed(2)}</span>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="button" className="btn btn-primary h-11 px-6 rounded-xl btn-premium text-sm font-semibold shadow-md" onClick={() => setIsModalOpen(false)}>
                Close Specifications
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageOrders;
