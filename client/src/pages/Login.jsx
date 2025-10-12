import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.com')) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6 || formData.password.length > 18) {
      newErrors.password = 'Password must be between 6 and 18 characters';
    }

    if (!rememberMe) {
        newErrors.rememberMe = 'You must agree to the terms';
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
      if (data.isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }

    } catch (err) {
      setErrors({ form: err.message });
    }
  };

  return (
    <div className="py-20 flex items-center justify-center bg-base-200">
      <div className="flex flex-col md:flex-row rounded-xl shadow-2xl max-w-4xl overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-[35rem] md:h-[30rem]">
          <img
            src="https://i.pinimg.com/736x/38/d6/0f/38d60f4512bb70144cda861a22f42c70.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full py-15 md:w-[35rem] md:h-[30rem] p-8 bg-base-100">
          <h1 className="text-4xl font-bold text-center mb-2">Welcome Back!</h1>
          <h1 className="text-center mb-8">Login to your account.</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control w-full">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className={`input input-bordered rounded-xl w-full px-5 ${errors.email ? 'input-error' : ''}`}
                    onChange={handleChange}
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 ml-2">{errors.email}</span>}
            </div>
            <div className="form-control w-full">
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter Password"
                        className={`input input-bordered rounded-xl w-full px-5 ${errors.password ? 'input-error' : ''}`}
                        onChange={handleChange}
                    />
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
                <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={`checkbox checkbox-primary ${errors.rememberMe ? 'checkbox-error' : ''}`} checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                        <span>Remember me</span>
                    </label>
                    <a href="#" className="link link-hover text-primary">Forgot password?</a>
                </div>
                {errors.rememberMe && <span className="text-red-500 text-xs mt-1 ml-2">{errors.rememberMe}</span>}
            </div>
            {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}
            <button type="submit" className="btn btn-primary w-full">Login</button>
            <p className="text-sm text-center">
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
