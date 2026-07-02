import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Sprout, Flower, Sparkles, Star, Award, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

const Home = () => {
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { showPopup } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedPlants = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/plants');
        if (!res.ok) {
          throw new Error('Failed to fetch plants');
        }
        const allPlants = await res.json();
        // Fallback to first 3 plants if the specific ones aren't found
        const featuredNames = ["Mint", "Lavender", "Rosemary"];
        let filteredPlants = allPlants.filter(plant => featuredNames.includes(plant.name));
        if (filteredPlants.length === 0) {
          filteredPlants = allPlants.slice(0, 3);
        }
        setFeaturedPlants(filteredPlants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPlants();
  }, []);

  const handleShopNow = () => {
    if (user) {
      navigate('/category');
    } else {
      navigate('/login');
    }
  };

  const categories = [
    { name: 'Indoor', tag: 'Purifying', img: 'https://i.pinimg.com/1200x/51/86/fd/5186fd050b21178dfdb15a0347a8b608.jpg' },
    { name: 'Outdoor', tag: 'Resilient', img: 'https://i.pinimg.com/736x/cb/25/8f/cb258fa62453c60d9d35da62b25e8050.jpg' },
    { name: 'Herbs & Vegetables', tag: 'Aromatic', img: 'https://i.pinimg.com/736x/f0/cd/13/f0cd13a846ce6d278ba13f9db3fc31c6.jpg' },
    { name: 'Flowers', tag: 'Blossoming', img: 'https://i.pinimg.com/1200x/db/81/d3/db81d37b2727bc7bc7e8bcf111319f9b.jpg' }
  ];

  return (
    <div className="bg-base-100 min-h-screen transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 filter brightness-90 dark:brightness-75 transition-all duration-500" style={{ backgroundImage: 'url("https://i.pinimg.com/1200x/b1/16/9f/b1169f0a5f9adc3ac59e92c735392010.jpg")' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
        
        {/* Animated ambient light orb */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/20 blur-[100px] z-20 animate-float pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="max-w-2xl text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-accent text-sm font-semibold animate-fade-in-up">
              <Sparkles className="h-4 w-4 text-accent" /> Premium Botanical Boutique
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
              Elevate Your Space With <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-accent">Living Art</span>
            </h1>
            
            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-lg">
              Carefully curated, premium indoor and outdoor plants grown with organic methods. Add life, purified air, and architectural structure to your modern sanctuary.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleShopNow} 
                className="btn btn-primary h-14 px-8 text-sm font-semibold rounded-2xl btn-premium shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Explore Catalogue <ArrowRight className="h-4 w-4" />
              </button>
              <Link 
                to="/about" 
                className="btn btn-outline border-white text-white hover:bg-white hover:text-black h-14 px-8 text-sm font-semibold rounded-2xl btn-premium shadow-md flex items-center justify-center w-full sm:w-auto transition-all duration-300"
              >
                Our Heritage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 relative">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-accent/5 blur-[80px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Curated Portfolios</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-base-content mt-2 font-heading">Browse Botanical Categories</h2>
          </div>
          <p className="text-base-content/75 text-sm max-w-md">
            Each plant type is chosen for its specific visual architecture, air-purification properties, and structural appeal.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <div 
              key={cat.name} 
              className="premium-card group cursor-pointer aspect-[3/4] flex flex-col justify-end p-6 border-none shadow-xl transform transition-all duration-500 overflow-hidden"
              onClick={() => navigate('/category')}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 transition-opacity duration-300"></div>
              <img 
                src={cat.img} 
                alt={`${cat.name} plant collection`} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="relative z-20 space-y-2">
                <span className="text-accent text-sm font-semibold tracking-widest uppercase">{cat.tag}</span>
                <h3 className="text-2xl font-bold text-white font-heading">{cat.name}</h3>
                <div className="flex items-center gap-2 text-white/80 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Shop Collection <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="bg-base-200 py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="text-primary font-bold text-sm tracking-wider uppercase font-heading">Season's Highlights</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-base-content mt-2 font-heading">Featured Specimens</h2>
            </div>
            <Link 
              to="/category" 
              className="text-primary hover:text-accent font-semibold text-sm flex items-center gap-2 group transition-colors duration-200"
            >
              View Full Nursery <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          )}
          
          {error && (
            <div className="text-center py-16 text-error font-medium">Error loading featured specimens: {error}</div>
          )}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPlants.map((plant) => (
                <div 
                  key={plant._id} 
                  className="premium-card group cursor-pointer flex flex-col h-full shadow-lg"
                  onClick={() => navigate(`/plant/${plant._id}`)}
                >
                  <figure className="relative h-72 w-full overflow-hidden">
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`badge border-none font-bold text-sm px-4 py-3 shadow-md ${
                        plant.careDifficulty === 'Easy' ? 'bg-emerald-500 text-white' : 
                        plant.careDifficulty === 'Medium' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                      }`}>
                        {plant.careDifficulty} Care
                      </span>
                    </div>
                    {plant.stock === 0 && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="badge bg-error border-none text-white font-extrabold text-[10px] px-3.5 py-2.5 shadow-lg tracking-wider uppercase">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {plant.stock > 0 && plant.stock <= 5 && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="badge bg-warning border-none text-black font-extrabold text-[10px] px-3 py-2.5 shadow-lg tracking-wider uppercase">
                          Only {plant.stock} Left
                        </span>
                      </div>
                    )}
                  </figure>
                  <div className="p-6 bg-base-100 flex-grow flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-primary font-semibold text-sm tracking-wider uppercase">{plant.category}</span>
                      <h3 className="text-2xl font-bold text-base-content font-heading group-hover:text-primary transition-colors duration-200">{plant.name}</h3>
                      <p className="text-base-content/75 text-sm line-clamp-2 leading-relaxed">{plant.description}</p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-base-200">
                      <p className="text-2xl font-bold text-primary font-heading">₹{plant.price.toFixed(2)}</p>
                      <span className="btn btn-primary btn-sm rounded-xl btn-premium px-4 py-2 font-semibold">View Detail</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 relative">
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-accent/5 blur-[80px] pointer-events-none"></div>

        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-primary font-bold text-sm tracking-wider uppercase font-heading">Nursery Standards</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content font-heading">The GreenThumb Guarantee</h2>
          <p className="text-base-content/75 text-sm">We maintain premium horticulturist standards at every step of cultivation and delivery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="glass-card p-8 rounded-3xl flex flex-col gap-5 border border-base-300/40 hover:border-primary/30 transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-base-content font-heading">Horticulturist Inspected</h3>
            <p className="text-base-content/75 text-sm leading-relaxed">
              Every single specimen undergoes thorough health, root structure, and foliage quality checks before leaves leave our greenhouse.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col gap-5 border border-base-300/40 hover:border-primary/30 transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-base-content font-heading">Secure Sustainable Shipping</h3>
            <p className="text-base-content/75 text-sm leading-relaxed">
              Our bespoke, patented cardboard shipping packaging keeps plants secure, moist, and well-ventilated during transport.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col gap-5 border border-base-300/40 hover:border-primary/30 transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary">
              <Sprout className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-base-content font-heading">Lifetime Care Support</h3>
            <p className="text-base-content/75 text-sm leading-relaxed">
              Access botanical experts, diagnostic tips, and seasonal plant newsletters to keep your specimens thriving for years.
            </p>
          </div>

        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden bg-cover bg-center py-20 px-8 sm:px-16" style={{ backgroundImage: 'url("https://i.pinimg.com/736x/f6/be/e5/f6bee5f67db03e53d1c9ff12c41ccf42.jpg")' }}>
          <div className="absolute inset-0 bg-black/75 z-0"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center space-y-6">
            <div className="bg-accent/20 border border-accent/30 text-accent font-semibold px-4 py-1.5 rounded-full text-sm font-heading">
              10% First Order Discount
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight leading-tight">Join Our Green Family</h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Stay updated with curated plant care guides, new species arrivals, and exclusive seasonal invitations. No spam, only green inspiration.
            </p>
            <div className="w-full max-w-md pt-4">
              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  e.target.reset();
                  showPopup({
                    title: 'Subscription Successful!',
                    message: 'Welcome to the Green Family! You are now subscribed to our newsletters.',
                    type: 'success'
                  });
                }} 
                className="flex flex-col sm:flex-row gap-3"
              >
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="input input-bordered w-full h-12 rounded-xl bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-accent text-sm" 
                />
                <button type="submit" className="btn btn-primary h-12 px-6 rounded-xl btn-premium font-semibold shrink-0 text-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;