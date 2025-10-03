import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { User, Heart, MapPin, ShoppingBag, LogOut, Edit } from 'lucide-react';

const Account = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
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
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-base-200 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="p-8 bg-base-100 rounded-3xl shadow-xl border border-base-300">
              <div className="flex flex-col items-center mb-8">
                <div className="avatar mb-4">
                  <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                    <img src={`https://ui-avatars.com/api/?name=${user.fullname}&background=random&color=fff`} alt={user.fullname} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-base-content mb-1">{user.fullname}</h2>
                <p className="text-base-content/80 text-sm">{user.email}</p>
              </div>
              <ul className="menu space-y-3 text-lg">
                <li>
                  <Link to="/wishlist" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors duration-200">
                    <Heart className="w-6 h-6 text-error" /> Wishlist <span className="badge badge-primary ml-auto">{wishlistCount}</span>
                  </Link>
                </li>
                <li>
                  <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors duration-200">
                    <MapPin className="w-6 h-6 text-info" /> Address Book
                  </a>
                </li>
                <li>
                  <Link to="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors duration-200">
                    <ShoppingBag className="w-6 h-6 text-success" /> Order History
                  </Link>
                </li>
                <li className="mt-6">
                  <a onClick={logout} className="flex items-center gap-3 p-3 rounded-lg text-error transition-colors duration-200">
                    <LogOut className="w-6 h-6" /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-10 mb-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-base-content">My Profile Info</h1>
                <button className="btn btn-primary btn-outline btn-sm gap-2">
                  <Edit className="w-5 h-5" /> Edit Profile
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border-b border-base-300 pb-4">
                  <span className="font-semibold text-base-content/90">Full Name:</span>
                  <span className="text-base-content text-lg">{user.fullname}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border-b border-base-300 pb-4">
                  <span className="font-semibold text-base-content/90">Username:</span>
                  <span className="text-base-content text-lg">{user.username}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <span className="font-semibold text-base-content/90">Email:</span>
                  <span className="text-base-content text-lg">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-10 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                <Heart className="text-error mb-6" size={64} />
                <h2 className="text-3xl font-bold text-base-content mb-3">My Wishlist</h2>
                <p className="text-base-content/80 mb-6">You have <span className="font-bold text-primary">{wishlistCount}</span> items in your wishlist.</p>
                <Link to="/wishlist" className="btn btn-secondary btn-wide">View Wishlist</Link>
              </div>

              <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-10 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="text-success mb-6" size={64} />
                <h2 className="text-3xl font-bold text-base-content mb-3">Order History</h2>
                <p className="text-base-content/80 mb-6">You have no past orders.</p>
                {/* <a className="btn btn-secondary btn-wide">View Orders</a> */}
                <Link to="/orders" className="btn btn-secondary btn-wide">
                  View Orders
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;