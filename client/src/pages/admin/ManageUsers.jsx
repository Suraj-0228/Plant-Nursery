import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

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
                <td>{user.isAdmin ? <span className="badge badge-success">Yes</span> : <span className="badge badge-ghost">No</span>}</td>
                <td>
                  <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(user._id)}>
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
