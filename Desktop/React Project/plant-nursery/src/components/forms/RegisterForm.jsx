import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    register({ fullname, email, username, password });
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Full Name</span>
        </label>
        <input 
          type="text" 
          placeholder="full name" 
          className="input input-bordered" 
          value={fullname} 
          onChange={(e) => setFullname(e.target.value)} 
          required 
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input 
          type="email" 
          placeholder="email" 
          className="input input-bordered" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input 
          type="text" 
          placeholder="username" 
          className="input input-bordered" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input 
          type="password" 
          placeholder="password" 
          className="input input-bordered" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input 
          type="password" 
          placeholder="confirm password" 
          className="input input-bordered" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
