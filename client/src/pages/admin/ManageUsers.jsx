import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Ban, ShieldCheck, Users, Sparkles, X, Shield, User, Home, Mail, Phone } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { showPopup } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const fetchUsers = async () => {
    const res = await fetch('/api/auth');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    showPopup({
      title: 'Delete Account',
      message: 'Are you sure you want to delete this user account?',
      type: 'confirm',
      onConfirm: async () => {
        await fetch(`/api/auth/${id}`, { method: 'DELETE' });
        fetchUsers();
        showPopup({
          title: 'Account Deleted',
          message: 'The customer account has been permanently removed.',
          type: 'success'
        });
      }
    });
  };

  const handleView = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleToggleBlock = (userToUpdate) => {
    const updatedBlockedStatus = !userToUpdate.isBlocked;
    const actionName = updatedBlockedStatus ? 'block' : 'unblock';
    
    showPopup({
      title: `${updatedBlockedStatus ? 'Block' : 'Unblock'} User`,
      message: `Are you sure you want to ${actionName} this user account?`,
      type: 'confirm',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/auth/${userToUpdate._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...userToUpdate, isBlocked: updatedBlockedStatus }),
          });
          if (res.ok) {
            fetchUsers();
            showPopup({
              title: 'Success',
              message: `User has been successfully ${updatedBlockedStatus ? 'blocked' : 'unblocked'}.`,
              type: 'success'
            });
          } else {
            showPopup({
              title: 'Error',
              message: 'Failed to update user block status.',
              type: 'error'
            });
          }
        } catch (err) {
          console.error(err);
          showPopup({
            title: 'Error',
            message: 'An error occurred while updating block status.',
            type: 'error'
          });
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-200/50 p-6 rounded-3xl border border-base-300/40 glass-card">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-heading text-base-content flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" /> User Directory
          </h1>
          <p className="text-base-content/70 text-sm">Manage registered customers, status clearance, and active/blocked parameters.</p>
        </div>
        <div className="p-3 rounded-xl bg-base-100 border border-base-300/40 text-base-content/85 flex items-center gap-2 text-sm font-semibold">
          <Users className="h-4.5 w-4.5 text-primary" />
          <span>Total users: {users.length}</span>
        </div>
      </div>

      {/* Table grid */}
      <div className="rounded-[28px] border border-base-300/40 bg-base-200/50 p-6 glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300/60 text-sm font-bold text-base-content/70">
                <th className="py-4">No.</th>
                <th>User Details</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Physical Address</th>
                <th>Privileges & Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300/30">
              {users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage).map((user, index) => {
                const globalIndex = (currentPage - 1) * usersPerPage + index;
                return (
                  <tr key={user._id} className="hover:bg-primary/5 transition-colors duration-200 text-sm">
                    <td className="py-4 font-bold text-base-content/50">{globalIndex + 1}</td>
                  <td>
                    <div className="space-y-0.5">
                      <p className="font-bold text-base-content font-heading text-base">{user.fullname}</p>
                      <p className="text-base-content/60 text-sm">{user.email}</p>
                    </div>
                  </td>
                  <td className="font-semibold text-base-content/80">@{user.username}</td>
                  <td className="text-base-content/80">{user.phone || '—'}</td>
                  <td className="max-w-xs truncate text-base-content/80" title={user.address ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}, ${user.address.country}` : 'N/A'}>
                    {user.address ? `${user.address.street}, ${user.address.city}` : '—'}
                  </td>
                  <td>
                    <div className="flex flex-row gap-1 w-fit">
                      {user.isAdmin ? (
                        <span className="badge bg-amber-500/10 text-amber-500 border-none font-bold text-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1 w-fit">
                          <Shield className="h-3.5 w-3.5" /> Admin
                        </span>
                      ) : (
                        <span className="badge bg-base-300 text-base-content/70 border-none font-bold text-sm px-2.5 py-1.5 rounded-lg">
                          Customer
                        </span>
                      )}
                      {user.isBlocked ? (
                        <span className="badge bg-error/10 text-error border-none font-bold text-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1 w-fit">
                          Blocked
                        </span>
                      ) : (
                        <span className="badge bg-success/10 text-success border-none font-bold text-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1 w-fit">
                          Active
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary text-base-content/70 transition-colors" 
                        onClick={() => handleView(user)}
                        title="View Details"
                      >
                        <Eye className="w-4.5 h-4.5" />
                      </button>
                      
                      {!user.isAdmin && (
                        <button 
                          className={`btn btn-ghost btn-circle btn-sm transition-colors ${
                            user.isBlocked 
                              ? 'hover:bg-success/15 text-success hover:text-success' 
                              : 'hover:bg-error/15 text-error hover:text-error'
                          }`} 
                          onClick={() => handleToggleBlock(user)}
                          title={user.isBlocked ? "Unblock User" : "Block User"}
                        >
                          {user.isBlocked ? <ShieldCheck className="w-4.5 h-4.5" /> : <Ban className="w-4.5 h-4.5" />}
                        </button>
                      )}

                      <button 
                        className="btn btn-ghost btn-circle btn-sm hover:bg-error/10 hover:text-error text-base-content/70 transition-colors" 
                        onClick={() => handleDelete(user._id)}
                        title="Delete User"
                      >
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
        {Math.ceil(users.length / usersPerPage) > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-base-300/30">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="btn btn-outline rounded-xl px-4 py-2 border border-base-300 disabled:opacity-40"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => i + 1).map(page => (
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
              disabled={currentPage === Math.ceil(users.length / usersPerPage)}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(users.length / usersPerPage)))}
              className="btn btn-outline rounded-xl px-4 py-2 border border-base-300 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* View User Details Modal */}
      {isModalOpen && currentUser && (
        <div className="modal modal-open bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="p-6 sm:p-8 rounded-[32px] border border-base-300/40 bg-base-100 max-w-lg w-full shadow-2xl relative glass-card animate-fade-in-up space-y-6">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 btn btn-ghost btn-circle btn-sm text-base-content/60 hover:bg-base-200"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-2xl font-extrabold text-base-content font-heading tracking-tight">User Specifications</h3>
              <p className="text-sm text-base-content/65">Complete customer record profile details.</p>
            </div>

            <div className="space-y-4 text-sm text-base-content">
              {/* Profile details */}
              <div className="p-5 rounded-2xl bg-base-200/60 border border-base-300/30 space-y-3">
                <h4 className="font-bold text-base-content font-heading text-base flex items-center gap-2">
                  <User size={18} className="text-primary" /> Profile Parameters
                </h4>
                <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-base-300/30">
                  <span className="font-bold text-base-content/75">Full Name:</span>
                  <span className="col-span-2 font-semibold text-base-content">{currentUser.fullname}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-base-300/30">
                  <span className="font-bold text-base-content/75">Username:</span>
                  <span className="col-span-2 font-semibold text-base-content">@{currentUser.username}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-base-300/30">
                  <span className="font-bold text-base-content/75">Email:</span>
                  <span className="col-span-2 font-semibold text-base-content">{currentUser.email}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1.5">
                  <span className="font-bold text-base-content/75">Phone:</span>
                  <span className="col-span-2 font-semibold text-base-content">{currentUser.phone || '—'}</span>
                </div>
              </div>

              {/* Address details */}
              <div className="p-5 rounded-2xl bg-base-200/60 border border-base-300/30 space-y-3">
                <h4 className="font-bold text-base-content font-heading text-base flex items-center gap-2">
                  <Home size={18} className="text-primary" /> Address Coordinates
                </h4>
                {currentUser.address ? (
                  <div className="space-y-1.5">
                    <p><strong>Street:</strong> {currentUser.address.street || '—'}</p>
                    <p><strong>City/State:</strong> {currentUser.address.city || '—'}, {currentUser.address.state || '—'}</p>
                    <p><strong>ZIP/Country:</strong> {currentUser.address.zip || '—'}, {currentUser.address.country || '—'}</p>
                  </div>
                ) : (
                  <p className="text-base-content/65">No address record on file.</p>
                )}
              </div>

              {/* Privilege and Block Status */}
              <div className="flex gap-4">
                <div className="flex-1 p-3.5 rounded-xl bg-base-200/60 border border-base-300/30 text-center">
                  <p className="text-[11px] sm:text-xs text-base-content/60 font-semibold uppercase tracking-wider mb-1">Privileges</p>
                  <span className="font-bold text-sm text-base-content">{currentUser.isAdmin ? 'Administrator' : 'Standard Customer'}</span>
                </div>
                <div className="flex-1 p-3.5 rounded-xl bg-base-200/60 border border-base-300/30 text-center">
                  <p className="text-[11px] sm:text-xs text-base-content/60 font-semibold uppercase tracking-wider mb-1">Status</p>
                  <span className={`font-bold text-sm ${currentUser.isBlocked ? 'text-error' : 'text-success'}`}>
                    {currentUser.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="button" 
                className="btn btn-primary h-11 px-6 rounded-xl btn-premium text-sm font-semibold shadow-md" 
                onClick={() => setIsModalOpen(false)}
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageUsers;