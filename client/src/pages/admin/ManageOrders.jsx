import React, { useState, useEffect } from 'react';
import { Eye, Check, X, User, Mail, Phone, Home, ShoppingCart } from 'lucide-react';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data.data);
    setFilteredOrders(data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.orderStatus === statusFilter));
    }
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
    <div className="p-6 bg-base-100">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      
      <div className="mb-4 flex items-center space-x-2">
        <span className="font-semibold">Filter by status:</span>
        <div className="tabs tabs-boxed">
            {statuses.map(status => (
                <a key={status} className={`tab ${statusFilter === status ? 'tab-active' : ''}`} onClick={() => setStatusFilter(status)}>{status}</a>
            ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id} className="hover">
                <td>{order._id.substring(0, 8)}</td>
                <td>{order.user ? order.user.fullname : 'N/A'}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>₹{order.totalAmount.toFixed(2)}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <select 
                    className="select select-bordered select-sm" 
                    value={order.orderStatus} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option>Confirmed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs" onClick={() => viewOrderDetails(order)}>
                    <Eye className="w-4 h-4 text-info" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-2xl">Order Details</h3>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center"><User className="mr-2"/> Customer</h4>
                    <p><strong>Name:</strong> {selectedOrder.user ? selectedOrder.user.fullname : 'N/A'}</p>
                    <p><strong>Email:</strong> {selectedOrder.user ? selectedOrder.user.email : 'N/A'}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center"><Home className="mr-2"/> Shipping Address</h4>
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>{`${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state} ${selectedOrder.shippingAddress.zip}`}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                </div>
            </div>

            <div className="divider"></div>

            <div>
                <h4 className="font-semibold text-lg mb-2 flex items-center"><ShoppingCart className="mr-2"/> Items</h4>
                <div className="space-y-2">
                    {selectedOrder.items.map(item => (
                        <div key={item.plant._id} className="flex justify-between items-center bg-base-200 p-2 rounded-lg">
                            <div className="flex items-center gap-4">
                                <img src={item.plant.image} alt={item.plant.name} className="w-12 h-12 rounded-md object-cover"/>
                                <div>
                                    <p className="font-semibold">{item.plant.name}</p>
                                    <p className="text-sm">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p>₹{(item.plant.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="modal-action mt-6">
              <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
