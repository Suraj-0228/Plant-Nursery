import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Sprout, Users, LogOut, ChevronLeft, ChevronRight, ShoppingCart, Leaf } from 'lucide-react';

const AdminSidenav = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
    { to: '/admin/plants', icon: <Sprout />, label: 'Manage Plants' },
    { to: '/admin/users', icon: <Users />, label: 'Manage Users' },
    { to: '/admin/orders', icon: <ShoppingCart />, label: 'Manage Orders' },
  ];

  return (
    <div className={`flex flex-col h-full bg-base-200 text-base-content transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">Admin Panel</span>
            </div>
        )}
        <button className="btn btn-ghost btn-circle" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      
      <ul className="menu p-4 flex-grow">
        {navItems.map(item => (
            <li key={item.to}>
                <NavLink to={item.to} className="flex items-center p-3 hover:bg-base-800 rounded-md text-[1.16rem]">
                    {item.icon}
                    {!isCollapsed && <span className="ml-4">{item.label}</span>}
                </NavLink>
            </li>
        ))}
      </ul>

      <div className="p-4">
        {user && (
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                {!isCollapsed && (
                    <div className="ml-4">
                        <p className="font-bold text-lg">{user.fullname}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                )}
            </div>
        )}
        <button onClick={handleLogout} className={`btn flex justify-start text-error w-full mt-4 ${isCollapsed ? 'btn-circle' : ''}`}>
            <LogOut />
            {!isCollapsed && <span className="ml-1">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidenav;