import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/wishlist/${user._id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        const data = await res.json();
        setWishlist(data.plants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user]);

  const handleRemove = async (plantId) => {
    try {
      await fetch(`http://localhost:5000/api/wishlist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, plantId }),
      });
      setWishlist(wishlist.filter(p => p._id !== plantId));
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Please log in</h2>
        <p>You need to be logged in to view your wishlist.</p>
        <Link to="/login" className="btn btn-primary mt-4">Login</Link>
      </div>
    );
  }

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">My Wishlist</h1>
        <Link to="/category" className="btn btn-outline btn-primary">Continue Shopping</Link>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((plant) => (
            <div key={plant._id} className="card bg-base-100 shadow-xl rounded-lg overflow-hidden group transform transition duration-500 hover:scale-105">
              <figure className="relative h-64 w-full">
                <Link to={`/plant/${plant._id}`}>
                  <img src={plant.image} alt={plant.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </Link>
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-xl font-bold truncate">{plant.name}</h2>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-semibold text-primary">${plant.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <button className="btn btn-primary btn-sm">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleRemove(plant._id)} className="btn btn-error btn-sm">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Your Wishlist is Empty!!</h2>
          <p>Explore our Collection and Find Your Next Green Friend!</p>
          <Link to="/category" className="btn btn-primary mt-4">Browse Plants</Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;