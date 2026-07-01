import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Sun, Droplet, Leaf, Bug, Thermometer, Wind, ShieldAlert, Award, Star } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useModal } from '../context/ModalContext';

const PlantDetail = () => {
  const [plant, setPlant] = useState(null);
  const [relatedPlants, setRelatedPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { showPopup } = useModal();

  useEffect(() => {
    const fetchPlantData = async () => {
      setLoading(true);
      try {
        const plantRes = await fetch(`http://localhost:5000/api/plants/${id}`);
        if (!plantRes.ok) throw new Error('Plant specimen not found');
        const plantData = await plantRes.json();
        setPlant(plantData);

        const relatedRes = await fetch(`http://localhost:5000/api/plants`);
        if (relatedRes.ok) {
          const allPlants = await relatedRes.json();
          // Filter by same category, exclude current, and limit to 3
          const filtered = allPlants
            .filter(p => p.category === plantData.category && p._id !== id)
            .slice(0, 3);
          setRelatedPlants(filtered);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantData();
  }, [id]);

  const handleAddToWishlist = async () => {
    if (!user) {
      showPopup({
        title: 'Authentication Required',
        message: 'Please log in to add items to your wishlist.',
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
        body: JSON.stringify({ plantId: plant._id, userId: user._id }),
      });
      if (!res.ok) throw new Error('Wishlist insertion error');
      showPopup({
        title: 'Added to Wishlist',
        message: `${plant.name} has been saved to your wishlist.`,
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
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  if (error) return (
    <div className="text-center py-24 text-error bg-base-100 font-semibold">
      Error: {error}
    </div>
  );
  if (!plant) return (
    <div className="text-center py-24 bg-base-100 font-semibold">
      Specimen not found.
    </div>
  );

  const careItems = [
    { key: 'Light', label: 'Light Requirement', icon: Sun, value: plant.careInstructions?.Light },
    { key: 'Watering', label: 'Watering Frequency', icon: Droplet, value: plant.careInstructions?.Watering },
    { key: 'Soil', label: 'Soil Potting Mix', icon: Leaf, value: plant.careInstructions?.Soil },
    { key: 'Temperature', label: 'Ideal Temperature', icon: Thermometer, value: plant.careInstructions?.Temperature },
    { key: 'Humidity', label: 'Humidity Climate', icon: Wind, value: plant.careInstructions?.Humidity },
    { key: 'Pests', label: 'Common Pests & Care', icon: Bug, value: plant.careInstructions?.Pests }
  ].filter(item => item.value);

  return (
    <div className="bg-base-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background ambient gradient orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-10 text-base-content/65 font-medium">
          <ul>
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/category" className="hover:text-primary transition-colors">Catalog</Link></li>
            <li className="text-primary font-semibold">{plant.name}</li>
          </ul>
        </div>

        {/* Editorial layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Image Canvas */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-[32px] overflow-hidden bg-base-200 border border-base-300/40 shadow-xl group aspect-square flex items-center justify-center p-6">
              <img 
                src={plant.image} 
                alt={plant.name} 
                className="w-full h-full object-contain rounded-[20px] transition-transform duration-700 group-hover:scale-105" 
              />
              <span className="absolute top-6 left-6 badge badge-primary border-none shadow-md font-bold text-sm px-4 py-3">
                {plant.category}
              </span>
            </div>
            
            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-2 text-center">
              <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300/20">
                <Award className="h-5 w-5 text-accent mx-auto mb-1.5" />
                <p className="font-bold text-xs text-base-content font-heading">Healthy Roots</p>
              </div>
              <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300/20">
                <ShieldAlert className="h-5 w-5 text-accent mx-auto mb-1.5" />
                <p className="font-bold text-xs text-base-content font-heading">Secure Boxed</p>
              </div>
              <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300/20">
                <Leaf className="h-5 w-5 text-accent mx-auto mb-1.5" />
                <p className="font-bold text-xs text-base-content font-heading">Organic Soil</p>
              </div>
            </div>
          </div>

          {/* Right Column: Specimen Metadata */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-primary font-bold text-sm tracking-wider uppercase">{plant.category} Specimen</span>
                <span className={`badge font-bold text-sm px-3.5 py-2.5 shadow-sm border-none ${
                  plant.careDifficulty === 'Easy' ? 'bg-emerald-500 text-white' : 
                  plant.careDifficulty === 'Medium' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {plant.careDifficulty} Care
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-base-content font-heading leading-tight">{plant.name}</h1>
              
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <span className="text-base-content/60 text-sm ml-2 font-medium">(4.8 rating based on 25 reviews)</span>
              </div>

              <div className="pt-2">
                <p className="text-4xl font-bold text-primary font-heading">₹{plant.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Nav Tabs for Overview vs Care */}
            <div className="tabs tabs-boxed bg-base-200 rounded-2xl p-1.5">
              <button 
                onClick={() => setActiveTab('Overview')} 
                className={`tab rounded-xl text-sm font-semibold h-10 w-1/2 transition-all duration-300 ${activeTab === 'Overview' ? 'tab-active bg-primary text-white shadow-sm' : 'text-base-content/70 hover:text-primary'}`}
              >
                Overview & Description
              </button>
              <button 
                onClick={() => setActiveTab('Care')} 
                className={`tab rounded-xl text-sm font-semibold h-10 w-1/2 transition-all duration-300 ${activeTab === 'Care' ? 'tab-active bg-primary text-white shadow-sm' : 'text-base-content/70 hover:text-primary'}`}
              >
                Care Instructions ({careItems.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[160px] py-2">
              {activeTab === 'Overview' ? (
                <div className="space-y-4">
                  <p className="text-base-content/85 text-sm sm:text-base leading-relaxed">{plant.description || 'No description available for this premium specimen. However, it represents our finest selection of organic plants, grown under strict temperature and nutritional parameters.'}</p>
                  <div className="pt-2 border-t border-base-200 grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-base-content/80">
                    <div><b>Origin:</b> Tropical Climates</div>
                    <div><b>Botanical Status:</b> Grade A Premium</div>
                    <div><b>Ideal Potting Size:</b> Medium (6-8")</div>
                    <div><b>Lifespan:</b> Perennial Specimen</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {careItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {careItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.key} className="p-4 rounded-2xl bg-base-200 border border-base-300/40 flex items-start gap-4 hover:border-primary/25 transition-colors duration-300">
                            <div className="bg-primary/10 p-2.5 rounded-xl text-primary flex-shrink-0 mt-0.5">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-bold text-sm text-base-content font-heading">{item.label}</p>
                              <p className="text-base-content/75 text-sm leading-relaxed">{item.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-base-content/70 text-sm">No specific care guidelines have been seeded. Keep in moderate light and water when topsoil feels dry.</p>
                  )}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-base-300/40">
              <button 
                onClick={() => addToCart(plant)} 
                className="btn btn-primary h-14 text-sm font-semibold rounded-2xl flex-grow btn-premium shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" /> Add to Shopping Cart
              </button>
              <button 
                onClick={handleAddToWishlist} 
                className="btn btn-outline border-base-300 hover:bg-base-200 h-14 text-sm font-semibold rounded-2xl flex-grow sm:flex-grow-0 sm:w-48 btn-premium flex items-center justify-center gap-2 transition-all duration-300 group"
              >
                <Heart className="h-5 w-5 text-red-500 fill-none group-hover:fill-current transition-colors" /> Save to Wishlist
              </button>
            </div>

          </div>
        </div>

        {/* You Might Also Like / Related specimens */}
        {relatedPlants.length > 0 && (
          <section className="mt-32 pt-16 border-t border-base-300/40">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
              <span className="text-primary font-bold text-sm tracking-wider uppercase font-heading">Handpicked Pairings</span>
              <h2 className="text-3xl font-bold text-base-content font-heading">You Might Also Like</h2>
              <p className="text-base-content/75 text-sm">Complementary botanical specimens matching this category.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPlants.map(related => (
                <div 
                  key={related._id} 
                  className="premium-card group cursor-pointer flex flex-col h-full shadow-md"
                  onClick={() => navigate(`/plant/${related._id}`)}
                >
                  <figure className="relative h-64 w-full overflow-hidden">
                    <img 
                      src={related.image} 
                      alt={related.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </figure>
                  <div className="p-6 bg-base-100 flex-grow flex flex-col justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-primary font-semibold text-sm tracking-wider uppercase">{related.category}</span>
                      <h3 className="text-xl font-bold text-base-content font-heading group-hover:text-primary transition-colors duration-200 mt-1">{related.name}</h3>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-base-200">
                      <p className="text-xl font-bold text-primary font-heading">₹{related.price.toFixed(2)}</p>
                      <span className="btn btn-ghost hover:bg-primary/10 text-primary btn-sm rounded-xl font-semibold">View Specimen</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default PlantDetail;