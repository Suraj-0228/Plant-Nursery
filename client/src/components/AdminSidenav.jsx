import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { LayoutDashboard, Sprout, Users, LogOut, ChevronLeft, ChevronRight, ShoppingCart, Leaf, Percent } from 'lucide-react';

const AdminSidenav = () => {
  const { logout, user } = useContext(AuthContext);
  const { showPopup } = useModal();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    showPopup({
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out of your session?',
      type: 'confirm',
      onConfirm: () => {
        logout();
        navigate('/login');
      }
    });
  };

  const navItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { to: '/admin/plants', icon: <Sprout className="h-5 w-5" />, label: 'Manage Plants' },
    { to: '/admin/orders', icon: <ShoppingCart className="h-5 w-5" />, label: 'Manage Orders' },
    { to: '/admin/users', icon: <Users className="h-5 w-5" />, label: 'Manage Users' },
    { to: '/admin/tax', icon: <Percent className="h-5 w-5" />, label: 'GST Settings' },
  ];

  return (
    <div className={`flex flex-col h-full bg-base-200 border-r border-base-300 text-base-content transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Brand Header */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-base-300/40`}>
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-2 rounded-xl text-primary">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-wider font-heading">
              GREEN<span className="text-accent">THUMB</span>
            </span>
          </Link>
        )}
        <button 
          className="btn btn-ghost btn-circle btn-sm text-base-content/75 hover:bg-primary/10 hover:text-primary transition-colors" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-grow py-6 px-4">
        <ul className="space-y-2 font-medium">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink 
                to={item.to} 
                className={({ isActive }) => `flex items-center p-3 rounded-xl transition-all duration-300 text-sm ${
                  isActive 
                    ? 'bg-primary text-white shadow-md font-semibold' 
                    : 'text-base-content/75 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <div className="shrink-0">{item.icon}</div>
                {!isCollapsed && <span className="ml-4 tracking-wide">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User / Logout Section */}
      <div className="p-4 border-t border-base-300/40 space-y-4 bg-base-200/50">
        {user && !isCollapsed && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 border border-primary/20">
              {user.fullname.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm text-base-content truncate font-heading">{user.fullname}</p>
              <p className="text-xs text-base-content/65 truncate">{user.email}</p>
            </div>
          </div>
        )}
        
        <button 
          onClick={handleLogout} 
          className={`btn justify-center text-error hover:bg-error/15 h-11 w-full rounded-xl btn-premium text-sm font-semibold flex items-center ${
            isCollapsed ? 'btn-circle justify-center p-0' : 'px-4'
          }`}
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>

    </div>
  );
};

export default AdminSidenav;