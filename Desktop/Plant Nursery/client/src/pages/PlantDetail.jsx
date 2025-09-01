import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaSun, FaWater, FaRulerVertical } from 'react-icons/fa';

const PlantDetail = () => {
  const [plant, setPlant] = useState(null);
  const [relatedPlants, setRelatedPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlantData = async () => {
      setLoading(true);
      try {
        // Fetch main plant details
        const plantRes = await fetch(`http://localhost:5000/api/plants/${id}`);
        if (!plantRes.ok) {
          throw new Error('Plant not found');
        }
        const plantData = await plantRes.json();
        setPlant(plantData);

        // Fetch related plants (e.g., from the same category)
        const relatedRes = await fetch(`http://localhost:5000/api/plants?category=${plantData.category}&limit=4`);
        const relatedData = await relatedRes.json();
        // Filter out the current plant from the related list
        setRelatedPlants(relatedData.filter(p => p._id !== id).slice(0, 3));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantData();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  if (!plant) return <div className="text-center py-16">Plant not found.</div>;

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Plant Image Gallery */}
          <div className="w-full">
            <img src={plant.image} alt={plant.name} className="w-[60vh] h-[80vh] mx-auto rounded-2xl shadow-2xl" />
          </div>

          {/* Plant Details */}
          <div className="text-base-content">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">{plant.name}</h1>
            <p className="text-3xl text-primary font-semibold mb-6">${plant.price.toFixed(2)}</p>
            
            <p className="text-lg mb-8 leading-relaxed">{plant.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center">
              <div className="bg-base-200 p-4 rounded-lg flex flex-col items-center justify-center">
                <FaSun className="text-3xl text-yellow-500 mb-2" />
                <h4 className="font-bold">Light</h4>
                <p>{plant.light || 'Bright, indirect'}</p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg flex flex-col items-center justify-center">
                <FaWater className="text-3xl text-blue-500 mb-2" />
                <h4 className="font-bold">Watering</h4>
                <p>{plant.watering || 'Once a week'}</p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg flex flex-col items-center justify-center">
                <FaRulerVertical className="text-3xl text-green-500 mb-2" />
                <h4 className="font-bold">Size</h4>
                <p>{plant.size || 'Medium'}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary btn-lg flex-grow"><FaShoppingCart className="mr-2" /> Add to Cart</button>
              <button className="btn btn-outline btn-lg flex-grow"><FaHeart className="mr-2" /> Add to Wishlist</button>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        {relatedPlants.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-base-content">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPlants.map(relatedPlant => (
                <Link to={`/plants/${relatedPlant._id}`} key={relatedPlant._id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden group">
                  <figure>
                    <img src={relatedPlant.image} alt={relatedPlant.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
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