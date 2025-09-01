import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
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

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-[35rem] shadow-2xl bg-base-100">
          <h1 className="text-5xl text-center px-8 py-10 font-bold">Register now!</h1>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text font-bold">Full Name:</span>
              </label>
              <input type="text" name="fullname" placeholder="Your Full Name" className="input input-bordered w-full" required onChange={handleChange} />
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text font-bold">Username:</span>
              </label>
              <input type="text" name="username" placeholder="Choose a username" className="input input-bordered w-full" required onChange={handleChange} />
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text font-bold">Email:</span>
              </label>
              <input type="email" name="email" placeholder="your.email@example.com" className="input input-bordered w-full" required onChange={handleChange} />
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text font-bold">Password:</span>
              </label>
              <input type="password" name="password" placeholder="Create a password" className="input input-bordered w-full" required onChange={handleChange} />
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text font-bold">Confirm Password:</span>
              </label>
              <input type="password" name="confirmPassword" placeholder="Confirm your password" className="input input-bordered w-full" required onChange={handleChange} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="form-control flex flex-col gap-y-1 mt-6">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
            <p className="text-sm text-center mt-4">
              Already have an account? 
              <Link to="/login" className="link link-primary"> Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
