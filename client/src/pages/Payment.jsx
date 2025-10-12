import React, { useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { CreditCard, Wallet, Package, ArrowLeft } from 'lucide-react';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [paymentData, setPaymentData] = useState({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '', upiId: '' });
  const [errors, setErrors] = useState({});
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
                <p className="mb-8">We couldn't find your shipping details. Please go back to the checkout page and fill them out again.</p>
                <Link to="/checkout" className="btn btn-primary">Go to Checkout</Link>
            </div>
        </div>
    );
  }

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.10;
  const taxAmount = cartTotal * taxRate;
  const shippingCost = 0;
  const codCharges = 50; // Example COD charges
  const grandTotal = paymentMethod === 'COD' ? cartTotal + taxAmount + shippingCost + codCharges : cartTotal + taxAmount + shippingCost;

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setErrors({});
  };

  const handlePaymentDataChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (paymentMethod === 'Card') {
        if (!paymentData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!paymentData.cardHolder) newErrors.cardHolder = 'Card holder is required';
        if (!paymentData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!paymentData.cvv) newErrors.cvv = 'CVV is required';
    } else if (paymentMethod === 'UPI') {
        if (!paymentData.upiId) newErrors.upiId = 'UPI ID is required';
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
      alert('You must be logged in to place an order.');
      navigate('/login');
      return;
    }

    const orderData = {
      user: user._id,
      items: cartItems.map(item => ({ plant: item._id, quantity: item.quantity })),
      shippingAddress: formData,
      billingAddress: formData, // Simplified for this design
      paymentMethod,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        navigate('/orders');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('An error occurred while placing the order.');
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
            <Link to="/checkout" className="text-sm flex items-center text-gray-500 hover:text-primary transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Back to shipping
            </Link>
          </header>

          <form onSubmit={handleSubmit}>
            <section>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <PaymentOption value="Card" current={paymentMethod} onClick={handlePaymentMethodChange} icon={<CreditCard />} label="Credit / Debit Card" />
                <PaymentOption value="UPI" current={paymentMethod} onClick={handlePaymentMethodChange} icon={<Wallet />} label="UPI" />
                <PaymentOption value="COD" current={paymentMethod} onClick={handlePaymentMethodChange} icon={<Package />} label="Cash on Delivery" />
              </div>
            </section>

            <div className="mt-8">
                {paymentMethod === 'Card' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Card Details</h3>
                        <div className="form-control w-full">
                            <label htmlFor="cardNumber" className="label"><span className="label-text font-medium">Card Number</span></label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" className={`input input-bordered rounded-xl mt-1 w-full ${errors.cardNumber ? 'input-error' : ''}`} onChange={handlePaymentDataChange} />
                            {errors.cardNumber && <span className="text-red-500 text-xs mt-1 ml-2">{errors.cardNumber}</span>}
                        </div>
                        <div className="form-control w-full">
                            <label htmlFor="cardHolder" className="label"><span className="label-text font-medium">Card Holder</span></label>
                            <input type="text" id="cardHolder" name="cardHolder" placeholder="John Doe" className={`input input-bordered rounded-xl mt-1 w-full ${errors.cardHolder ? 'input-error' : ''}`} onChange={handlePaymentDataChange} />
                            {errors.cardHolder && <span className="text-red-500 text-xs mt-1 ml-2">{errors.cardHolder}</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label htmlFor="expiryDate" className="label"><span className="label-text font-medium">Expiry Date</span></label>
                                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" className={`input input-bordered rounded-xl mt-1 w-full ${errors.expiryDate ? 'input-error' : ''}`} onChange={handlePaymentDataChange} />
                                {errors.expiryDate && <span className="text-red-500 text-xs mt-1 ml-2">{errors.expiryDate}</span>}
                            </div>
                            <div className="form-control w-full">
                                <label htmlFor="cvv" className="label"><span className="label-text font-medium">CVV</span></label>
                                <input type="text" id="cvv" name="cvv" placeholder="123" className={`input input-bordered rounded-xl mt-1 w-full ${errors.cvv ? 'input-error' : ''}`} onChange={handlePaymentDataChange} />
                                {errors.cvv && <span className="text-red-500 text-xs mt-1 ml-2">{errors.cvv}</span>}
                            </div>
                        </div>
                    </div>
                )}

                {paymentMethod === 'UPI' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">UPI Details:</h3>
                        <div className="flex justify-center mb-4">
                            <img src="src/assets/QR Scanner.jpg" alt="UPI QR Code" className="w-48 h-48" />
                        </div>
                        <div className="form-control w-full">
                            <label htmlFor="upiId" className="label"><span className="label-text font-medium">UPI ID</span></label>
                            <input type="text" id="upiId" name="upiId" placeholder="yourname@upi" className={`input input-bordered rounded-xl mt-1 w-full ${errors.upiId ? 'input-error' : ''}`} onChange={handlePaymentDataChange} />
                            {errors.upiId && <span className="text-red-500 text-xs mt-1 ml-2">{errors.upiId}</span>}
                        </div>
                    </div>
                )}

                {paymentMethod === 'COD' && (
                    <div>
                        <h3 className="text-lg font-semibold">Cash on Delivery</h3>
                        <p className="text-gray-600">You will pay upon delivery.</p>
                        <p className="text-sm text-red-500 mt-2">An extra charge of ₹{codCharges} will be applied for Cash on Delivery.</p>
                    </div>
                )}
            </div>

            <div className="mt-10">
              <button type="submit" className="btn btn-primary rounded-xl w-full">Place Order</button>
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
            {paymentMethod === 'COD' && (
                <div className="flex justify-between text-red-500">
                    <p>COD Charges</p>
                    <p>₹{codCharges.toFixed(2)}</p>
                </div>
            )}
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

const PaymentOption = ({ value, current, onClick, icon, label }) => (
  <div 
    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${current === value ? 'border-primary ring-2 ring-primary' : 'border-base-300'}`}
    onClick={() => onClick(value)}
  >
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white mr-4">
        {icon}
    </div>
    <p className="font-semibold flex-grow">{label}</p>
    <div className={`w-5 h-5 rounded-full border-2 ${current === value ? 'bg-primary border-primary' : 'border-base-300'} flex items-center justify-center`}>
        {current === value && <div className="w-2 h-2 rounded-full bg-white"></div>}
    </div>
  </div>
);

export default Payment;