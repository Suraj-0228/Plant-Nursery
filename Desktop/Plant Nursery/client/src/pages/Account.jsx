import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const Account = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="p-4 bg-base-200 rounded-lg">
            <h3 className="font-bold text-lg">Welcome, {user.fullname}!</h3>
            <ul className="menu mt-4">
              <li><Link to="/account">Profile</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><a>Address Book</a></li>
              <li><a>Order History</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="p-4 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            <p><span className="font-bold">Full Name:</span> {user.fullname}</p>
            <p><span className="font-bold">Username:</span> {user.username}</p>
            <p><span className="font-bold">Email:</span> {user.email}</p>
          </div>

          <div className="p-4 bg-base-200 rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
            <p>You have no items in your wishlist. <Link to="/category" className="link link-primary">Browse plants</Link>.</p>
          </div>

          <div className="p-4 bg-base-200 rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Address Book</h2>
            <p>You have no saved addresses.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
