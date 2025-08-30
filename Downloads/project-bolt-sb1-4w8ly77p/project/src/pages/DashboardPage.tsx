import React, { useState } from 'react';
import { User, Package, Heart, Settings, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/currency';

interface DashboardPageProps {
  onPageChange: (page: string) => void;
}

export default function DashboardPage({ onPageChange }: DashboardPageProps) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    username: user?.username || ''
  });

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the user
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const orders = [
    {
      id: '1001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 7299,
      items: ['Monstera Deliciosa', 'Snake Plant']
    },
    {
      id: '1002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 10399,
      items: ['Fiddle Leaf Fig', 'Pothos', 'Basil']
    },
    {
      id: '1003',
      date: '2024-01-05',
      status: 'Processing',
      total: 3829,
      items: ['Lavender', 'Rosemary']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'orders', label: 'Order History', icon: <Package className="w-5 h-5" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-slide-in-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Welcome back, {user?.fullName}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-slide-in-left">
              <div className="flex flex-col space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-200 text-left text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="flex items-center space-x-3 p-2 sm:p-3 rounded-lg transition-colors text-left text-red-600 hover:bg-red-50 mt-3 sm:mt-4 border-t pt-3 sm:pt-4 text-sm sm:text-base"
                >
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-slide-in-right">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors text-sm sm:text-base"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditData({
                              fullName: user?.fullName || '',
                              email: user?.email || '',
                              username: user?.username || ''
                            });
                          }}
                          className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors text-sm"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.fullName}
                          onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                        />
                      ) : (
                        <p className="text-gray-900 text-sm sm:text-base">{user?.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.username}
                          onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                        />
                      ) : (
                        <p className="text-gray-900 text-sm sm:text-base">@{user?.username}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                        />
                      ) : (
                        <p className="text-gray-900 text-sm sm:text-base">{user?.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </label>
                      <p className="text-gray-900 text-sm sm: text-base">January 2024</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Order History</h2>
                  
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Order #{order.id}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">Items:</p>
                          <p className="text-gray-900 text-sm sm:text-base">{order.items.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-6 sm:mt-8">
                    <button
                      onClick={() => onPageChange('categories')}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                    >
                      Shop More Plants
                    </button>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">My Wishlist</h2>
                  
                  <div className="text-center py-8 sm:py-12">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">
                      Start browsing and add plants to your wishlist to save them for later.
                    </p>
                    <button
                      onClick={() => onPageChange('categories')}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                    >
                      Browse Plants
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Account Settings</h2>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="border-b border-gray-200 pb-4 sm:pb-6">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 mr-3" defaultChecked />
                          <span className="text-gray-700 text-sm sm:text-base">Email notifications for new offers</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 mr-3" defaultChecked />
                          <span className="text-gray-700 text-sm sm:text-base">Plant care reminders</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 mr-3" />
                          <span className="text-gray-700 text-sm sm:text-base">Newsletter subscription</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-4 sm:pb-6">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Privacy</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 mr-3" defaultChecked />
                          <span className="text-gray-700 text-sm sm:text-base">Make my profile public</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 mr-3" defaultChecked />
                          <span className="text-gray-700 text-sm sm:text-base">Allow plant care tips sharing</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Danger Zone</h3>
                      <button className="text-red-600 hover:text-red-700 font-medium text-sm sm:text-base transition-colors">
                        Delete Account
                      </button>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}