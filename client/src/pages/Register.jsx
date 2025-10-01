import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div className="py-20 flex items-center justify-center bg-base-200">
      <div className="flex flex-col md:flex-row rounded-xl shadow-2xl max-w-5xl overflow-hidden">
        {/* Form Section */}
        <div className="w-full py-12 md:w-[35rem] p-8 bg-base-100">
          <h1 className="text-4xl font-bold text-center mb-2">Create Your Account!</h1>
          <h1 className="text-center mb-8">Welcome to GreenThumb Nursery.</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input type="text" name="fullname" placeholder="Enter Your Full Name" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
            </div>
            <div className="relative">
              <input type="text" name="username" placeholder="Enter Your Username" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
            </div>
            <div className="relative">
              <input type="email" name="email" placeholder="Enter Your Email" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
            </div>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter Password" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Enter Confirm Password" className="input input-bordered rounded-xl w-full px-5" required onChange={handleChange} />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">Register</button>
            <p className="text-sm text-center">
              Already have an account?
              <Link to="/login" className="link link-primary"> Login here</Link>
            </p>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="https://i.pinimg.com/736x/d4/d9/41/d4d941c5e08d6545c11d6e32ef5afc63.jpg"
            alt="Register Illustration"
            className="w-full h-[35rem] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
