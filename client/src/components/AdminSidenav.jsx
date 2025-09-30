import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminSidenav = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className="block p-4 hover:bg-gray-700">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/plants" className="block p-4 hover:bg-gray-700">
              Manage Plants
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="block p-4 hover:bg-gray-700">
              Manage Users
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="block p-4 hover:bg-gray-700 w-full text-left">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidenav;
