import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <div className="card bg-base-100 shadow-xl image-full">
      <figure><img src={category.image} alt={category.name} className="h-64 w-full object-cover" /></figure>
      <div className="card-body justify-center items-center">
        <h2 className="card-title text-3xl font-bold text-white">{category.name}</h2>
        <div className="card-actions justify-center mt-4">
          <Link to={`/category/${category.id}`} className="btn btn-primary">Explore</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
