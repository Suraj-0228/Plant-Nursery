import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Sprout, Flower } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
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
        const featuredNames = ["Mint", "Lavender", "Rosemary"];
        const filteredPlants = allPlants.filter(plant => featuredNames.includes(plant.name));
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

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="relative bg-[url(https://i.pinimg.com/1200x/b1/16/9f/b1169f0a5f9adc3ac59e92c735392010.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
              Find Your Perfect
              <strong className="block font-extrabold text-primary"> Green Companion </strong>
            </h1>
            <p className="mt-4 max-w-lg text-white/90 sm:text-xl/relaxed">
              Discover a wide variety of plants to bring life and beauty to your home. From lush indoor plants to vibrant outdoor flowers, we have something for every plant lover.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <button onClick={handleShopNow} className="block w-full rounded-xl bg-primary px-12 py-3 font-medium text-white shadow hover:bg-primary-focus hover:cursor-pointer focus:outline-none focus:ring active:bg-primary-focus sm:w-auto">
                Shop Now <ArrowRight className="inline ml-2" />
              </button>
              <Link to="/about" className="block w-full rounded-xl bg-white px-12 py-3 font-medium text-primary shadow hover:text-primary-focus focus:outline-none focus:ring active:text-primary-focus sm:w-auto">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Our Plant Categories</h2>
          <p className="text-lg text-base-content/70 mt-2">Find the perfect plant for your space and lifestyle.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="card bg-base-200 shadow-xl image-full transform transition duration-500 hover:scale-105">
            <figure><img src="https://i.pinimg.com/1200x/51/86/fd/5186fd050b21178dfdb15a0347a8b608.jpg" alt="Indoor Plants" /></figure>
            <div className="card-body justify-center items-center">
              <h2 className="card-title text-3xl font-bold">Indoor</h2>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl image-full transform transition duration-500 hover:scale-105">
            <figure><img src="https://i.pinimg.com/736x/cb/25/8f/cb258fa62453c60d9d35da62b25e8050.jpg" alt="Outdoor Plants" /></figure>
            <div className="card-body justify-center items-center">
              <h2 className="card-title text-3xl font-bold">Outdoor</h2>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl image-full transform transition duration-500 hover:scale-105">
            <figure><img src="https://i.pinimg.com/736x/f0/cd/13/f0cd13a846ce6d278ba13f9db3fc31c6.jpg" alt="Herbs & Vegetables" /></figure>
            <div className="card-body justify-center items-center">
              <h2 className="card-title text-3xl font-bold">Herbs</h2>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl image-full transform transition duration-500 hover:scale-105">
            <figure><img src="https://i.pinimg.com/1200x/db/81/d3/db81d37b2727bc7bc7e8bcf111319f9b.jpg" alt="Flowers" /></figure>
            <div className="card-body justify-center items-center">
              <h2 className="card-title text-3xl font-bold">Flowers</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="bg-base-200">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Featured Plants</h2>
            <p className="text-lg text-base-content/70 mt-2">Handpicked for their beauty and resilience.</p>
          </div>
          {loading && <div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>}
          {error && <div className="text-center text-red-500">Error: {error}</div>}
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPlants.map(plant => (
                <div key={plant._id} className="card bg-base-100 shadow-xl">
                  <figure><img src={plant.image} alt={plant.name} className="h-64 w-full object-cover transform transition duration-500 hover:scale-105" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">{plant.name}</h2>
                    <p>{plant.description}</p>
                    <div className="card-actions justify-end">
                      <Link to={`/plant/${plant._id}`} className="btn btn-primary">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Why Choose Us?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <Leaf className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold">Quality Plants</h3>
            <p className="text-base-content/70">We source the healthiest plants to ensure they thrive in your home.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <Sprout className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold">Expert Advice</h3>
            <p className="text-base-content/70">Our team is always here to help you with your plant care questions.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <Flower className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold">Beautiful Selection</h3>
            <p className="text-base-content/70">A wide variety of plants to suit any style and space.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/f6/be/e5/f6bee5f67db03e53d1c9ff12c41ccf42.jpg)' }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center text-white">
            <h2 className="text-4xl font-bold">Join Our Green Family</h2>
            <p className="mt-4 max-w-2xl">Stay updated with the latest plant care tips, new arrivals, and exclusive offers. Subscribe to our newsletter and get 10% off your first order!</p>
            <div className="mt-8 form-control w-full max-w-md">
              <div className="join w-[20rem]">
                <input type="email" placeholder="greenthumb@nursery.com" className="input input-bordered text-base-content join-item w-full" />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;