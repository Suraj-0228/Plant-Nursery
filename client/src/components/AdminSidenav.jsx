import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Sprout, Users, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminSidenav = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`h-full bg-base-200 text-base-content transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>}
        <button className="btn btn-ghost btn-circle" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <ul className="menu p-4">
        <li>
          <NavLink to="/admin/dashboard" className="flex items-center p-2 hover:bg-base-300 rounded-md">
            <LayoutDashboard className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/plants" className="flex items-center p-2 hover:bg-base-300 rounded-md">
            <Sprout className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Manage Plants</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="flex items-center p-2 hover:bg-base-300 rounded-md">
            <Users className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Manage Users</span>}
          </NavLink>
        </li>
      </ul>
      <div className="absolute bottom-0 w-full">
        <div className="p-4">
          {!isCollapsed && user && (
            <div className="flex items-center">
              <div className="ml-3">
                <p className="font-bold">{user.fullname}</p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center p-2 mt-4 hover:bg-base-300 rounded-md w-[10rem] text-left text-error">
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidenav;
