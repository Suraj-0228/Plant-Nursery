import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      login(data);
      navigate('/account');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="card shrink-0 w-[35rem] shadow-2xl bg-base-100">
          <h1 className="text-5xl text-center px-8 py-10 font-bold">Login Now!</h1>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control flex flex-col gap-y-1">
              <label className="label">
                <span className="label-text font-bold">Email:</span>
              </label>
              <input type="email" name="email" placeholder="greenthumb@plantnursery.com" className="input input-bordered w-full" required onChange={handleChange} />
            </div>
            <div className="form-control flex flex-col gap-y-1">
              <label className="label">
                <span className="label-text font-bold">Password:</span>
              </label>
              <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required onChange={handleChange} />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="form-control flex flex-col gap-y-1 mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <p className="text-sm text-center mt-4">
              Don't have an account? 
              <Link to="/register" className="link link-primary"> Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
