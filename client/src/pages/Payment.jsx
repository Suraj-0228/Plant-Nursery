import React, { useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { CreditCard, Wallet, Package, ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [paymentData, setPaymentData] = useState({ 
    cardNumber: '', 
    cardHolder: '', 
    expiryDate: '', 
    cvv: '', 
    upiId: '' 
  });
  const [errors, setErrors] = useState({});
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { showPopup } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md p-8 rounded-[32px] border border-base-300/40 glass-card space-y-6">
          <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-2xl font-bold font-heading text-base-content">Shipping Details Missing</h1>
          <p className="text-base-content/75 text-sm">We couldn't retrieve your shipping parameters. Please return to checkout to proceed.</p>
          <Link to="/checkout" className="btn btn-primary w-full h-12 rounded-xl btn-premium font-semibold">
            Return to Checkout
          </Link>
        </div>
      </div>
    );
  }

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.05;
  const taxAmount = cartTotal * taxRate;
  const shippingCost = 0;
  const codCharges = 50; 
  const grandTotal = paymentMethod === 'COD' 
    ? cartTotal + taxAmount + shippingCost + codCharges 
    : cartTotal + taxAmount + shippingCost;

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setErrors({});
  };

  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 16) {
        setPaymentData(prev => ({ ...prev, [name]: cleanValue }));
      }
      return;
    }

    if (name === 'cvv') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 3) {
        setPaymentData(prev => ({ ...prev, [name]: cleanValue }));
      }
      return;
    }

    if (name === 'expiryDate') {
      const cleanValue = value.replace(/[^0-9/]/g, '');
      if (cleanValue.length <= 5) {
        setPaymentData(prev => ({ ...prev, [name]: cleanValue }));
      }
      return;
    }

    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (paymentMethod === 'Card') {
      if (!paymentData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s+/g, ''))) {
        newErrors.cardNumber = 'Card number must be exactly 16 digits';
      }

      if (!paymentData.cardHolder) {
        newErrors.cardHolder = 'Card holder name is required';
      } else if (paymentData.cardHolder.trim().length < 3) {
        newErrors.cardHolder = 'Card holder name must be at least 3 characters';
      }

      if (!paymentData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else {
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/;
        if (!regex.test(paymentData.expiryDate)) {
          newErrors.expiryDate = 'Expiry date must be in MM/YY format';
        } else {
          const match = paymentData.expiryDate.match(regex);
          const month = parseInt(match[1], 10);
          let yearStr = match[2];
          if (yearStr.length === 2) yearStr = '20' + yearStr;
          const year = parseInt(yearStr, 10);
          
          const now = new Date();
          const currentMonth = now.getMonth() + 1;
          const currentYear = now.getFullYear();
          
          if (year < currentYear || (year === currentYear && month < currentMonth)) {
            newErrors.expiryDate = 'This card is expired';
          }
        }
      }

      if (!paymentData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3}$/.test(paymentData.cvv)) {
        newErrors.cvv = 'CVV must be exactly 3 numeric digits';
      }
    } else if (paymentMethod === 'UPI') {
      if (!paymentData.upiId) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!/^[\w.\-]+@[\w\-]+$/.test(paymentData.upiId.trim())) {
        newErrors.upiId = 'UPI ID format is invalid (e.g. name@bank)';
      }
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

    if (!user) {
      showPopup({
        title: 'Authentication Required',
        message: 'You must be logged in to place an order!',
        type: 'error',
        onConfirm: () => {
          navigate('/login');
        }
      });
      return;
    }

    const orderData = {
      user: user._id,
      items: cartItems.map(item => ({ plant: item._id, quantity: item.quantity })),
      shippingAddress: formData,
      billingAddress: formData, 
      paymentMethod,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        showPopup({
          title: 'Order Placed!',
          message: 'Your nursery order has been submitted successfully.',
          type: 'success',
          onConfirm: () => {
            clearCart();
            navigate('/orders');
          }
        });
      } else {
        showPopup({
          title: 'Failed',
          message: 'Failed to place your order.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Order Submission Error: ', error);
      showPopup({
        title: 'Error',
        message: 'An error occurred while placing the order.',
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
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-primary -translate-y-1/2 z-0"></div>
            
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-base-100">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-primary font-bold">Shopping Bag</span>
            </div>
            
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm ring-4 ring-base-100">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-primary font-bold">Shipping Details</span>
            </div>
            
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm ring-4 ring-base-100">
                3
              </div>
              <span className="text-primary font-bold">Payment</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-base-content font-heading mb-10 text-center">Payment Verification</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left side: Form */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-[24px] border border-base-300/40 glass-card space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Payment Methods Options */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-base-content font-heading border-b border-base-300 pb-2">Select Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <PaymentOption 
                    value="Card" 
                    current={paymentMethod} 
                    onClick={handlePaymentMethodChange} 
                    icon={<CreditCard className="h-5 w-5" />} 
                    label="Card Payment" 
                  />
                  <PaymentOption 
                    value="UPI" 
                    current={paymentMethod} 
                    onClick={handlePaymentMethodChange} 
                    icon={<Wallet className="h-5 w-5" />} 
                    label="UPI Transfer" 
                  />
                  <PaymentOption 
                    value="COD" 
                    current={paymentMethod} 
                    onClick={handlePaymentMethodChange} 
                    icon={<Package className="h-5 w-5" />} 
                    label="Cash on Delivery" 
                  />
                </div>
              </div>

              {/* Dynamic input sections based on method */}
              <div className="pt-2">
                {paymentMethod === 'Card' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-base-content font-heading">Card Details</h3>
                    
                    {/* Premium credit card mockup */}
                    <div className="w-full max-w-sm mx-auto aspect-[1.586/1] rounded-2xl bg-gradient-to-tr from-primary to-accent text-white p-6 shadow-xl relative overflow-hidden flex flex-col justify-between font-heading">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                      <div className="flex justify-between items-start">
                        <span className="font-bold tracking-wider text-sm">SECURE CARD</span>
                        <div className="w-10 h-7 bg-white/20 rounded-md backdrop-blur-md"></div>
                      </div>
                      <div className="text-xl sm:text-2xl font-mono tracking-[0.2em] py-2 truncate">
                        {paymentData.cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-[10px] text-white/60 tracking-wider font-semibold uppercase">Card Holder</p>
                          <p className="text-sm font-semibold tracking-wide uppercase truncate max-w-[160px]">{paymentData.cardHolder || 'FULL NAME'}</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-[10px] text-white/60 tracking-wider font-semibold uppercase">Expires</p>
                          <p className="text-sm font-semibold tracking-wide">{paymentData.expiryDate || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="form-control w-full space-y-2">
                        <label className="text-sm font-semibold text-base-content/85 ml-1">Card Number</label>
                        <input 
                          type="text" 
                          name="cardNumber" 
                          placeholder="4000123456789010" 
                          maxLength={16}
                          className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.cardNumber ? 'border-error' : ''}`} 
                          value={paymentData.cardNumber}
                          onChange={handlePaymentDataChange} 
                        />
                        {errors.cardNumber && <span className="text-error text-sm font-medium mt-1">{errors.cardNumber}</span>}
                      </div>

                      <div className="form-control w-full space-y-2">
                        <label className="text-sm font-semibold text-base-content/85 ml-1">Card Holder Name</label>
                        <input 
                          type="text" 
                          name="cardHolder" 
                          placeholder="John Doe" 
                          className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.cardHolder ? 'border-error' : ''}`} 
                          value={paymentData.cardHolder}
                          onChange={handlePaymentDataChange} 
                        />
                        {errors.cardHolder && <span className="text-error text-sm font-medium mt-1">{errors.cardHolder}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="form-control w-full space-y-2">
                        <label className="text-sm font-semibold text-base-content/85 ml-1">Expiry Date</label>
                        <input 
                          type="text" 
                          name="expiryDate" 
                          placeholder="MM/YY" 
                          maxLength="5"
                          className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.expiryDate ? 'border-error' : ''}`} 
                          value={paymentData.expiryDate}
                          onChange={handlePaymentDataChange} 
                        />
                        {errors.expiryDate && <span className="text-error text-sm font-medium mt-1">{errors.expiryDate}</span>}
                      </div>

                      <div className="form-control w-full space-y-2">
                        <label className="text-sm font-semibold text-base-content/85 ml-1">CVV</label>
                        <input 
                          type="password" 
                          name="cvv" 
                          placeholder="•••" 
                          maxLength="3"
                          className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.cvv ? 'border-error' : ''}`} 
                          value={paymentData.cvv}
                          onChange={handlePaymentDataChange} 
                        />
                        {errors.cvv && <span className="text-error text-sm font-medium mt-1">{errors.cvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'UPI' && (
                  <div className="space-y-6 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-base-content font-heading w-full text-left">UPI Transfer</h3>
                    
                    <div className="p-4 rounded-2xl bg-white border border-base-300 shadow-md flex flex-col items-center gap-3">
                      <img src="src/assets/QR Scanner.jpg" alt="UPI QR Scanner" className="w-44 h-44 object-contain" />
                      <span className="text-xs text-black/60 uppercase tracking-widest font-bold">Scan to Pay</span>
                    </div>
                    
                    <div className="form-control w-full max-w-md space-y-2">
                      <label className="text-sm font-semibold text-base-content/85 ml-1">Enter UPI ID</label>
                      <input 
                        type="text" 
                        name="upiId" 
                        placeholder="username@bank" 
                        maxLength={50}
                        className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.upiId ? 'border-error' : ''}`} 
                        value={paymentData.upiId}
                        onChange={handlePaymentDataChange} 
                      />
                      {errors.upiId && <span className="text-error text-sm font-medium mt-1">{errors.upiId}</span>}
                    </div>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                    <h3 className="text-lg font-bold text-amber-600 font-heading">Cash on Delivery Policy</h3>
                    <p className="text-base-content/85 text-sm leading-relaxed">
                      You will pay our courier partner in cash upon physical receipt of your plant specimens.
                    </p>
                    <p className="text-sm text-error font-semibold">
                      Please note: A convenience fee of ₹{codCharges.toFixed(2)} is added to support physical handling costs.
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link to="/checkout" className="btn btn-ghost text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-all rounded-xl py-2 px-4 flex items-center gap-2 w-full sm:w-auto justify-center">
                  <ArrowLeft className="h-4 w-4" /> Return to Shipping
                </Link>
                <button type="submit" className="btn btn-primary h-12 rounded-xl btn-premium text-sm font-semibold shadow-md flex items-center justify-center gap-2 w-full sm:w-auto px-8">
                  Place Order Specimen
                </button>
              </div>

            </form>
          </div>

          {/* Right side: Order Summary */}
          <div className="lg:col-span-4 p-6 rounded-[24px] border border-base-300/40 glass-card space-y-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-base-content font-heading tracking-wide">Specimens Summary</h2>
            
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
                <span>Tax (5%)</span>
                <span className="font-bold text-base-content">₹{taxAmount.toFixed(2)}</span>
              </div>
              {paymentMethod === 'COD' && (
                <div className="flex justify-between text-error font-medium">
                  <span>COD Handling Fee</span>
                  <span>₹{codCharges.toFixed(2)}</span>
                </div>
              )}
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

const PaymentOption = ({ value, current, onClick, icon, label }) => {
  const isSelected = current === value;
  return (
    <div 
      className={`border rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
          : 'border-base-300 hover:border-primary/20'
      }`}
      onClick={() => onClick(value)}
    >
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-300 ${
        isSelected ? 'bg-primary text-white' : 'bg-base-200 text-base-content/70'
      }`}>
        {icon}
      </div>
      <div className="flex-grow text-center sm:text-left">
        <p className="font-bold text-sm text-base-content font-heading leading-tight">{label}</p>
      </div>
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
        isSelected ? 'bg-primary border-primary' : 'border-base-300'
      }`}>
        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
      </div>
    </div>
  );
};

export default Payment;