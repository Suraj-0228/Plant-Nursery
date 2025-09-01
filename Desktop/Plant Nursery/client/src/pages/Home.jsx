import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[url(https://i.pinimg.com/1200x/b1/16/9f/b1169f0a5f9adc3ac59e92c735392010.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/75 sm:bg-transparent sm:from-black/95 sm:to-black/25 sm:bg-gradient-to-r"></div>
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
              <Link to="/category" className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary-focus focus:outline-none focus:ring active:bg-primary-focus sm:w-auto">
                Shop Now
              </Link>
              <Link to="/about" className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-primary shadow hover:text-primary-focus focus:outline-none focus:ring active:text-primary-focus sm:w-auto">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center">Our Plant Categories</h2>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Indoor Plants */}
          <div className="card bg-base-100 shadow-xl image-full">
            <figure><img src="https://i.pinimg.com/1200x/51/86/fd/5186fd050b21178dfdb15a0347a8b608.jpg" alt="Indoor Plants" /></figure>
            <div className="card-body justify-center items-center">
              <h2 className="card-title text-2xl font-bold">Indoor Plants</h2>
              <div className="card-actions">
                <Link to="/category" className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
          {/* Outdoor Plants */}
          <div className="card bg-base-100 shadow-xl image-full">
            <figure><img src="https://i.pinimg.com/736x/cb/25/8f/cb258fa62453c60d9d35da62b25e8050.jpg" alt="Outdoor Plants" /></figure>
            <div className="card-body justify-center items-center">
              <h2 className="card-title text-2xl font-bold">Outdoor Plants</h2>
              <div className="card-actions">
                <Link to="/category" className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
          {/* Herbs & Vegetables */}
          <div className="card bg-base-100 shadow-xl image-full">
            <figure><img src="https://i.pinimg.com/736x/f0/cd/13/f0cd13a846ce6d278ba13f9db3fc31c6.jpg" alt="Herbs & Vegetables" /></figure>
            <div className="card-body justify-center items-center">
              <h2 className="card-title text-2xl font-bold">Herbs & Vegetables</h2>
              <div className="card-actions">
                <Link to="/category" className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
          {/* Flowers */}
          <div className="card bg-base-100 shadow-xl image-full">
            <figure><img src="https://i.pinimg.com/1200x/db/81/d3/db81d37b2727bc7bc7e8bcf111319f9b.jpg" alt="Flowers" /></figure>
            <div className="card-body justify-center items-center">
              <h2 className="card-title text-2xl font-bold">Flowers</h2>
              <div className="card-actions">
                <Link to="/category" className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Herbal Plants */}
      <section className="bg-base-200">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center">Featured Herbal Plants</h2>
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Plant Card 1 */}
            <div className="card bg-base-100 shadow-xl">
              <figure><img src="https://i.pinimg.com/1200x/54/eb/75/54eb75f79b17fa899719d303e8fa1c2b.jpg" alt="Mint" /></figure>
              <div className="card-body">
                <h2 className="card-title">Mint</h2>
                <p>Known for its refreshing aroma and culinary uses.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
            {/* Plant Card 2 */}
            <div className="card bg-base-100 shadow-xl">
              <figure><img src="https://i.pinimg.com/736x/10/3f/ab/103fabe5406417941174197d6fb02712.jpg" alt="Lavender" /></figure>
              <div className="card-body">
                <h2 className="card-title">Lavender</h2>
                <p>Famous for its calming scent and beautiful purple flowers.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
            {/* Plant Card 3 */}
            <div className="card bg-base-100 shadow-xl">
              <figure><img src="https://i.pinimg.com/1200x/56/97/c9/5697c9cc8cd9de2021f390d7890687be.jpg" alt="Rosemary" /></figure>
              <div className="card-body">
                <h2 className="card-title">Rosemary</h2>
                <p>A fragrant herb that's great for cooking and has medicinal properties.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="hero min-h-[300px] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">About Our Nursery</h1>
              <p className="py-6">We are passionate about plants and dedicated to helping you find the perfect green companions for your space. Our mission is to provide high-quality plants and the knowledge you need to help them thrive.</p>
              <Link to="/about" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-base-200">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center">Subscribe to Our Newsletter</h2>
            <p className="mt-4 text-center">Get the latest plant care tips, seasonal recommendations, and exclusive offers delivered to your inbox.</p>
            <div className="mt-8 form-control w-full max-w-xs">
              <div className="join">
                <input type="text" placeholder="username@site.com" className="input input-bordered join-item w-full" /> 
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
