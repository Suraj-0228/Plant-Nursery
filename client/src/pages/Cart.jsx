import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center p-12 bg-base-200 rounded-lg shadow-inner">
            <ShoppingCart size={64} className="mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-base-content/70 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/category" className="btn btn-primary">
              <ArrowLeft className="mr-2" /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.image} alt={item.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>
                        <div className="join">
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                            className="btn join-item btn-sm"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="btn join-item btn-sm pointer-events-none">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                            className="btn join-item btn-sm"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                      <th>
                        <button onClick={() => removeFromCart(item._id)} className="btn btn-ghost btn-xs">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex-grow">
                    <Link to="/category" className="btn btn-outline">
                        <ArrowLeft className="mr-2" /> Continue Shopping
                    </Link>
                </div>
                <div className="w-full md:w-1/3 bg-base-200 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>₹{cartTotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p className="font-medium">Free</p>
                        </div>
                    </div>
                    <div className="divider my-4"></div>
                    <div className="flex justify-between font-bold text-lg mb-4">
                        <p>Grand Total</p>
                        <p>₹{cartTotal.toFixed(2)}</p>
                    </div>
                    <button className="btn btn-primary w-full">
                        <CreditCard className="mr-2" /> Proceed to Checkout
                    </button>
                     <button onClick={clearCart} className="btn btn-ghost text-error w-full mt-2">
                        Clear Cart
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;