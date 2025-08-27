import React from 'react';
import { Link } from 'react-router-dom';

const PlantCard = ({ plant }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure><img src={plant.image} alt={plant.name} className="h-48 w-full object-cover" /></figure>
      <div className="card-body">
        <h2 className="card-title">{plant.name}</h2>
        <p>{plant.description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{plant.category}</div>
          <div className="badge badge-outline">{plant.difficulty}</div>
        </div>
        <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold">${plant.price}</span>
            <Link to={`/plant/${plant.id}`} className="btn btn-primary">View</Link>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
