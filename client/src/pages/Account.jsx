import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { User, Heart, MapPin, ShoppingBag, LogOut } from 'lucide-react';

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
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="p-6 bg-base-100 rounded-2xl shadow-lg">
              <div className="flex flex-col items-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={`https://ui-avatars.com/api/?name=${user.fullname}&background=random`} alt={user.fullname} />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center">{user.fullname}</h2>
                <p className="text-base-content/70">{user.email}</p>
              </div>
              <ul className="menu mt-8 space-y-2">
                <li><Link to="/wishlist"><Heart className="mr-2" /> Wishlist</Link></li>
                <li><a><MapPin className="mr-2" /> Address Book</a></li>
                <li><a><ShoppingBag className="mr-2" /> Order History</a></li>
                <li><a onClick={logout}><LogOut className="mr-2" /> Logout</a></li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-base-100 rounded-2xl shadow-lg p-8">
              <h1 className="text-4xl font-bold mb-8">My Profile Info:</h1>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <span className="font-bold w-32">Full Name:</span>
                  <span>{user.fullname}</span>
                </div>
                <div className="divider"></div>
                <div className="flex items-center">
                  <span className="font-bold w-32">Username:</span>
                  <span>{user.username}</span>
                </div>
                <div className="divider"></div>
                <div className="flex items-center">
                  <span className="font-bold w-32">Email:</span>
                  <span>{user.email}</span>
                </div>
              </div>

              <button className="btn btn-primary mt-8">Edit Profile</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-base-100 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                <Heart className="text-primary mb-4" size={48} />
                <h2 className="text-2xl font-bold mb-2">My Wishlist</h2>
                <p className="mb-4">You have {wishlistCount} items in your wishlist.</p>
                <Link to="/wishlist" className="btn btn-secondary">View Wishlist</Link>
              </div>

              <div className="bg-base-100 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                <ShoppingBag className="text-primary mb-4" size={48} />
                <h2 className="text-2xl font-bold mb-2">Order History</h2>
                <p className="mb-4">You have no past orders.</p>
                <a className="btn btn-secondary">View Orders</a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;