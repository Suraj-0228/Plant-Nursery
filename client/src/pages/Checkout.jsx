import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { ArrowLeft, User, Mail, Phone, Home, CheckCircle2, ChevronRight } from 'lucide-react';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [errors, setErrors] = useState({});

  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { showPopup } = useModal();
  const navigate = useNavigate();
  const [taxRate, setTaxRate] = useState(0.05);

  useEffect(() => {
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
    fetchTaxRate();
  }, []);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxAmount = cartTotal * taxRate;
  const shippingCost = 0;
  const grandTotal = cartTotal + taxAmount + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 10) {
        setFormData(prevState => ({
          ...prevState,
          [name]: cleanValue
        }));
      }
      return;
    }
    
    if (name === 'zip') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 6) {
        setFormData(prevState => ({
          ...prevState,
          [name]: cleanValue
        }));
      }
      return;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUseSavedAddress = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`);
      if (res.ok) {
        const profile = await res.json();
        if (profile.address && profile.address.street) {
          setFormData(prev => ({
            ...prev,
            fullName: profile.fullname || prev.fullName,
            email: profile.email || prev.email,
            phone: profile.phone || prev.phone,
            street: profile.address.street || '',
            city: profile.address.city || '',
            state: profile.address.state || '',
            zip: profile.address.zip || '',
            country: profile.address.country || '',
          }));
          showPopup({
            title: 'Address Loaded',
            message: 'Saved shipping details successfully applied.',
            type: 'success'
          });
        } else {
          showPopup({
            title: 'No Saved Address',
            message: 'You do not have any saved address details in settings. Please configure settings or enter manually.',
            type: 'info'
          });
        }
      }
    } catch (err) {
      console.error(err);
      showPopup({
        title: 'Error',
        message: 'Could not retrieve your saved address details.',
        type: 'error'
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.street) newErrors.street = 'Street address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State / Province is required';
    if (!formData.country) newErrors.country = 'Country is required';

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 numeric digits';
    }

    if (!formData.zip) {
      newErrors.zip = 'ZIP code is required';
    } else if (!/^\d{6}$/.test(formData.zip)) {
      newErrors.zip = 'ZIP code must be exactly 6 numeric digits';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.com')) {
      newErrors.email = 'Invalid email format';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country,
          }
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update user information');
      }

      navigate('/payment', { state: { formData } });
    } catch (error) {
      console.error('Error updating user info:', error);
      showPopup({
        title: 'Error',
        message: 'An error occurred while saving your checkout information.',
        type: 'error'
      });
    }
  };

  return (
    <div className="bg-base-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-6xl">
        
        {/* Stepper Progress Bar */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-between text-sm font-semibold text-base-content/55 relative">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-base-300 -translate-y-1/2 z-0"></div>
            <div className="absolute left-0 right-1/2 top-1/2 h-[2px] bg-primary -translate-y-1/2 z-0"></div>
            
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-base-100">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-primary font-bold">Shopping Bag</span>
            </div>
            
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm ring-4 ring-base-100">
                2
              </div>
              <span className="text-primary font-bold">Shipping Details</span>
            </div>
            
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-base-300 text-base-content/75 flex items-center justify-center font-bold text-sm ring-4 ring-base-100">
                3
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-base-content font-heading mb-10 text-center">Shipping Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left side: Form */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-[24px] border border-base-300/40 glass-card">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Contact Information */}
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-base-300 pb-2">
                  <h2 className="text-xl font-bold text-base-content font-heading">1. Contact Information</h2>
                  {user && (
                    <button
                      type="button"
                      onClick={handleUseSavedAddress}
                      className="btn btn-primary btn-sm rounded-xl text-xs font-semibold px-4 h-9 shadow-sm"
                    >
                      Use Saved Address
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1 flex items-center gap-2">
                      <User size={16} className="text-primary" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      name="fullName"
                      placeholder="John Doe" 
                      className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 ${errors.fullName ? 'border-error' : ''}`} 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                    />
                    {errors.fullName && <span className="text-error text-sm font-medium mt-1">{errors.fullName}</span>}
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1 flex items-center gap-2">
                      <Mail size={16} className="text-primary" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="john@example.com" 
                      className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 ${errors.email ? 'border-error' : ''}`} 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                    {errors.email && <span className="text-error text-sm font-medium mt-1">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1 flex items-center gap-2">
                    <Phone size={16} className="text-primary" /> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="9876543210" 
                    maxLength={10}
                    className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 ${errors.phone ? 'border-error' : ''}`} 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                  />
                  {errors.phone && <span className="text-error text-sm font-medium mt-1">{errors.phone}</span>}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-base-content font-heading border-b border-base-300 pb-2">2. Delivery Address</h2>
                
                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1 flex items-center gap-2">
                    <Home size={16} className="text-primary" /> Street Address
                  </label>
                  <input 
                    type="text" 
                    name="street"
                    placeholder="Flat No, Building, Street Name" 
                    className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 ${errors.street ? 'border-error' : ''}`} 
                    value={formData.street} 
                    onChange={handleInputChange} 
                  />
                  {errors.street && <span className="text-error text-sm font-medium mt-1">{errors.street}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1">City</label>
                    <input 
                      type="text" 
                      name="city"
                      placeholder="City Name" 
                      className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.city ? 'border-error' : ''}`} 
                      value={formData.city} 
                      onChange={handleInputChange} 
                    />
                    {errors.city && <span className="text-error text-sm font-medium mt-1">{errors.city}</span>}
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1">State / Province</label>
                    <input 
                      type="text" 
                      name="state"
                      placeholder="State Name" 
                      className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.state ? 'border-error' : ''}`} 
                      value={formData.state} 
                      onChange={handleInputChange} 
                    />
                    {errors.state && <span className="text-error text-sm font-medium mt-1">{errors.state}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1">ZIP / Postal Code</label>
                    <input 
                      type="text" 
                      name="zip"
                      placeholder="ZIP code" 
                      maxLength={6}
                      className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.zip ? 'border-error' : ''}`} 
                      value={formData.zip} 
                      onChange={handleInputChange} 
                    />
                    {errors.zip && <span className="text-error text-sm font-medium mt-1">{errors.zip}</span>}
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1">Country</label>
                    <input 
                      type="text" 
                      name="country"
                      placeholder="Country Name" 
                      className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.country ? 'border-error' : ''}`} 
                      value={formData.country} 
                      onChange={handleInputChange} 
                    />
                    {errors.country && <span className="text-error text-sm font-medium mt-1">{errors.country}</span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link to="/cart" className="btn btn-ghost text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-all rounded-xl py-2 px-4 flex items-center gap-2 w-full sm:w-auto justify-center">
                  <ArrowLeft className="h-4 w-4" /> Return to Cart
                </Link>
                <button type="submit" className="btn btn-primary h-12 rounded-xl btn-premium text-sm font-semibold shadow-md flex items-center justify-center gap-2 w-full sm:w-auto px-8">
                  Continue to Payment <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </form>
          </div>

          {/* Right side: Order Summary */}
          <div className="lg:col-span-4 p-6 rounded-[24px] border border-base-300/40 glass-card space-y-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-base-content font-heading tracking-wide">Specimens List</h2>
            
            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {cartItems.map(item => (
                <div key={item._id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-base-200 p-1 flex items-center justify-center border border-base-300/20 overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-base-content line-clamp-1">{item.name}</p>
                      <p className="text-sm text-base-content/60">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-base-content text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-base-300 my-4"></div>

            <div className="space-y-3.5 text-sm text-base-content/85">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-base-content">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-500 font-semibold">{shippingCost === 0 ? 'Complimentary' : `₹${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>GST ({Math.round(taxRate * 100)}%)</span>
                <span className="font-bold text-base-content">₹{taxAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-base-300 my-4"></div>

            <div className="flex justify-between items-baseline font-heading">
              <span className="font-bold text-lg text-base-content">Grand Total</span>
              <span className="font-extrabold text-2xl text-primary">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;