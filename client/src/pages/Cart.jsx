import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ArrowLeft, CheckCircle2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.05; // 5% tax rate
  const taxAmount = cartTotal * taxRate;
  const shippingCost = 0; // Free shipping
  const grandTotal = cartTotal + taxAmount + shippingCost;

  return (
    <div className="bg-base-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-6xl">
        
        {/* Stepper Progress Bar */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-between text-sm font-semibold text-base-content/55 relative">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-base-300 -translate-y-1/2 z-0"></div>
            <div className="absolute left-0 right-1/2 top-1/2 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-350"></div>
            
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-base-100">
                1
              </div>
              <span className="text-primary font-bold">Shopping Bag</span>
            </div>
            
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-base-300 text-base-content/75 flex items-center justify-center font-bold text-sm ring-4 ring-base-100">
                2
              </div>
              <span>Shipping Details</span>
            </div>
            
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-base-300 text-base-content/75 flex items-center justify-center font-bold text-sm ring-4 ring-base-100">
                3
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-base-content font-heading mb-10 text-center">Your Shopping Bag</h1>

        {cartItems.length === 0 ? (
          <div className="text-center p-16 rounded-[32px] border border-base-300/40 glass-card max-w-lg mx-auto space-y-6">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-primary">
              <ShoppingBag size={36} />
            </div>
            <h2 className="text-2xl font-bold font-heading text-base-content">Your bag is empty</h2>
            <p className="text-base-content/75 text-sm max-w-xs mx-auto">Add some healthy, beautiful plant specimens to bring organic structure to your home.</p>
            <Link to="/category" className="btn btn-primary h-12 px-6 rounded-xl btn-premium text-sm font-semibold flex items-center justify-center gap-2 max-w-xs mx-auto">
              <ArrowLeft className="h-4 w-4" /> Continue Browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left side: Items list */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="p-5 rounded-2xl border border-base-300/40 glass-card flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="avatar">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-base-200 p-2 flex items-center justify-center border border-base-300/30">
                        <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                      </div>
                    </div>
                    <div>
                      <span className="text-primary font-bold text-sm uppercase tracking-wider">{item.category}</span>
                      <h3 className="text-lg font-bold text-base-content font-heading">{item.name}</h3>
                      <p className="text-primary font-semibold text-sm">₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity Control & Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-base-200 border border-base-300/40">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                        className="btn btn-ghost btn-circle btn-sm hover:bg-primary hover:text-white transition-all text-base-content"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-base-content">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                        className="btn btn-ghost btn-circle btn-sm hover:bg-primary hover:text-white transition-all text-base-content"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-bold text-base-content font-heading text-lg w-20 text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item._id)} className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex justify-between items-center">
                <Link to="/category" className="btn btn-ghost text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-all rounded-xl py-2 px-4 flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Continue Shopping
                </Link>
                <button onClick={clearCart} className="btn btn-ghost text-error hover:bg-error/10 text-sm font-semibold rounded-xl py-2 px-4">
                  Clear All Items
                </button>
              </div>
            </div>

            {/* Right side: Order Summary */}
            <div className="lg:col-span-4 p-6 rounded-[24px] border border-base-300/40 glass-card space-y-6">
              <h2 className="text-xl font-bold text-base-content font-heading tracking-wide">Order Summary</h2>
              
              <div className="space-y-3.5 text-sm text-base-content/85">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-base-content">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Botanical Shipping</span>
                  <span className="text-emerald-500 font-semibold">{shippingCost === 0 ? 'Complimentary' : `₹${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({taxRate * 100}%)</span>
                  <span className="font-bold text-base-content">₹{taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-base-300 my-4"></div>

              <div className="flex justify-between items-baseline font-heading">
                <span className="font-bold text-lg text-base-content">Grand Total</span>
                <span className="font-extrabold text-2xl text-primary">₹{grandTotal.toFixed(2)}</span>
              </div>

              <div className="space-y-3 pt-2">
                <Link to="/checkout" className="btn btn-primary h-12 w-full rounded-2xl btn-premium text-sm font-semibold shadow-md flex items-center justify-center gap-2">
                  <CreditCard className="h-4.5 w-4.5" /> Proceed to Details
                </Link>
                <div className="flex items-center gap-2 justify-center text-base-content/60 text-[11px] font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Secure SSL Checkout
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;