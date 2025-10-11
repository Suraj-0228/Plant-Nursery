import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Search } from 'lucide-react';

const Category = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('price');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/plants');
        const data = await res.json();
        setPlants(data);
        setFilteredPlants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    let filtered = [...plants];

    if (category !== 'All') {
      filtered = filtered.filter(plant => plant.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sort === 'low-to-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'high-to-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredPlants(filtered);
  }, [category, sort, searchTerm, plants]);

  const handleAddToWishlist = async (e, plantId) => {
    e.stopPropagation(); // Prevent card click event
    if (!user) {
      alert('Please, Login to Plant Nursery So, You can Add Plants to Your Wishlist!!');
      return;
    }
    try {
      await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plantId, userId: user._id }),
      });
      alert('Plant Added to Wishlist!');
    } catch (err) {
      console.error('Failed to add to wishlist', err);
      alert('Failed to add to wishlist.');
    }
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar for Filtering */}
        <aside className="w-full md:w-1/4">
          <div className="p-4 bg-base-200 shadow-lg rounded-lg">
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search for a plant..." 
                className="input input-bordered w-full max-w-xs pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 mb-4">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                Category
              </div>
              <div className="collapse-content">
                <div className="form-control flex flex-col gap-2">
                  {['All', 'Indoor', 'Outdoor', 'Herbs & Vegetables', 'Flowers'].map(cat => (
                    <label key={cat} className="label cursor-pointer">
                      <input 
                        type="radio" 
                        name="category" 
                        className="radio radio-primary" 
                        checked={category === cat}
                        onChange={() => setCategory(cat)}
                      />
                      <span className="label-text">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                Sort by
              </div>
              <div className="collapse-content">
                <select className="select select-bordered rounded-xl w-full max-w-xs" onChange={(e) => setSort(e.target.value)} value={sort}>
                  <option value="price" disabled>Price</option>
                  <option value="low-to-high">Low to High</option>
                  <option value="high-to-low">High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Plant Grid */}
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlants.length > 0 ? (
              filteredPlants.map((plant) => (
                <div key={plant._id} className="card bg-base-100 shadow-xl rounded-lg overflow-hidden group transform transition duration-500 hover:scale-105">
                  <figure className="relative h-64 w-full">
                    <Link to={`/plant/${plant._id}`}>
                      <img src={plant.image} alt={plant.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                    <div className="absolute top-4 right-4 z-10">
                      <button 
                        onClick={(e) => handleAddToWishlist(e, plant._id)} 
                        className="btn btn-circle btn-ghost bg-white/70 hover:bg-white text-red-500"
                        aria-label="Add to Wishlist"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <Link to={`/plant/${plant._id}`}>
                        <h2 className="text-white text-2xl font-bold">{plant.name}</h2>
                      </Link>
                    </div>
                  </figure>
                  <div className="p-4 bg-base-200">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-base-content/70">{plant.category}</p>
                      <div className="badge badge-outline px-4 py-3">{plant.careDifficulty}</div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xl font-semibold text-primary">₹{plant.price.toFixed(2)}</p>
                      <button onClick={() => addToCart(plant)} className="btn btn-primary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No plants found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Category;
