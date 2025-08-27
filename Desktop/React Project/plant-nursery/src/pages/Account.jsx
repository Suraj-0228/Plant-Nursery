import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Account = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Please login to view your account.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome, {currentUser.fullname}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Profile</h2>
              <p><strong>Username:</strong> {currentUser.username}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <button className="btn btn-primary mt-4">Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Order History</h2>
              <p>No orders yet.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl mt-8">
            <div className="card-body">
              <h2 className="card-title">Wishlist</h2>
              <p>Your wishlist is empty.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
