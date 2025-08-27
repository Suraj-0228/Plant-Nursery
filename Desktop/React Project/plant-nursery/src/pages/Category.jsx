import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import PlantCard from '../components/ui/PlantCard';
import { plants } from '../data/plants';

const Category = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [filteredPlants, setFilteredPlants] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      let currentPlants = [];
      if (categoryId) {
        currentPlants = plants.filter(p => p.category.toLowerCase().replace(' & ', '-') === categoryId);
      } else {
        currentPlants = plants;
      }

      if (searchTerm) {
        currentPlants = currentPlants.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      setFilteredPlants(currentPlants);
      setLoading(false);
    }, 500);
  }, [categoryId, searchTerm]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">{categoryId ? categoryId.replace('-', ' & ') : 'All Plants'}</h1>
      
      {/* Filters and Sort */}
      <div className="flex justify-between items-center mb-8">
        <div>Filters coming soon...</div>
        <div>Sort by coming soon...</div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <HashLoader color="#4F6F52" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPlants.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="btn-group">
          <button className="btn">«</button>
          <button className="btn">Page 1</button>
          <button className="btn">»</button>
        </div>
      </div>
    </div>
  );
};

export default Category;
