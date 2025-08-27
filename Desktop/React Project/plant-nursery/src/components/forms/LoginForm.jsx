import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/account');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-body">
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
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        </label>
      </div>
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">Remember me</span>
          <input 
            type="checkbox" 
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)} 
            className="checkbox checkbox-primary" 
          />
        </label>
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
