import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft, User, Mail, Phone, Home } from 'lucide-react';

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
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.05;
  const taxAmount = cartTotal * taxRate;
  const shippingCost = 0;
  const grandTotal = cartTotal + taxAmount + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.street) newErrors.street = 'Street is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zip) newErrors.zip = 'ZIP code is required';
    if (!formData.country) newErrors.country = 'Country is required';

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
        alert('An error occurred while updating your information.');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 font-sans p-7">
      <div className="container mx-auto px-4 py-8 lg:grid lg:grid-cols-2 lg:gap-16">
        
        {/* Left side: Form */}
        <div className="lg:pr-8">
          <header className="flex items-center justify-between mb-10">
            <Link to="/" className="text-3xl font-bold text-primary flex items-center">
              GreenThumb
            </Link>
            <Link to="/cart" className="text-sm flex items-center text-gray-500 hover:text-primary transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Return to cart
            </Link>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>                        
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <div className="flex items-center mb-2">
                        <User size={18} className="text-gray-400 mr-2"/>
                        <label htmlFor="fullName" className="label-text font-medium">Full Name</label>
                    </div>
                    <input type="text" id="fullName" name="fullName" placeholder="John Doe" className={`input input-bordered rounded-xl w-full px-5 ${errors.fullName ? 'input-error' : ''}`} value={formData.fullName} onChange={handleInputChange} />
                    {errors.fullName && <span className="text-red-500 text-xs mt-1 ml-2">{errors.fullName}</span>}
                  </div>
                  <div className="form-control w-full">
                    <div className="flex items-center mb-2">
                        <Mail size={18} className="text-gray-400 mr-2"/>
                        <label htmlFor="email" className="label-text font-medium">Email</label>
                    </div>
                    <input type="email" id="email" name="email" placeholder="john.doe@example.com" className={`input input-bordered rounded-xl w-full px-5 ${errors.email ? 'input-error' : ''}`} value={formData.email} onChange={handleInputChange} />
                    {errors.email && <span className="text-red-500 text-xs mt-1 ml-2">{errors.email}</span>}
                  </div>
                  <div className="form-control w-full">
                    <div className="flex items-center mb-2">
                        <Phone size={18} className="text-gray-400 mr-2"/>
                        <label htmlFor="phone" className="label-text font-medium">Phone</label>
                    </div>
                    <input type="tel" id="phone" name="phone" placeholder="+1 (555) 123-4567" className={`input input-bordered rounded-xl w-full px-5 ${errors.phone ? 'input-error' : ''}`} value={formData.phone} onChange={handleInputChange} />
                    {errors.phone && <span className="text-red-500 text-xs mt-1 ml-2">{errors.phone}</span>}
                  </div>
                </div>
              </section>

              <div className="divider"></div>

              <section>
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <div className="flex items-center mb-2">
                        <Home size={18} className="text-gray-400 mr-2"/>
                        <label htmlFor="street" className="label-text font-medium">Address</label>
                    </div>
                    <input type="text" id="street" name="street" placeholder="123 Main St" className={`input input-bordered rounded-xl w-full px-5 ${errors.street ? 'input-error' : ''}`} value={formData.street} onChange={handleInputChange} />
                    {errors.street && <span className="text-red-500 text-xs mt-1 ml-2">{errors.street}</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                        <div className="flex items-center mb-2">
                            <Home size={18} className="text-gray-400 mr-2"/>
                            <label htmlFor="city" className="label-text font-medium">City</label>
                        </div>
                      <input type="text" id="city" name="city" placeholder="Anytown" className={`input input-bordered rounded-xl w-full px-5 ${errors.city ? 'input-error' : ''}`} value={formData.city} onChange={handleInputChange} />
                      {errors.city && <span className="text-red-500 text-xs mt-1 ml-2">{errors.city}</span>}
                    </div>
                    <div className="form-control w-full">
                        <div className="flex items-center mb-2">
                            <Home size={18} className="text-gray-400 mr-2"/>
                            <label htmlFor="state" className="label-text font-medium">State / Province</label>
                        </div>
                      <input type="text" id="state" name="state" placeholder="California" className={`input input-bordered rounded-xl w-full px-5 ${errors.state ? 'input-error' : ''}`} value={formData.state} onChange={handleInputChange} />
                      {errors.state && <span className="text-red-500 text-xs mt-1 ml-2">{errors.state}</span>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                        <div className="flex items-center mb-2">
                            <Home size={18} className="text-gray-400 mr-2"/>
                            <label htmlFor="zip" className="label-text font-medium">ZIP / Postal code</label>
                        </div>
                      <input type="text" id="zip" name="zip" placeholder="12345" className={`input input-bordered rounded-xl w-full px-5 ${errors.zip ? 'input-error' : ''}`} value={formData.zip} onChange={handleInputChange} />
                      {errors.zip && <span className="text-red-500 text-xs mt-1 ml-2">{errors.zip}</span>}
                    </div>
                    <div className="form-control w-full">
                        <div className="flex items-center mb-2">
                            <Home size={18} className="text-gray-400 mr-2"/>
                            <label htmlFor="country" className="label-text font-medium">Country</label>
                        </div>
                      <input type="text" id="country" name="country" placeholder="United States" className={`input input-bordered rounded-xl w-.full px-5 ${errors.country ? 'input-error' : ''}`} value={formData.country} onChange={handleInputChange} />
                      {errors.country && <span className="text-red-500 text-xs mt-1 ml-2">{errors.country}</span>}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-10">
              <button type="submit" className="btn btn-primary w-full">Continue to Payment</button>
            </div>
          </form>
        </div>

        {/* Right side: Order Summary */}
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg mt-10 lg:mt-0 h-fit lg:sticky top-8">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-lg">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="divider my-6"></div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><p className="text-gray-500">Subtotal</p><p>₹{cartTotal.toFixed(2)}</p></div>
            <div className="flex justify-between"><p className="text-gray-500">Shipping</p><p>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</p></div>
            <div className="flex justify-between"><p className="text-gray-500">Taxes</p><p>₹{taxAmount.toFixed(2)}</p></div>
          </div>

          <div className="divider my-6"></div>

          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>₹{grandTotal.toFixed(2)}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;