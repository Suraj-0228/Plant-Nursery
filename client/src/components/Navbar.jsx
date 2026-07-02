import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, ShoppingCart, Leaf, Heart, LayoutDashboard, ShoppingBag, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useModal } from '../context/ModalContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'premium-dark' ? 'premium-dark' : 'premium-light';
  });
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { showPopup } = useModal();
  const location = useLocation();
  const navigate = useNavigate();

  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'premium-dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setWishlistCount(0);
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/wishlist/${user._id}`);
        if (res.ok) {
          const data = await res.json();
          setWishlistCount(data.plants.length);
        }
      } catch (error) {
        console.error('Failed to fetch wishlist count', error);
      }
    };
    fetchWishlist();
    const interval = setInterval(fetchWishlist, 3000);
    return () => clearInterval(interval);
  }, [user]);

  const handleToggle = () => {
    setTheme(prev => prev === 'premium-light' ? 'premium-dark' : 'premium-light');
  };

  const isLinkActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Category', path: '/category' },
    { name: 'Guide', path: '/guide' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 glass-navbar">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-all duration-300">
                <Leaf className="text-primary h-6 w-6 transition-transform duration-500 group-hover:rotate-12" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-primary font-heading">
                Green<span className="text-accent">Thumb</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className={`relative text-sm tracking-wide transition-all duration-300 hover:text-primary py-2 ${
                      isLinkActive(link.path) 
                        ? 'text-primary font-semibold' 
                        : 'text-base-content/80'
                    }`}
                  >
                    {link.name}
                    {isLinkActive(link.path) && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent rounded-full animate-fade-in"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons & Profile */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <button 
              onClick={handleToggle} 
              className="btn btn-ghost btn-circle text-base-content/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'premium-light' ? (
                <Moon className="w-5 h-5 text-indigo-500 fill-indigo-100" />
              ) : (
                <Sun className="w-5 h-5 text-warning fill-amber-100" />
              )}
            </button>

            {/* User Account Dropdown (Consolidated) */}
            <div className="dropdown dropdown-end">
              <label 
                tabIndex={0} 
                className="btn btn-ghost btn-circle avatar bg-primary/10 hover:bg-primary/20 text-primary border-2 border-white/20 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
                  {user ? (
                    <img src={`https://ui-avatars.com/api/?name=${user.fullname}&background=124c36&color=fff&size=80`} alt={user.fullname} className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 mx-auto text-primary" />
                  )}
                </div>
              </label>
              <ul 
                tabIndex={0} 
                className="mt-3 p-2 shadow-2xl menu dropdown-content bg-base-100 border border-base-300 rounded-2xl w-56 animate-fade-in-up opaque-dropdown"
              >
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-base-300/40 mb-2">
                      <p className="text-sm font-semibold text-base-content font-heading">{user.fullname}</p>
                      <p className="text-sm text-base-content/60 truncate">{user.email}</p>
                    </div>
                    {user.isAdmin && (
                      <li>
                        <Link to="/admin/dashboard" className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary p-2.5 rounded-lg text-sm transition-all duration-200">
                          <LayoutDashboard className="h-4 w-4" /> Admin Console
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to="/account" className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary p-2.5 rounded-lg text-sm transition-all duration-200">
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary p-2.5 rounded-lg text-sm transition-all duration-200">
                        <ShoppingBag className="h-4 w-4" /> My Orders
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-base-300/40 mb-2">
                      <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Welcome Guest</p>
                    </div>
                    <li>
                      <Link to="/login" className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary p-2.5 rounded-lg text-sm transition-all duration-200 font-bold text-primary">
                        <User className="h-4 w-4" /> Sign In
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary p-2.5 rounded-lg text-sm transition-all duration-200 font-bold">
                        <User className="h-4 w-4" /> Register
                      </Link>
                    </li>
                  </>
                )}

                <div className="divider my-1 opacity-40"></div>

                {/* Wishlist Link inside Dropdown */}
                <li>
                  <Link to="/wishlist" className="flex items-center justify-between hover:bg-primary/10 hover:text-primary p-2.5 rounded-lg text-sm transition-all duration-200">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500 animate-pulse-subtle" /> My Wishlist
                    </div>                    
                  </Link>
                </li>

                {/* Cart Link inside Dropdown */}
                <li>
                  <Link to="/cart" className="flex items-center justify-between hover:bg-primary/10 hover:text-primary p-2.5 rounded-lg text-sm transition-all duration-200">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-primary animate-bounce-subtle" /> My Cart
                    </div>
                    {cartItems.length > 0 && (
                      <span className="badge badge-sm badge-primary border-none text-[10px] font-bold px-1.5 py-0.5 animate-scale-up">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                </li>

                {user && (
                  <>
                    <div className="divider my-1 opacity-40"></div>
                    <li>
                      <button 
                        onClick={() => {
                          showPopup({
                            title: 'Confirm Logout',
                            message: 'Are you sure you want to log out of your session?',
                            type: 'confirm',
                            onConfirm: () => {
                              logout();
                              navigate('/login');
                            }
                          });
                        }} 
                        className="flex items-center gap-2 text-error font-bold hover:bg-error/10 hover:text-error p-2.5 rounded-lg text-sm transition-all duration-200 w-full text-left"
                      >
                        <LogOut className="h-4 w-4" /> Logout Account
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Mobile Menu Icon */}
            <div className="block md:hidden"> 
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="btn btn-ghost btn-circle text-base-content/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden pb-6 animate-fade-in-up">
            <nav className="flex flex-col gap-4 py-4 px-2 bg-base-200/50 rounded-2xl border border-base-300/40 glass-card">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.name} className="w-full">
                    <Link 
                      to={link.path} 
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                        isLinkActive(link.path) 
                          ? 'bg-primary text-white font-semibold shadow-md' 
                          : 'hover:bg-primary/10 hover:text-primary text-base-content/80'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {!user && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-base-300/40 px-2">
                  <Link 
                    className="btn btn-outline btn-primary text-sm w-full btn-premium" 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    className="btn btn-primary text-sm w-full btn-premium" 
                    to="/register" 
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;