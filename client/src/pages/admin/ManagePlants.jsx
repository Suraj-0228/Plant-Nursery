import React, { useState, useEffect } from 'react';

const ManagePlants = () => {
  const [plants, setPlants] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPlant, setCurrentPlant] = useState(null);
  const [newPlant, setNewPlant] = useState({ name: '', category: '', price: '', description: '', image: '' });

  const fetchPlants = async () => {
    const res = await fetch('/api/plants');
    const data = await res.json();
    setPlants(data);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleAddModal = () => setShowAddModal(!showAddModal);
  const handleEditModal = (plant) => {
    setCurrentPlant(plant);
    setShowEditModal(!showEditModal);
  }

  const handleDelete = async (id) => {
    await fetch(`/api/plants/${id}`, { method: 'DELETE' });
    fetchPlants();
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();
    await fetch('/api/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlant),
    });
    setNewPlant({ name: '', category: '', price: '', description: '', image: '' });
    setShowAddModal(false);
    fetchPlants();
  };

  const handleUpdatePlant = async (e) => {
    e.preventDefault();
    await fetch(`/api/plants/${currentPlant._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentPlant),
    });
    setShowEditModal(false);
    fetchPlants();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Plants</h1>
      <button className="btn btn-primary mb-4" onClick={handleAddModal}>Add Plant</button>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant) => (
              <tr key={plant._id}>
                <td>{plant.name}</td>
                <td>{plant.category}</td>
                <td>${plant.price}</td>
                <td>
                  <button className="btn btn-sm btn-info mr-2" onClick={() => handleEditModal(plant)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(plant._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Plant Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Plant</h3>
            <form onSubmit={handleAddPlant}>
              <div className="form-control">
                <label className="label">Name</label>
                <input type="text" className="input input-bordered" value={newPlant.name} onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label">Category</label>
                <input type="text" className="input input-bordered" value={newPlant.category} onChange={(e) => setNewPlant({ ...newPlant, category: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label">Price</label>
                <input type="number" className="input input-bordered" value={newPlant.price} onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label">Description</label>
                <textarea className="textarea textarea-bordered" value={newPlant.description} onChange={(e) => setNewPlant({ ...newPlant, description: e.target.value })}></textarea>
              </div>
              <div className="form-control">
                <label className="label">Image URL</label>
                <input type="text" className="input input-bordered" value={newPlant.image} onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })} />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" className="btn" onClick={handleAddModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Plant Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Plant</h3>
            <form onSubmit={handleUpdatePlant}>
              <div className="form-control">
                <label className="label">Name</label>
                <input type="text" className="input input-bordered" value={currentPlant.name} onChange={(e) => setCurrentPlant({ ...currentPlant, name: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label">Category</label>
                <input type="text" className="input input-bordered" value={currentPlant.category} onChange={(e) => setCurrentPlant({ ...currentPlant, category: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label">Price</label>
                <input type="number" className="input input-bordered" value={currentPlant.price} onChange={(e) => setCurrentPlant({ ...currentPlant, price: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label">Description</label>
                <textarea className="textarea textarea-bordered" value={currentPlant.description} onChange={(e) => setCurrentPlant({ ...currentPlant, description: e.target.value })}></textarea>
              </div>
              <div className="form-control">
                <label className="label">Image URL</label>
                <input type="text" className="input input-bordered" value={currentPlant.image} onChange={(e) => setCurrentPlant({ ...currentPlant, image: e.target.value })} />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlants;