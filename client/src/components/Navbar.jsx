import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, ShoppingCart, Leaf, Heart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'garden');
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === 'garden' ? 'forest' : 'garden');
  };

  const navLinks = (
    <>
      <li><Link className="text-base-content transition hover:text-primary" to="/">Home</Link></li>
      <li><Link className="text-base-content transition hover:text-primary" to="/category">Category</Link></li>
      <li><Link className="text-base-content transition hover:text-primary" to="/guide">Guide</Link></li>
      <li><Link className="text-base-content transition hover:text-primary" to="/about">About</Link></li>
      <li><Link className="text-base-content transition hover:text-primary" to="/contact">Contact</Link></li>
    </>
  );

  return (
    <header className="bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className='text-primary h-8 w-8'/>
              <span className="text-3xl font-bold text-primary">GreenThumb</span>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-8">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-8 text-lg">
                {navLinks}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/cart" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="badge badge-sm badge-primary indicator-item">{cartItems.length}</span>
                  )}
                </div>
              </Link>
              
              <Link to="/wishlist" className="btn btn-ghost btn-circle">
                <Heart className="h-6 w-6" />
              </Link>

              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar bg-base-200 hover:bg-base-300 transition-colors duration-200">
                    <div className="w-10 rounded-full flex items-center justify-center">
                      <User className='h-6 w-6 mx-[7px] my-[6px] text-base-content' />
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-50">
                    <li>
                      <Link to="/account" className="justify-between">
                        My Account
                      </Link>
                    </li>
                    <li><Link to="/orders">My Orders</Link></li>
                    <li><a onClick={logout} className='text-error'>Logout</a></li>
                  </ul>
                </div>
              ) : (
                <div className="hidden sm:flex sm:gap-4">
                  <Link className="btn btn-primary" to="/login">Login</Link>
                  <Link className="btn btn-outline btn-primary" to="/register">Register</Link>
                </div>
              )}

              <button onClick={handleToggle} className="btn btn-ghost btn-circle hover:bg-base-300 transition-colors duration-200">
                {theme === 'garden' ? <Moon className="fill-current w-6 h-6 ml-[2px] text-info" /> : <Sun className="fill-current w-6 h-6 ml-[1px] text-warning" />}
              </button>

              <div className="block md:hidden"> 
                <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost btn-circle">
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden pb-4">
            <nav aria-label="Global">
              <ul className="flex flex-col items-center gap-6 py-4">
                {navLinks}
                <div className="sm:hidden flex flex-col gap-4 mt-4">
                  {!user && (
                    <>
                      <Link className="btn btn-primary w-full" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                      <Link className="btn btn-outline btn-primary w-full" to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                    </>
                  )}
                </div>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;