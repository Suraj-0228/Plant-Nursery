import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        // We need to pass the user token for authentication
        // For now, we will assume the user is logged in and the backend can identify them.
        const res = await fetch('http://localhost:5000/api/wishlist');
        const data = await res.json();
        setWishlist(data);
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
      await fetch(`http://localhost:5000/api/wishlist/${plantId}`, {
        method: 'DELETE',
      });
      setWishlist(prev => ({...prev, plants: prev.plants.filter(p => p._id !== plantId)}));
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  if (!user) {
    return <div className="text-center py-16">Please <Link to="/login" className="link link-primary">login</Link> to see your wishlist.</div>;
  }

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12">My Wishlist</h1>
      {wishlist && wishlist.plants.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.plants.map((plant) => (
            <div key={plant._id} className="card bg-base-100 shadow-xl">
              <figure><img src={plant.image} alt={plant.name} className="h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <h2 className="card-title">{plant.name}</h2>
                <p>Care Difficulty: {plant.careDifficulty}</p>
                <div className="card-actions justify-between items-center">
                  <span className="font-bold text-lg">${plant.price.toFixed(2)}</span>
                  <button onClick={() => handleRemove(plant._id)} className="btn btn-error">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
