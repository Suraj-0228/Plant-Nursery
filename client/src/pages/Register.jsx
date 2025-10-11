import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = 'Full name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.com')) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6 || formData.password.length > 12) {
      newErrors.password = 'Password must be between 6 and 12 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

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
      setErrors({ form: err.message });
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
            <div className="form-control w-full">
                <input type="text" name="fullname" placeholder="Enter Your Full Name" className={`input input-bordered rounded-xl w-full px-5 ${errors.fullname ? 'input-error' : ''}`} onChange={handleChange} />
                {errors.fullname && <span className="text-red-500 text-xs mt-1 ml-2">{errors.fullname}</span>}
            </div>
            <div className="form-control w-full">
                <input type="text" name="username" placeholder="Enter Your Username" className={`input input-bordered rounded-xl w-full px-5 ${errors.username ? 'input-error' : ''}`} onChange={handleChange} />
                {errors.username && <span className="text-red-500 text-xs mt-1 ml-2">{errors.username}</span>}
            </div>
            <div className="form-control w-full">
                <input type="email" name="email" placeholder="Enter Your Email" className={`input input-bordered rounded-xl w-full px-5 ${errors.email ? 'input-error' : ''}`} onChange={handleChange} />
                {errors.email && <span className="text-red-500 text-xs mt-1 ml-2">{errors.email}</span>}
            </div>
            <div className="form-control w-full">
                <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter Password" className={`input input-bordered rounded-xl w-full px-5 ${errors.password ? 'input-error' : ''}`} onChange={handleChange} />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
                {errors.password && <span className="text-red-500 text-xs mt-1 ml-2">{errors.password}</span>}
            </div>
            <div className="form-control w-full">
                <div className="relative">
                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Enter Confirm Password" className={`input input-bordered rounded-xl w-full px-5 ${errors.confirmPassword ? 'input-error' : ''}`} onChange={handleChange} />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
                {errors.confirmPassword && <span className="text-red-500 text-xs mt-1 ml-2">{errors.confirmPassword}</span>}
            </div>
            {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}
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