import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useModal } from '../context/ModalContext';
import { Search, Heart, ShoppingCart, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

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
  const { showPopup } = useModal();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 6;

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/plants');
        if (!res.ok) {
          throw new Error('Failed to fetch specimens');
        }
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
    setCurrentPage(1);
  }, [category, sort, searchTerm, plants]);

  const handleAddToWishlist = async (e, plantId) => {
    e.stopPropagation(); // Prevent card navigation
    if (!user) {
      showPopup({
        title: 'Authentication Required',
        message: 'Please log in to add plants to your wishlist!',
        type: 'error'
      });
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plantId, userId: user._id }),
      });
      if (!res.ok) throw new Error('Wishlist failure');
      showPopup({
        title: 'Added to Wishlist',
        message: 'The selected plant specimen has been saved to your wishlist.',
        type: 'success'
      });
    } catch (err) {
      console.error('Failed to add to wishlist', err);
      showPopup({
        title: 'Error',
        message: 'Failed to add the specimen to your wishlist.',
        type: 'error'
      });
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error) return (
    <div className="text-center py-24 text-error bg-base-100 font-semibold">
      Error fetching specimens: {error}
    </div>
  );

  return (
    <div className="bg-base-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-12 space-y-3">
          <span className="text-primary font-bold text-sm tracking-wider uppercase">Online Showroom</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-base-content font-heading sm:text-5xl">Specimen Catalog</h1>
          <p className="text-base-content/75 text-sm max-w-xl">
            Explore our premium collection of foliage, flowers, and medicinal herbs. Filter and search to find your perfect green companion.
          </p>
        </header>

        {/* Filter, Search & Sort Panel - Full Width on Top */}
        <div className="p-6 rounded-[24px] border border-base-300/40 bg-base-200/20 glass-card mb-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="w-full md:max-w-md relative">
              <input 
                type="text" 
                placeholder="Search specimens..." 
                className="input input-bordered w-full pl-11 pr-4 rounded-xl glass-input text-sm h-11" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-base-content/40" />
              </div>
            </div>

            {/* Sort Options */}
            <div className="w-full md:w-auto flex items-center gap-2">
              <ArrowUpDown className="h-4.5 w-4.5 text-primary shrink-0" />
              <select 
                className="select select-bordered rounded-xl w-full md:w-56 glass-input text-sm h-11" 
                onChange={(e) => setSort(e.target.value)} 
                value={sort}
              >
                <option value="price" disabled>Select price sort</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Horizontal Category Filters */}
          <div className="pt-4 border-t border-base-300/40">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-base-content/95 mr-2">
                <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">Categories:</span>
              </div>
              {['All', 'Indoor', 'Outdoor', 'Herbs & Vegetables', 'Flowers'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`btn text-xs h-10 min-h-0 rounded-full transition-all duration-300 font-bold px-5 border ${
                    category === cat 
                      ? 'btn-primary border-transparent shadow-md' 
                      : 'btn-ghost border-base-300 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plant Specimen Grid */}
        <main className="w-full">
            {filteredPlants.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPlants.slice((currentPage - 1) * plantsPerPage, currentPage * plantsPerPage).map((plant) => (
                  <div 
                    key={plant._id} 
                    className="premium-card group cursor-pointer flex flex-col h-full shadow-md"
                    onClick={() => navigate(`/plant/${plant._id}`)}
                  >
                    {/* Image Area */}
                    <figure className="relative h-64 w-full overflow-hidden">
                      <img 
                        src={plant.image} 
                        alt={plant.name} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute top-4 right-4 z-10">
                        <button 
                          onClick={(e) => handleAddToWishlist(e, plant._id)} 
                          className="btn btn-circle btn-sm bg-white/80 hover:bg-white text-red-500 border-none shadow-md hover:scale-110 transition-all duration-300 group"
                          aria-label="Add to Wishlist"
                        >
                          <Heart className="h-4.5 w-4.5 fill-none group-hover:fill-current transition-colors" />
                        </button>
                      </div>
                      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        <span className="badge badge-primary border-none shadow-sm font-bold text-sm px-3.5 py-2.5">
                          {plant.category}
                        </span>
                        {plant.stock === 0 && (
                          <span className="badge bg-error border-none text-white font-extrabold text-[10px] px-3.5 py-2 shadow-lg tracking-wider uppercase">
                            Out of Stock
                          </span>
                        )}
                        {plant.stock > 0 && plant.stock <= 5 && (
                          <span className="badge bg-warning border-none text-black font-extrabold text-[10px] px-3 py-2 shadow-lg tracking-wider uppercase">
                            Only {plant.stock} Left
                          </span>
                        )}
                      </div>
                    </figure>

                    {/* Content Details */}
                    <div className="p-6 bg-base-100 flex-grow flex flex-col justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-primary/75 text-sm font-semibold tracking-wider uppercase">Care Specimen</span>
                          <span className={`badge badge-outline text-sm font-semibold px-3 py-2.5 ${
                            plant.careDifficulty === 'Easy' ? 'border-emerald-500 text-emerald-500' :
                            plant.careDifficulty === 'Medium' ? 'border-amber-500 text-amber-500' : 'border-rose-500 text-rose-500'
                          }`}>
                            {plant.careDifficulty}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-base-content font-heading group-hover:text-primary transition-colors duration-200 mt-2">{plant.name}</h2>
                        <p className="text-base-content/75 text-sm leading-relaxed line-clamp-2 mt-1">{plant.description}</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-base-200">
                        <p className="text-2xl font-bold text-primary font-heading">₹{plant.price.toFixed(2)}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); addToCart(plant); }} 
                          className="btn btn-primary btn-sm rounded-xl btn-premium px-4 py-2 font-semibold flex items-center gap-1.5 shadow-md disabled:bg-base-300 disabled:text-base-content/40 disabled:cursor-not-allowed border-none"
                          disabled={plant.stock === 0}
                        >
                          <ShoppingCart className="h-4 w-4" /> {plant.stock === 0 ? 'Sold Out' : 'Add'}
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
                </div>

                {/* Pagination Controls */}
                {Math.ceil(filteredPlants.length / plantsPerPage) > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12 pt-4">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-outline rounded-xl px-4 py-2 border border-base-300 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.ceil(filteredPlants.length / plantsPerPage) }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`btn rounded-xl w-9 h-9 text-md font-bold transition-all duration-300 ${
                          currentPage === page 
                            ? 'btn-primary shadow-md' 
                            : 'btn-ghost hover:bg-primary/10 hover:text-primary'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button 
                      disabled={currentPage === Math.ceil(filteredPlants.length / plantsPerPage)}
                      onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPlants.length / plantsPerPage)));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-outline rounded-xl px-4 py-2 border border-base-300 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 rounded-[24px] border border-base-300/40 glass-card">
                <p className="text-base-content/60 text-lg font-medium">No plant specimens found matching your criteria.</p>
              </div>
            )}
          </main>

      </div>
    </div>
  );
};

export default Category;
