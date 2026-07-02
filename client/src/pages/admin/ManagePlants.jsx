import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Leaf, LayoutGrid, IndianRupee, Image, Star, Sparkles, X } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

const ManagePlants = () => {
  const [plants, setPlants] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPlant, setCurrentPlant] = useState(null);
  const [newPlant, setNewPlant] = useState({ name: '', category: 'Indoor', price: '', description: '', image: '', careDifficulty: 'Easy', stock: 50 });
  const { showPopup } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 8;
  const [errors, setErrors] = useState({});

  const validateForm = (plantData) => {
    const err = {};
    if (!plantData.name || !plantData.name.trim()) {
      err.name = 'Specimen Name is required';
    }
    if (plantData.price === undefined || plantData.price === null || plantData.price === '' || isNaN(plantData.price)) {
      err.price = 'Price is required';
    } else if (Number(plantData.price) <= 0) {
      err.price = 'Price must be a positive value';
    }
    if (plantData.stock === undefined || plantData.stock === null || plantData.stock === '' || isNaN(plantData.stock)) {
      err.stock = 'Stock level is required';
    } else if (Number(plantData.stock) < 0) {
      err.stock = 'Stock must be 0 or a positive integer';
    }
    if (!plantData.image || !plantData.image.trim()) {
      err.image = 'Image URL is required';
    } else if (!/^https?:\/\/.+/.test(plantData.image.trim())) {
      err.image = 'Image URL must start with http:// or https://';
    }
    if (!plantData.description || !plantData.description.trim()) {
      err.description = 'Description is required';
    } else if (plantData.description.trim().length < 10) {
      err.description = 'Description must be at least 10 characters';
    }
    return err;
  };

  const fetchPlants = async () => {
    const res = await fetch('/api/plants');
    const data = await res.json();
    setPlants(data);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleAddModal = () => {
    setErrors({});
    setShowAddModal(!showAddModal);
  };
  const handleEditModal = (plant) => {
    setErrors({});
    setCurrentPlant(plant);
    setShowEditModal(!showEditModal);
  };

  const handleDelete = (id) => {
    showPopup({
      title: 'Retire Specimen',
      message: 'Are you sure you want to delete this plant specimen?',
      type: 'confirm',
      onConfirm: async () => {
        await fetch(`/api/plants/${id}`, { method: 'DELETE' });
        fetchPlants();
        showPopup({
          title: 'Deleted',
          message: 'The plant specimen record has been retired.',
          type: 'success'
        });
      }
    });
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();
    const err = validateForm(newPlant);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    setErrors({});
    await fetch('/api/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlant),
    });
    showPopup({
      title: 'Specimen Added',
      message: 'New plant specimen added to the catalog.',
      type: 'success'
    });
    setNewPlant({ name: '', category: 'Indoor', price: '', description: '', image: '', careDifficulty: 'Easy', stock: 50 });
    setShowAddModal(false);
    fetchPlants();
  };

  const handleUpdatePlant = async (e) => {
    e.preventDefault();
    const err = validateForm(currentPlant);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    setErrors({});
    await fetch(`/api/plants/${currentPlant._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentPlant),
    });
    showPopup({
      title: 'Specimen Updated',
      message: 'The plant specimen details were updated successfully.',
      type: 'success'
    });
    setShowEditModal(false);
    fetchPlants();
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-200/50 p-6 rounded-3xl border border-base-300/40 glass-card">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-heading text-base-content flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" /> Plant Specimen Registry
          </h1>
          <p className="text-base-content/70 text-sm">Add, modify, or retire botanical catalog records.</p>
        </div>
        <button className="btn btn-primary h-11 px-5 rounded-xl btn-premium text-sm font-semibold shadow-md flex items-center gap-1.5" onClick={handleAddModal}>
          <Plus className="w-5 h-5" /> Add Specimen
        </button>
      </div>

      {/* Database Table view */}
      <div className="rounded-[28px] border border-base-300/40 bg-base-200/50 p-6 glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300/60 text-sm font-bold text-base-content/70">
                <th className="py-4">No.</th>
                <th>Specimen</th>
                <th>Category</th>
                <th>Price Value</th>
                <th>Inventory Stock</th>
                <th>Difficulty</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300/30">
              {plants.slice((currentPage - 1) * plantsPerPage, currentPage * plantsPerPage).map((plant, index) => {
                const globalIndex = (currentPage - 1) * plantsPerPage + index;
                return (
                  <tr key={plant._id} className="hover:bg-primary/5 transition-colors duration-200 text-sm">
                    <td className="py-4 font-bold text-base-content/50">{globalIndex + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-xl bg-base-100 border border-base-300/30 p-1 flex items-center justify-center overflow-hidden">
                          <img src={plant.image} alt={plant.name} className="object-contain w-full h-full" />
                        </div>
                      </div>
                      <span className="font-bold text-base-content font-heading text-base">{plant.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-primary/10 text-primary border-none font-bold text-sm px-2.5 py-1.5 rounded-lg">
                      {plant.category}
                    </span>
                  </td>
                  <td className="font-bold text-base-content font-heading text-base">₹{plant.price.toFixed(2)}</td>
                  <td className="font-semibold text-base-content/85">{plant.stock !== undefined ? plant.stock : 50} units</td>
                  <td>
                    <span className={`badge border-none font-bold text-sm px-2.5 py-1.5 rounded-lg ${
                      plant.careDifficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' :
                      plant.careDifficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {plant.careDifficulty}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary text-base-content/70 transition-colors" onClick={() => handleEditModal(plant)}>
                        <Edit className="w-4.5 h-4.5" />
                      </button>
                      <button className="btn btn-ghost btn-circle btn-sm hover:bg-error/10 hover:text-error text-base-content/70 transition-colors" onClick={() => handleDelete(plant._id)}>
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {Math.ceil(plants.length / plantsPerPage) > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-base-300/30">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="btn btn-outline rounded-xl px-4 py-2 border border-base-300 disabled:opacity-40"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.ceil(plants.length / plantsPerPage) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn rounded-xl w-9 h-9 text-md font-bold transition-all duration-300 ${
                  currentPage === page 
                    ? 'btn-primary shadow-md' 
                    : 'btn-ghost hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              disabled={currentPage === Math.ceil(plants.length / plantsPerPage)}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(plants.length / plantsPerPage)))}
              className="btn btn-outline rounded-xl px-4 py-2 border border-base-300 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Modals */}
      {(showAddModal || showEditModal) && (
        <div className="modal modal-open bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="p-6 sm:p-8 rounded-[32px] border border-base-300/40 bg-base-100 max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl relative glass-card animate-fade-in-up space-y-4 overflow-hidden">
            
            <button 
              onClick={() => showAddModal ? setShowAddModal(false) : setShowEditModal(false)}
              className="absolute top-6 right-6 btn btn-ghost btn-circle btn-sm text-base-content/60 hover:bg-base-200"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1 flex-shrink-0">
              <h3 className="text-2xl font-extrabold text-base-content font-heading tracking-tight">
                {showAddModal ? 'Add New Specimen' : 'Modify Specimen'}
              </h3>
              <p className="text-sm text-base-content/65">Enter botanical specifications below.</p>
            </div>

            <form onSubmit={showAddModal ? handleAddPlant : handleUpdatePlant} className="flex flex-col flex-grow overflow-hidden space-y-4">
              
              <div className="flex-grow overflow-y-auto space-y-4 pr-1.5 py-1">
                {/* Name */}
                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1">Specimen Name</label>
                  <div className="relative">
                    <Leaf className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-base-content/40" />
                    <input 
                      type="text" 
                      placeholder="Plant name (e.g. Lavender)" 
                      className={`input input-bordered w-full pl-12 pr-4 rounded-xl glass-input text-sm h-11 mt-2 ${errors.name ? 'border-error/60 focus:border-error' : ''}`}
                      value={showEditModal ? currentPlant.name : newPlant.name} 
                      onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, name: e.target.value }) : setNewPlant({ ...newPlant, name: e.target.value })} 
                    />
                    {errors.name && <span className="text-error text-xs ml-1 mt-1 block">{errors.name}</span>}
                  </div>
                </div>

                {/* Category & Care Difficulty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1">Category</label>
                    <div className="relative">
                      <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-base-content/40" />
                      <select 
                        className="select select-bordered w-full pl-12 rounded-xl glass-input text-sm h-11 mt-2" 
                        value={showEditModal ? currentPlant.category : newPlant.category} 
                        onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, category: e.target.value }) : setNewPlant({ ...newPlant, category: e.target.value })}
                      >
                        <option>Indoor</option>
                        <option>Outdoor</option>
                        <option>Herbs & Vegetables</option>
                        <option>Flowers</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1">Care Difficulty</label>
                    <div className="relative">
                      <Star className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-base-content/40" />
                      <select 
                        className="select select-bordered w-full pl-12 rounded-xl glass-input text-sm h-11 mt-2" 
                        value={showEditModal ? currentPlant.careDifficulty : newPlant.careDifficulty} 
                        onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, careDifficulty: e.target.value }) : setNewPlant({ ...newPlant, careDifficulty: e.target.value })}
                      >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1">Price (INR)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-base-content/40" />
                      <input 
                        type="number" 
                        placeholder="Price" 
                        className={`input input-bordered w-full pl-12 pr-4 rounded-xl glass-input text-sm h-11 mt-2 ${errors.price ? 'border-error/60 focus:border-error' : ''}`}
                        value={showEditModal ? currentPlant.price : newPlant.price} 
                        onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, price: Number(e.target.value) }) : setNewPlant({ ...newPlant, price: Number(e.target.value) })} 
                      />
                      {errors.price && <span className="text-error text-xs ml-1 mt-1 block">{errors.price}</span>}
                    </div>
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="text-sm font-semibold text-base-content/85 ml-1">Inventory Stock</label>
                    <div className="relative">
                      <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-base-content/40" />
                      <input 
                        type="number" 
                        placeholder="Stock quantity (e.g. 50)" 
                        className={`input input-bordered w-full pl-12 pr-4 rounded-xl glass-input text-sm h-11 mt-2 ${errors.stock ? 'border-error/60 focus:border-error' : ''}`}
                        value={showEditModal ? (currentPlant.stock !== undefined ? currentPlant.stock : 50) : newPlant.stock} 
                        onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, stock: Number(e.target.value) }) : setNewPlant({ ...newPlant, stock: Number(e.target.value) })} 
                      />
                      {errors.stock && <span className="text-error text-xs ml-1 mt-1 block">{errors.stock}</span>}
                    </div>
                  </div>

                </div>

                {/* Image URL */}
                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1">Image URL</label>
                  <div className="relative">
                    <Image className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-base-content/40" />
                    <input 
                      type="text" 
                      placeholder="https://..." 
                      className={`input input-bordered w-full pl-12 pr-4 rounded-xl glass-input text-sm h-11 mt-2 ${errors.image ? 'border-error/60 focus:border-error' : ''}`}
                      value={showEditModal ? currentPlant.image : newPlant.image} 
                      onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, image: e.target.value }) : setNewPlant({ ...newPlant, image: e.target.value })} 
                    />
                    {errors.image && <span className="text-error text-xs ml-1 mt-1 block">{errors.image}</span>}
                  </div>
                </div>

                {/* Description */}
                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1">Description</label>
                  <textarea 
                    placeholder="Foliage, growth rate details..." 
                    className={`textarea textarea-bordered w-full rounded-xl glass-input text-sm h-24 mt-2 ${errors.description ? 'border-error/60 focus:border-error' : ''}`}
                    value={showEditModal ? currentPlant.description : newPlant.description} 
                    onChange={(e) => showEditModal ? setCurrentPlant({ ...currentPlant, description: e.target.value }) : setNewPlant({ ...newPlant, description: e.target.value })}
                  ></textarea>
                  {errors.description && <span className="text-error text-xs ml-1 mt-1 block">{errors.description}</span>}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-base-300/40 flex-shrink-0">
                <button type="button" className="btn btn-ghost hover:bg-base-200 text-sm font-semibold rounded-xl h-11 px-5" onClick={() => { setShowAddModal(false); setShowEditModal(false); setErrors({}); }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary h-11 px-6 rounded-xl btn-premium text-sm font-semibold shadow-md">
                  {showAddModal ? 'Add Specimen' : 'Update Specimen'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManagePlants;