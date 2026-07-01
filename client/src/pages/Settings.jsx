import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { KeyRound, MapPin, Trash2, ShieldAlert, ArrowLeft, Save, Sparkles, X, Eye, EyeOff } from 'lucide-react';

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const { showPopup } = useModal();
  const navigate = useNavigate();

  // Tab State: 'address' | 'password' | 'danger'
  const [activeTab, setActiveTab] = useState('address');

  // Address Form State
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  });
  const [addressErrors, setAddressErrors] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [tempAddress, setTempAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  });
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch current user details on mount
  useEffect(() => {
    if (!user) return;
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth`);
        if (res.ok) {
          const users = await res.json();
          const me = users.find(u => u._id === user._id);
          if (me) {
            setAddressData({
              street: me.address?.street || '',
              city: me.address?.city || '',
              state: me.address?.state || '',
              zip: me.address?.zip || '',
              country: me.address?.country || '',
              phone: me.phone || ''
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserDetails();
  }, [user]);

  // Handle Address Input change with restrictions (exactly like Checkout!)
  const handleTempAddressChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 10) {
        setTempAddress(prev => ({ ...prev, [name]: cleanValue }));
      }
      return;
    }
    if (name === 'zip') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 6) {
        setTempAddress(prev => ({ ...prev, [name]: cleanValue }));
      }
      return;
    }
    setTempAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChangeInput = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Validate Address Form
  const validateAddress = (addrData) => {
    const errs = {};
    if (!addrData.street.trim()) errs.street = 'Street address is required';
    if (!addrData.city.trim()) errs.city = 'City is required';
    if (!addrData.state.trim()) errs.state = 'State is required';
    if (!addrData.country.trim()) errs.country = 'Country is required';

    if (!addrData.phone) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(addrData.phone)) {
      errs.phone = 'Phone number must be exactly 10 digits';
    }

    if (!addrData.zip) {
      errs.zip = 'ZIP code is required';
    } else if (!/^\d{6}$/.test(addrData.zip)) {
      errs.zip = 'ZIP code must be exactly 6 digits';
    }

    return errs;
  };

  const handleAddAddressClick = () => {
    setAddressErrors({});
    setTempAddress({ street: '', city: '', state: '', zip: '', country: '', phone: '' });
    setShowAddressModal(true);
  };

  const handleEditAddressClick = () => {
    setAddressErrors({});
    setTempAddress({ ...addressData });
    setShowAddressModal(true);
  };

  const handleDeleteAddressClick = () => {
    showPopup({
      title: 'Remove Address',
      message: 'Are you sure you want to clear your saved address directory details?',
      type: 'confirm',
      onConfirm: async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: '',
              address: {
                street: '',
                city: '',
                state: '',
                zip: '',
                country: ''
              }
            })
          });
          if (res.ok) {
            setAddressData({ street: '', city: '', state: '', zip: '', country: '', phone: '' });
            showPopup({
              title: 'Address Removed',
              message: 'Your address details have been cleared.',
              type: 'success'
            });
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  // Save Address details from modal
  const saveAddressModal = async (e) => {
    e.preventDefault();
    const errs = validateAddress(tempAddress);
    if (Object.keys(errs).length > 0) {
      setAddressErrors(errs);
      return;
    }
    setAddressErrors({});

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: tempAddress.phone,
          address: {
            street: tempAddress.street,
            city: tempAddress.city,
            state: tempAddress.state,
            zip: tempAddress.zip,
            country: tempAddress.country
          }
        })
      });

      if (res.ok) {
        setAddressData({ ...tempAddress });
        setShowAddressModal(false);
        showPopup({
          title: 'Address Saved',
          message: 'Your shipping details have been updated successfully.',
          type: 'success'
        });
      } else {
        showPopup({
          title: 'Error',
          message: 'Failed to update address directory.',
          type: 'error'
        });
      }
    } catch (err) {
      showPopup({
        title: 'Error',
        message: 'An error occurred while saving address details.',
        type: 'error'
      });
    }
  };

  // Validate Password Form
  const validatePassword = () => {
    const errs = {};
    if (!passwordData.currentPassword) errs.currentPassword = 'Current password is required';
    
    if (!passwordData.newPassword) {
      errs.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6 || passwordData.newPassword.length > 18) {
      errs.newPassword = 'Password must be between 6 and 18 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    return errs;
  };

  // Change Password Action
  const changePassword = async (e) => {
    e.preventDefault();
    const errs = validatePassword();
    if (Object.keys(errs).length > 0) {
      setPasswordErrors(errs);
      return;
    }
    setPasswordErrors({});

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        showPopup({
          title: 'Password Updated',
          message: 'Your account security credentials were changed successfully.',
          type: 'success'
        });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showPopup({
          title: 'Update Failed',
          message: data.message || 'Failed to update credentials.',
          type: 'error'
        });
      }
    } catch (err) {
      showPopup({
        title: 'Error',
        message: 'An error occurred while updating passwords.',
        type: 'error'
      });
    }
  };

  // Delete Account Action
  const handleDeleteAccountClick = () => {
    setConfirmDeleteText('');
    setShowDeleteModal(true);
  };

  const deleteAccountFinal = async () => {
    if (confirmDeleteText !== 'DELETE') return;
    setShowDeleteModal(false);
    
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${user._id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showPopup({
          title: 'Account Deleted',
          message: 'Your account has been successfully removed from our directories.',
          type: 'success',
          onConfirm: () => {
            logout();
            navigate('/register');
          }
        });
      } else {
        showPopup({
          title: 'Deletion Failed',
          message: 'An error occurred while removing your profile.',
          type: 'error'
        });
      }
    } catch (err) {
      showPopup({
        title: 'Error',
        message: 'Failed to process account deletion.',
        type: 'error'
      });
    }
  };

  if (!user) return null;

  return (
    <div className="bg-base-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <Link to="/account" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mb-2">
              <ArrowLeft size={16} /> Return to Account
            </Link>
            <h1 className="text-3xl font-extrabold text-base-content font-heading tracking-tight leading-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" /> Account Settings
            </h1>
            <p className="text-base-content/75 text-sm">Configure your personal, location, and credentials parameters.</p>
          </div>
        </div>

        {/* Horizontal Segment Control */}
        <div className="flex flex-wrap sm:flex-nowrap justify-center p-1.5 bg-base-200/50 backdrop-blur-md rounded-2xl border border-base-300/40 max-w-lg mx-auto gap-1">
          <button
            onClick={() => setActiveTab('address')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 w-full sm:flex-1 ${
              activeTab === 'address'
                ? 'bg-primary text-white shadow-md'
                : 'text-base-content/85 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <MapPin size={16} /> Address
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 w-full sm:flex-1 ${
              activeTab === 'password'
                ? 'bg-primary text-white shadow-md'
                : 'text-base-content/85 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <KeyRound size={16} /> Password
          </button>
          <button
            onClick={() => setActiveTab('danger')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 w-full sm:flex-1 ${
              activeTab === 'danger'
                ? 'bg-error text-white shadow-md'
                : 'text-error hover:bg-error/10'
            }`}
          >
            <Trash2 size={16} /> Delete Account
          </button>
        </div>

        {/* Tab Contents Card */}
        <div className="p-6 sm:p-8 rounded-[32px] border border-base-300/40 bg-base-200/50 glass-card max-w-2xl mx-auto">
              
              {/* Address Management tab */}
              {activeTab === 'address' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-base-content mb-1">Address Directory</h3>
                      <p className="text-xs text-base-content/65">Set details for quick order deliveries.</p>
                    </div>
                    {!addressData.street && (
                      <button 
                        onClick={handleAddAddressClick}
                        className="btn btn-primary btn-sm h-10 px-4 rounded-xl btn-premium text-xs font-semibold shadow-md"
                      >
                        Add Address
                      </button>
                    )}
                  </div>

                  {addressData.street ? (
                    <div className="p-6 rounded-2xl border border-base-300/40 bg-base-100/50 space-y-4 animate-fade-in">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-base-content flex items-center gap-2 text-sm tracking-wide">
                          <MapPin className="text-primary w-5 h-5" /> Saved Shipping Address
                        </h4>
                        <div className="flex gap-2">
                          <button 
                            onClick={handleEditAddressClick}
                            className="btn btn-ghost btn-sm rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-xs font-bold"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={handleDeleteAddressClick}
                            className="btn btn-ghost btn-sm rounded-lg hover:bg-error/15 text-error transition-colors text-xs font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-sm text-base-content/85 leading-relaxed">
                        <p>{addressData.street}</p>
                        <p>{addressData.city}, {addressData.state} - {addressData.zip}</p>
                        <p>{addressData.country}</p>
                        <p className="pt-2 text-xs font-semibold text-base-content/60">Phone: {addressData.phone}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 rounded-2xl border border-dashed border-base-300/60 bg-base-100/10 space-y-4 animate-fade-in">
                      <p className="text-sm text-base-content/65">No saved shipping address found in directory.</p>
                      <button 
                        onClick={handleAddAddressClick}
                        className="btn btn-primary h-11 px-5 rounded-xl btn-premium text-sm font-semibold shadow-md"
                      >
                        Add Shipping Address
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Password tab */}
              {activeTab === 'password' && (
                <form onSubmit={changePassword} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-base-content mb-1">Change Password</h3>
                    <p className="text-xs text-base-content/65">Modify credentials key settings.</p>
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        name="currentPassword"
                        placeholder="Enter current password"
                        className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 pr-10 mt-1 ${passwordErrors.currentPassword ? 'border-error' : ''}`}
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChangeInput}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && <span className="text-error text-xs ml-1">{passwordErrors.currentPassword}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full space-y-2">
                      <label className="text-sm font-semibold text-base-content/85 ml-1">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          placeholder="6 to 18 characters"
                          className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 pr-10 mt-1 ${passwordErrors.newPassword ? 'border-error' : ''}`}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChangeInput}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {passwordErrors.newPassword && <span className="text-error text-xs ml-1">{passwordErrors.newPassword}</span>}
                    </div>

                    <div className="form-control w-full space-y-2">
                      <label className="text-sm font-semibold text-base-content/85 ml-1">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          placeholder="Re-type new password"
                          className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 pr-10 mt-1 ${passwordErrors.confirmPassword ? 'border-error' : ''}`}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChangeInput}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {passwordErrors.confirmPassword && <span className="text-error text-xs ml-1">{passwordErrors.confirmPassword}</span>}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button type="submit" className="btn btn-primary h-11 px-6 rounded-xl btn-premium text-sm font-semibold shadow-md flex items-center gap-1.5">
                      <Save size={18} /> Update Password
                    </button>
                  </div>
                </form>
              )}

              {/* Danger Zone / Delete tab */}
              {activeTab === 'danger' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-error mb-1">Danger Zone</h3>
                    <p className="text-xs text-base-content/65">Irreversible actions on account parameters.</p>
                  </div>

                  <div className="p-6 rounded-2xl bg-error/10 border border-error/20 flex lg:flex-col sm:flex-row lg:items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-base-content flex items-center gap-1.5">
                        <ShieldAlert className="text-error w-5 h-5" /> Permanent Account Deletion
                      </h4>
                      <p className="text-xs text-base-content/75 max-w-md">
                        This action will immediately remove your order histories, saved addresses, wishlist specimens, and session tokens. This cannot be undone.
                      </p>
                    </div>
                    
                    <button
                      onClick={handleDeleteAccountClick}
                      className="btn btn-error text-white h-11 px-6 rounded-xl text-sm font-semibold shadow-md shrink-0 flex items-center gap-1.5"
                    >
                      <Trash2 size={18} /> Delete Account
                    </button>
                  </div>
                </div>
              )}

            </div>

      </div>

      {/* Address Add/Edit Modal */}
      {showAddressModal && (
        <div className="modal modal-open bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="p-6 sm:p-8 rounded-[32px] border border-base-300/40 bg-base-100 max-w-lg w-full shadow-2xl relative glass-card animate-fade-in-up space-y-6">
            
            <button 
              onClick={() => setShowAddressModal(false)}
              className="absolute top-6 right-6 btn btn-ghost btn-circle btn-sm text-base-content/60 hover:bg-base-200"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-2xl font-extrabold text-base-content font-heading tracking-tight">
                {addressData.street ? 'Modify Shipping Address' : 'Add Shipping Address'}
              </h3>
              <p className="text-sm text-base-content/65">Enter physical delivery specifications below.</p>
            </div>

            <form onSubmit={saveAddressModal} className="space-y-4">
              
              {/* Street Address (Full Width) */}
              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/85 ml-1">Street Address</label>
                <textarea
                  name="street"
                  placeholder="Flat No, Building, Street Name"                  
                  className={`input input-bordered w-full rounded-xl glass-input pt-2 text-sm h-20 mt-1 ${addressErrors.street ? 'border-error/60 focus:border-error' : ''}`}
                  value={tempAddress.street}
                  onChange={handleTempAddressChange}
                />
                {addressErrors.street && <span className="text-error text-xs ml-1">{addressErrors.street}</span>}
              </div>

              {/* City & State (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${addressErrors.city ? 'border-error/60 focus:border-error' : ''}`}
                    value={tempAddress.city}
                    onChange={handleTempAddressChange}
                  />
                  {addressErrors.city && <span className="text-error text-xs ml-1">{addressErrors.city}</span>}
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1">State</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${addressErrors.state ? 'border-error/60 focus:border-error' : ''}`}
                    value={tempAddress.state}
                    onChange={handleTempAddressChange}
                  />
                  {addressErrors.state && <span className="text-error text-xs ml-1">{addressErrors.state}</span>}
                </div>
              </div>

              {/* ZIP Code & Country (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1">ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    placeholder="6-digit PIN"
                    maxLength={6}
                    className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${addressErrors.zip ? 'border-error/60 focus:border-error' : ''}`}
                    value={tempAddress.zip}
                    onChange={handleTempAddressChange}
                  />
                  {addressErrors.zip && <span className="text-error text-xs ml-1">{addressErrors.zip}</span>}
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${addressErrors.country ? 'border-error/60 focus:border-error' : ''}`}
                    value={tempAddress.country}
                    onChange={handleTempAddressChange}
                  />
                  {addressErrors.country && <span className="text-error text-xs ml-1">{addressErrors.country}</span>}
                </div>
              </div>

              {/* Contact Phone (Full Width) */}
              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/85 ml-1">Contact Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit number"
                  maxLength={10}
                  className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${addressErrors.phone ? 'border-error/60 focus:border-error' : ''}`}
                  value={tempAddress.phone}
                  onChange={handleTempAddressChange}
                />
                {addressErrors.phone && <span className="text-error text-xs ml-1">{addressErrors.phone}</span>}
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" className="btn btn-ghost hover:bg-base-200 text-sm font-semibold rounded-xl h-11 px-5" onClick={() => setShowAddressModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary h-11 px-6 rounded-xl btn-premium text-sm font-semibold shadow-md flex items-center gap-1.5">
                  <Save size={16} /> Save Address
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal modal-open bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="p-6 sm:p-8 rounded-[32px] border border-error/45 bg-base-100 max-w-sm w-full shadow-2xl relative text-center space-y-5 animate-fade-in-up glass-card">
            
            <button 
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-5 right-5 btn btn-ghost btn-circle btn-sm text-base-content/65 hover:bg-base-200"
            >
              <X size={18} />
            </button>

            {/* Red Alert Icon */}
            <div className="flex justify-center pt-2">
              <div className="p-3.5 rounded-full bg-error/15 flex items-center justify-center text-error animate-pulse-subtle">
                <ShieldAlert className="h-14 w-14" />
              </div>
            </div>

            {/* Texts */}
            <div className="space-y-1.5">
              <h3 className="text-2xl font-extrabold text-error font-heading tracking-tight leading-tight">
                Danger Zone
              </h3>
              <p className="text-sm text-base-content/75 leading-relaxed">
                Are you sure you want to delete your user account? This action is permanent and cannot be undone.
              </p>
            </div>

            {/* Validation input */}
            <div className="space-y-3">
              <p className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">
                Type <span className="text-error font-extrabold font-mono">DELETE</span> to confirm:
              </p>
              <input 
                type="text"
                placeholder="DELETE"
                className="input input-bordered input-error w-full text-center rounded-xl glass-input text-sm h-11 font-bold tracking-widest text-error focus:ring-1 focus:ring-error"
                value={confirmDeleteText}
                onChange={(e) => setConfirmDeleteText(e.target.value)}
              />
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="btn btn-ghost hover:bg-base-200 h-11 rounded-xl text-sm font-semibold border border-base-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={deleteAccountFinal}
                  disabled={confirmDeleteText !== 'DELETE'}
                  className="btn btn-error text-white h-11 rounded-xl text-sm font-semibold shadow-md disabled:bg-base-300 disabled:text-base-content/40 disabled:border-none"
                >
                  Confirm
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
