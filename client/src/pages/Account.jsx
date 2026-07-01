import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { User, Heart, MapPin, ShoppingBag, LogOut, Edit, Sparkles, Shield, Settings, X, Save } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Account = () => {
  const { user, login, logout, loading } = useContext(AuthContext);
  const { showPopup } = useModal();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  // Edit Profile states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ fullName: '', email: '', username: '' });
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const res = await fetch(`http://localhost:5000/api/wishlist/${user._id}`);
        if (res.ok) {
          const data = await res.json();
          setWishlistCount(data.plants.length);
        }
      } catch (error) {
        console.error('Failed to fetch wishlist count', error);
      }
    };

    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${user._id}`);
        if (res.ok) {
          const data = await res.json();
          setOrderCount(data.data.length);
        }
      } catch (error) {
        console.error('Failed to fetch order count', error);
      }
    };

    fetchWishlist();
    fetchOrders();
  }, [user]);

  const handleEditProfileClick = () => {
    setEditForm({
      fullName: user?.fullname || '',
      email: user?.email || '',
      username: user?.username || ''
    });
    setEditErrors({});
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const validateEditForm = () => {
    const errs = {};
    if (!editForm.fullName.trim()) {
      errs.fullName = 'Full Display Name is required';
    } else if (editForm.fullName.trim().length < 3) {
      errs.fullName = 'Full Name must be at least 3 characters';
    }

    if (!editForm.username.trim()) {
      errs.username = 'Username identifier is required';
    } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(editForm.username.trim())) {
      errs.username = 'Username must be 3-15 alphanumeric characters or underscore';
    }

    if (!editForm.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email.trim())) {
      errs.email = 'Email Address must be valid';
    }

    return errs;
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    const errs = validateEditForm();
    if (Object.keys(errs).length > 0) {
      setEditErrors(errs);
      return;
    }
    setEditErrors({});

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: editForm.fullName,
          email: editForm.email,
          username: editForm.username
        })
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        setShowEditModal(false);
        showPopup({
          title: 'Profile Updated',
          message: 'Your personal profile details were saved successfully.',
          type: 'success'
        });
      } else {
        showPopup({
          title: 'Update Failed',
          message: data.message || 'Failed to update user parameters.',
          type: 'error'
        });
      }
    } catch (err) {
      showPopup({
        title: 'Error',
        message: 'An error occurred while updating profile.',
        type: 'error'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-base-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-6xl space-y-8 relative">
        
        {/* Top User Avatar Banner */}
        <div className="p-6 sm:p-8 rounded-[32px] border border-base-300/40 bg-base-200/50 glass-card flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="avatar animate-scale-up">
              <div className="w-24 h-24 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4 overflow-hidden shadow-lg">
                <img src={`https://ui-avatars.com/api/?name=${user.fullname}&background=124c36&color=fff&size=120`} alt={user.fullname} />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h2 className="text-3xl font-extrabold text-base-content font-heading leading-tight tracking-tight">{user.fullname}</h2>
                {user.isAdmin && <Shield className="h-5 w-5 text-accent shrink-0" title="Admin User" />}
              </div>
              <p className="text-base-content/65 text-sm">{user.email}</p>
            </div>
          </div>

          <button 
            onClick={handleEditProfileClick}
            className="btn btn-ghost hover:bg-primary/15 text-primary rounded-xl px-5 h-11 border border-white/20 flex items-center gap-2 text-sm font-bold transition-all duration-300 shrink-0 shadow-sm"
          >
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        {/* Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="p-6 rounded-[28px] border border-base-300/40 bg-base-200/50 glass-card">
              
              {/* Sidebar Menu Links */}
              <nav className="w-full">
                <ul className="space-y-2.5 text-sm font-semibold">
                  <li>
                    <Link to="/wishlist" className="flex items-center gap-3 p-3.5 rounded-xl bg-base-100 border border-base-300/40 hover:bg-primary/10 hover:text-primary transition-all duration-300 text-base-content/85">
                      <Heart className="w-5 h-5 text-red-500" /> My Saved Wishlist                       
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="flex items-center gap-3 p-3.5 rounded-xl bg-base-100 border border-base-300/40 hover:bg-primary/10 hover:text-primary transition-all duration-300 text-base-content/85">
                      <ShoppingBag className="w-5 h-5 text-primary" /> Order History                      
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="flex items-center gap-3 p-3.5 rounded-xl bg-base-100 border border-base-300/40 hover:bg-primary/10 hover:text-primary transition-all duration-300 text-base-content/85">
                      <Settings className="w-5 h-5 text-accent" /> Account Settings
                    </Link>
                  </li>
                  <div className="border-t border-base-300/40 my-4"></div>
                  <li>
                    <button 
                      onClick={() => {
                        showPopup({
                          title: 'Confirm Logout',
                          message: 'Are you sure you want to log out of your session?',
                          type: 'confirm',
                          onConfirm: logout
                        });
                      }} 
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-error/10 text-error hover:bg-error hover:text-white transition-all duration-300 w-full text-left"
                    >
                      <LogOut className="w-5 h-5" /> Logout Account
                    </button>
                  </li>
                </ul>
              </nav>

            </div>
          </aside>

          {/* Right Column Content */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Account Parameters */}
            <div className="bg-base-200/50 rounded-[28px] border border-base-300/40 p-6 sm:p-8 space-y-6 glass-card animate-fade-in">
              <div className="flex justify-between items-center border-b border-base-300/50 pb-3">
                <h3 className="text-xl font-bold text-base-content font-heading flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" /> Profile Parameters
                </h3>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3.5 border-b border-base-300/30">
                  <span className="font-bold text-base-content/75">Full Display Name:</span>
                  <span className="sm:col-span-2 text-base-content font-bold text-base tracking-wide">{user.fullname}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3.5 border-b border-base-300/30">
                  <span className="font-bold text-base-content/75">Username Identifier:</span>
                  <span className="sm:col-span-2 text-base-content font-bold text-base tracking-wide">{user.username}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3.5">
                  <span className="font-bold text-base-content/75">Email Address:</span>
                  <span className="sm:col-span-2 text-base-content font-bold text-base tracking-wide">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Quick action grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-[28px] border border-base-300/40 bg-base-200/50 flex flex-col items-center text-center gap-4 hover:border-primary/25 transition-all duration-300 glass-card">
                <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center text-red-500">
                  <Heart className="h-6 w-6 animate-pulse-subtle" />
                </div>
                <h2 className="text-lg font-bold text-base-content font-heading">Wishlist Specs</h2>
                <p className="text-base-content/75 text-sm leading-relaxed">
                  You have saved <span className="font-bold text-primary">{wishlistCount}</span> botanical specimens.
                </p>
                <Link to="/wishlist" className="btn btn-primary btn-sm rounded-xl btn-premium px-6 py-2 shadow-md">
                  View Saved
                </Link>
              </div>

              <div className="p-6 rounded-[28px] border border-base-300/40 bg-base-200/50 flex flex-col items-center text-center gap-4 hover:border-primary/25 transition-all duration-300 glass-card">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShoppingBag className="h-6 w-6 animate-bounce-subtle" />
                </div>
                <h2 className="text-lg font-bold text-base-content font-heading">Nursery Orders</h2>
                <p className="text-base-content/75 text-sm leading-relaxed">
                  You have placed <span className="font-bold text-primary">{orderCount}</span> orders so far.
                </p>
                <Link to="/orders" className="btn btn-primary btn-sm rounded-xl btn-premium px-6 py-2 shadow-md">
                  View Orders
                </Link>
              </div>
            </div>

          </main>

        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal modal-open bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="p-6 sm:p-8 rounded-[32px] border border-base-300/40 bg-base-100 max-w-md w-full shadow-2xl relative glass-card animate-fade-in-up space-y-6">
            
            <button 
              onClick={() => setShowEditModal(false)}
              className="absolute top-6 right-6 btn btn-ghost btn-circle btn-sm text-base-content/60 hover:bg-base-200"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-2xl font-extrabold text-base-content font-heading tracking-tight">Edit Personal Profile</h3>
              <p className="text-sm text-base-content/65">Modify display identifiers for your account.</p>
            </div>

            <form onSubmit={saveProfile} className="space-y-4">
              
              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/85 ml-1">Full Display Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 ${editErrors.fullName ? 'border-error/60 focus:border-error' : ''}`}
                  value={editForm.fullName}
                  onChange={handleEditFormChange}
                />
                {editErrors.fullName && <span className="text-error text-xs ml-1">{editErrors.fullName}</span>}
              </div>

              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/85 ml-1">Username Identifier</label>
                <input
                  type="text"
                  name="username"
                  placeholder="johndoe_12"
                  className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 ${editErrors.username ? 'border-error/60 focus:border-error' : ''}`}
                  value={editForm.username}
                  onChange={handleEditFormChange}
                />
                {editErrors.username && <span className="text-error text-xs ml-1">{editErrors.username}</span>}
              </div>

              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/85 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 ${editErrors.email ? 'border-error/60 focus:border-error' : ''}`}
                  value={editForm.email}
                  onChange={handleEditFormChange}
                />
                {editErrors.email && <span className="text-error text-xs ml-1">{editErrors.email}</span>}
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" className="btn btn-ghost hover:bg-base-200 text-sm font-semibold rounded-xl h-11 px-5" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary h-11 px-6 rounded-xl btn-premium text-sm font-semibold shadow-md flex items-center gap-1.5">
                  <Save size={16} /> Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Account;
