import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/currency';

interface CartPageProps {
  onPageChange: (page: string) => void;
}

export default function CartPage({ onPageChange }: CartPageProps) {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const shipping = totalPrice > 4000 ? 0 : 799;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handleCheckout = async () => {
    if (!user) {
      onPageChange('login');
      return;
    }

    setIsCheckingOut(true);
    
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderComplete(true);
    clearCart();
    setIsCheckingOut(false);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center animate-scale-in">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Thank you for your order! We'll send you a confirmation email shortly 
              and notify you when your plants are ready for pickup or delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onPageChange('home')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => onPageChange('dashboard')}
                className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-all duration-200 transform hover:scale-105"
              >
                View Order History
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center animate-scale-in">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Discover our beautiful collection of plants and start building your green paradise.
            </p>
            <button
              onClick={() => onPageChange('categories')}
              className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 inline-flex items-center transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-4 animate-slide-in-left">
          <button
            onClick={() => onPageChange('categories')}
            className="flex items-center text-green-600 hover:text-green-700 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Continue Shopping
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart ({items.length})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md animate-slide-in-left">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Cart Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=200';
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{item.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          {item.careLevel}
                        </span>
                        <span className="text-xs text-gray-500">{item.size}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto space-x-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-base sm:text-lg font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">{formatPrice(item.price)} each</div>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-8 animate-slide-in-right">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>
              
              {shipping > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                  <p className="text-xs sm:text-sm text-blue-800">
                    Add {formatPrice(4000 - totalPrice)} more for free shipping!
                  </p>
                </div>
              )}
              
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 disabled:hover:scale-100"
              >
                {isCheckingOut ? (
                  'Processing...'
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </button>
              
              {!user && (
                <p className="text-xs sm:text-sm text-gray-600 text-center mt-3">
                  You'll be redirected to sign in before checkout
                </p>
              )}
              
              <button
                onClick={clearCart}
                className="w-full mt-3 text-red-600 hover:text-red-700 text-xs sm:text-sm transition-colors"
              >
                Clear Cart
              </button>
              
              {/* Security badges */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <div className="text-center text-xs text-gray-500 space-y-2">
                  <p>🔒 Secure checkout with SSL encryption</p>
                  <p>📞 Questions? Call (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}