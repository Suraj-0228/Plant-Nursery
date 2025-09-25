
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, ShoppingCart } from 'lucide-react';
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
    if (theme === 'garden') {
      setTheme('forest');
    } else {
      setTheme('garden');
    }
  };

  return (
    <header className="bg-base-100 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link to="/" className="block text-primary">
              <span className="text-2xl font-bold">GreenThumb Nursery</span>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6">
                <li><Link className="text-base-content transition hover:text-primary" to="/">Home</Link></li>
                <li><Link className="text-base-content transition hover:text-primary" to="/category">Category</Link></li>
                <li><Link className="text-base-content transition hover:text-primary" to="/guide">Guide</Link></li>
                <li><Link className="text-base-content transition hover:text-primary" to="/about">About</Link></li>
                <li><Link className="text-base-content transition hover:text-primary" to="/contact">Contact</Link></li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/cart" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <ShoppingCart />
                  {cartItems.length > 0 && (
                    <span className="badge badge-sm badge-primary indicator-item">{cartItems.length}</span>
                  )}
                </div>
              </Link>

              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <User className='mx-[0.47rem] my-[0.46rem]' />
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 p-2 shadow menu  dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                      <Link to="/account" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a onClick={logout}>Logout</a></li>
                  </ul>
                </div>
              ) : (
                <div className="sm:flex sm:gap-4">
                  <Link className="rounded-md bg-primary px-5 py-2.5 font-medium text-white shadow" to="/login">Login</Link>
                  <div className="hidden sm:flex">
                    <Link className="rounded-md bg-gray-100 px-5 py-2.5 font-medium text-primary" to="/register">Register</Link>
                  </div>
                </div>
              )}

              <label className="swap swap-rotate">
                <input type="checkbox" onChange={handleToggle} checked={theme === 'forest'} />
                <Sun className="swap-on fill-current w-5 h-5" />
                <Moon className="swap-off fill-current w-5 h-5" />
              </label>

              <div className="block md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  {isOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <nav aria-label="Global">
              <ul className="flex flex-col items-center gap-6 py-4">
                 <li><Link className="text-base-content transition hover:text-primary" to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                <li><Link className="text-base-content transition hover:text-primary" to="/category" onClick={() => setIsOpen(false)}>Category</Link></li>
                <li><Link className="text-base-content transition hover:text-primary" to="/guide" onClick={() => setIsOpen(false)}>Guide</Link></li>
                <li><Link className="text-base-content transition hover:text-primary" to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                <li><Link className="text-base-content transition hover:text-primary" to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
