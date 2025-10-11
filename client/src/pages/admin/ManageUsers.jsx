import React, { useState, useEffect } from 'react';
import { Trash2, Edit } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch('/api/auth');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/auth/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/auth/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    });
    setIsModalOpen(false);
    fetchUsers();
  };

  return (
    <div className="p-6 bg-base-100">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Is Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <th>{index + 1}</th>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.address ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}, ${user.address.country}` : 'N/A'}</td>
                <td>{user.isAdmin ? <span className="badge badge-success">Yes</span> : <span className="badge badge-ghost">No</span>}</td>
                <td className='flex'>
                  <button className="btn btn-ghost btn-xs" onClick={() => handleEdit(user)}>
                    <Edit className="w-4 h-4 text-info" />
                  </button>
                  <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(user._id)}>
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-center text-3xl">Edit User</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control my-2 flex flex-col">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl w-full"
                  value={currentUser.fullname}
                  onChange={(e) => setCurrentUser({ ...currentUser, fullname: e.target.value })}
                />
              </div>
              <div className="form-control my-2 flex flex-col">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered rounded-xl w-full"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </div>
              <div className="form-control my-2 flex flex-col">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl w-full"
                  value={currentUser.username}
                  onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                />
              </div>
              <div className="form-control my-2 flex flex-col">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl w-full"
                  value={currentUser.phone || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                />
              </div>
              <div className="form-control my-2 flex flex-col">
                <label className="label">
                  <span className="label-text">Street</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl w-full"
                  value={currentUser.address?.street || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, address: { ...currentUser.address, street: e.target.value } })}
                />
              </div>
              <div className="form-control my-2 flex flex-col">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl w-full"
                  value={currentUser.address?.city || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, address: { ...currentUser.address, city: e.target.value } })}
                />
              </div>
              <div className="form-control my-2 flex flex-col">
                <label className="label">
                  <span className="label-text">State</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl w-full"
                  value={currentUser.address?.state || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, address: { ...currentUser.address, state: e.target.value } })}
                />
              </div>
              <div className="form-control my-2 flex flex-col">
                <label className="label">
                  <span className="label-text">ZIP Code</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl w-full"
                  value={currentUser.address?.zip || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, address: { ...currentUser.address, zip: e.target.value } })}
                />
              </div>
              <div className="form-control my-2 flex flex-col">
                <label className="label">
                  <span className="label-text">Country</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl w-full"
                  value={currentUser.address?.country || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, address: { ...currentUser.address, country: e.target.value } })}
                />
              </div>
              <div className="form-control my-2 flex flex-col">
                <label className="label cursor-pointer">
                  <span className="label-text">Is Admin</span>
                  <input
                    type="checkbox"
                    className="checkbox rounded-xl"
                    checked={currentUser.isAdmin}
                    onChange={(e) => setCurrentUser({ ...currentUser, isAdmin: e.target.checked })}
                  />
                </label>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;