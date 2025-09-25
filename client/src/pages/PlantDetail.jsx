import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Sun, Droplet, Leaf, Bug, Thermometer, Wind } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const PlantDetail = () => {
  const [plant, setPlant] = useState(null);
  const [relatedPlants, setRelatedPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchPlantData = async () => {
      setLoading(true);
      try {
        const plantRes = await fetch(`http://localhost:5000/api/plants/${id}`);
        if (!plantRes.ok) throw new Error('Plant not found');
        const plantData = await plantRes.json();
        setPlant(plantData);

        const relatedRes = await fetch(`http://localhost:5000/api/plants?category=${plantData.category}&limit=4`);
        const relatedData = await relatedRes.json();
        setRelatedPlants(relatedData.filter(p => p._id !== id).slice(0, 3));

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
      alert('Please login to add items to your wishlist.');
      return;
    }
    try {
      await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plantId: plant._id, userId: user._id }),
      });
      alert('Added to wishlist!');
    } catch (err) {
      console.error('Failed to add to wishlist', err);
      alert('Failed to add to wishlist.');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  if (!plant) return <div className="text-center py-16">Plant not found.</div>;

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="w-full">
            <img src={plant.image} alt={plant.name} className="w-full h-[46rem] object-contain mx-auto" />
          </div>

          <div className="text-base-content">
            <h1 className="text-5xl font-extrabold mb-2 tracking-tight">{plant.name}</h1>
            <p className="text-lg text-base-content/70 mb-4">{plant.category}</p>
            <p className="text-4xl text-primary font-semibold mb-6">${plant.price.toFixed(2)}</p>
            <p className="text-lg mb-8 leading-relaxed">{plant.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={() => addToCart(plant)} className="btn btn-primary btn-lg flex-grow"><ShoppingCart className="mr-2" /> Add to Cart</button>
              <button className="btn btn-outline btn-lg flex-grow" onClick={handleAddToWishlist}><Heart className="mr-2" /> Add to Wishlist</button>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Care Instructions</h2>
              {plant.careInstructions ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plant.careInstructions.Light && (
                    <div className="bg-base-200 p-4 rounded-lg flex items-center">
                      <Sun className="text-primary mr-4 flex-shrink-0" size={32} />
                      <div>
                        <p className="font-bold text-lg">Light</p>
                        <p>{plant.careInstructions.Light}</p>
                      </div>
                    </div>
                  )}
                  {plant.careInstructions.Watering && (
                    <div className="bg-base-200 p-4 rounded-lg flex items-center">
                      <Droplet className="text-primary mr-4 flex-shrink-0" size={32} />
                      <div>
                        <p className="font-bold text-lg">Watering</p>
                        <p>{plant.careInstructions.Watering}</p>
                      </div>
                    </div>
                  )}
                  {plant.careInstructions.Soil && (
                    <div className="bg-base-200 p-4 rounded-lg flex items-center">
                      <Leaf className="text-primary mr-4 flex-shrink-0" size={32} />
                      <div>
                        <p className="font-bold text-lg">Soil</p>
                        <p>{plant.careInstructions.Soil}</p>
                      </div>
                    </div>
                  )}
                  {plant.careInstructions.Temperature && (
                    <div className="bg-base-200 p-4 rounded-lg flex items-center">
                      <Thermometer className="text-primary mr-4 flex-shrink-0" size={32} />
                      <div>
                        <p className="font-bold text-lg">Temperature</p>
                        <p>{plant.careInstructions.Temperature}</p>
                      </div>
                    </div>
                  )}
                  {plant.careInstructions.Humidity && (
                    <div className="bg-base-200 p-4 rounded-lg flex items-center">
                      <Wind className="text-primary mr-4 flex-shrink-0" size={32} />
                      <div>
                        <p className="font-bold text-lg">Humidity</p>
                        <p>{plant.careInstructions.Humidity}</p>
                      </div>
                    </div>
                  )}
                  {plant.careInstructions.Pests && (
                    <div className="bg-base-200 p-4 rounded-lg flex items-center">
                      <Bug className="text-primary mr-4 flex-shrink-0" size={32} />
                      <div>
                        <p className="font-bold text-lg">Pests</p>
                        <p>{plant.careInstructions.Pests}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p>No care instructions available for this plant.</p>
              )}
            </div>

          </div>
        </div>

        {relatedPlants.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-base-content">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPlants.map(relatedPlant => (
                <Link to={`/plant/${relatedPlant._id}`} key={relatedPlant._id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <figure>
                    <img src={relatedPlant.image} alt={relatedPlant.name} className="w-full h-65 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-base-content">{relatedPlant.name}</h3>
                    <p className="text-primary font-semibold">${relatedPlant.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PlantDetail;