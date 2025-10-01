import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Leaf, LayoutGrid, DollarSign, FileText, Image, Star } from 'lucide-react';

const ManagePlants = () => {
  const [plants, setPlants] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPlant, setCurrentPlant] = useState(null);
  const [newPlant, setNewPlant] = useState({ name: '', category: 'Indoor', price: '', description: '', image: '', careDifficulty: 'Easy' });

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
    setNewPlant({ name: '', category: 'Indoor', price: '', description: '', image: '', careDifficulty: 'Easy' });
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
    <div className="p-6 bg-base-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Plants</h1>
        <button className="btn btn-primary" onClick={handleAddModal}>
          <Plus className="w-5 h-5 mr-1" />
          Add Plant
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, index) => (
              <tr key={plant._id} className="hover">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={plant.image} alt={plant.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{plant.name}</div>
                    </div>
                  </div>
                </td>
                <td>{plant.category}</td>
                <td>₹{plant.price}</td>
                <td>
                  <button className="btn btn-ghost btn-xs" onClick={() => handleEditModal(plant)}>
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(plant._id)}>
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modals */}
      {(showAddModal || showEditModal) && (
        <div className={`modal ${showAddModal || showEditModal ? 'modal-open' : ''}`}>
          <div className="modal-box">
            <h3 className="font-bold text-center text-3xl mb-4">{showAddModal ? 'Add New Plant' : 'Edit Plant'}</h3>
            <form onSubmit={showAddModal ? handleAddPlant : handleUpdatePlant}>
              <div className="form-control flex flex-col my-3">
                <label className="label mb-1">
                  <span className="label-text">Name:</span>
                </label>
                <div className="join">
                  <span className="rounded-l-xl btn btn-disabled"><Leaf className="w-4 h-4"/></span>
                  <input type="text" placeholder="Plant Name" className="input input-bordered w-full rounded-r-xl" 
                         value={showEditModal ? currentPlant.name : newPlant.name} 
                         onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, name: e.target.value }) : setNewPlant({ ...newPlant, name: e.target.value })} />
                </div>
              </div>
              <div className="form-control flex flex-col my-3">
                <label className="label mb-1">
                  <span className="label-text">Category:</span>
                </label>
                <div className="join">
                  <span className="rounded-l-xl btn btn-disabled"><LayoutGrid className="w-4 h-4"/></span>
                  <select className="select select-bordered w-full rounded-r-xl" 
                          value={showEditModal ? currentPlant.category : newPlant.category} 
                          onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, category: e.target.value }) : setNewPlant({ ...newPlant, category: e.target.value })}>
                    <option>Indoor</option>
                    <option>Outdoor</option>
                    <option>Herbs & Vegetables</option>
                    <option>Flowers</option>
                  </select>
                </div>
              </div>
              <div className="form-control flex flex-col my-3">
                <label className="label mb-1">
                  <span className="label-text">Care Difficulty:</span>
                </label>
                <div className="join">
                  <span className="rounded-l-xl btn btn-disabled"><Star className="w-4 h-4"/></span>
                  <select className="select select-bordered w-full rounded-r-xl" 
                          value={showEditModal ? currentPlant.careDifficulty : newPlant.careDifficulty} 
                          onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, careDifficulty: e.target.value }) : setNewPlant({ ...newPlant, careDifficulty: e.target.value })}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>
              <div className="form-control flex flex-col my-3">
                <label className="label mb-1">
                  <span className="label-text">Price:</span>
                </label>
                <div className="join">
                  <span className="rounded-l-xl btn btn-disabled"><DollarSign className="w-4 h-4"/></span>
                  <input type="number" placeholder="Price" className="input input-bordered w-full rounded-r-xl" 
                         value={showEditModal ? currentPlant.price : newPlant.price} 
                         onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, price: e.target.value }) : setNewPlant({ ...newPlant, price: e.target.value })} />
                </div>
              </div>
              <div className="form-control flex flex-col my-3">
                <label className="label mb-1">
                  <span className="label-text">Image URL:</span>
                </label>
                <div className="join">
                  <span className="rounded-l-xl btn btn-disabled"><Image className="w-4 h-4"/></span>
                  <input type="text" placeholder="Image URL" className="input input-bordered w-full rounded-r-xl" 
                         value={showEditModal ? currentPlant.image : newPlant.image} 
                         onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, image: e.target.value }) : setNewPlant({ ...newPlant, image: e.target.value })} />
                </div>
              </div>
              <div className="form-control flex flex-col my-3">
                <label className="label mb-1">
                  <span className="label-text">Description:</span>
                </label>
                <div className="join">
                  <textarea className="textarea textarea-bordered w-full rounded-xl" placeholder="Description" 
                            value={showEditModal ? currentPlant.description : newPlant.description} 
                            onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, description: e.target.value }) : setNewPlant({ ...newPlant, description: e.target.value })}></textarea>
                </div>
              </div>
              <div className="modal-action mt-6">
                <button type="submit" className="btn btn-primary">{showAddModal ? 'Add Plant' : 'Update Plant'}</button>
                <button type="button" className="btn" onClick={() => showAddModal ? setShowAddModal(false) : setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlants;