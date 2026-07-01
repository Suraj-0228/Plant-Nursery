import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { Eye, EyeOff, Lock, Mail, ChevronRight, Leaf } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showPopup } = useModal();

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

      showPopup({
        title: 'Sign In Successful',
        message: `Welcome back to GreenThumb, ${data.username}!`,
        type: 'success',
        onConfirm: () => {
          login(data);
          if (data.isAdmin) {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }
      });

    } catch (err) {
      setErrors({ form: err.message });
    }
  };

  return (
    <div className="min-h-screen py-24 flex items-center justify-center bg-base-100 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/15 blur-[120px] pointer-events-none animate-float-delayed"></div>

      <div className="flex flex-col lg:flex-row glass-card rounded-[32px] shadow-2xl max-w-5xl w-full overflow-hidden border border-base-300/40 relative z-10">
        
        {/* Left Side: Editorial Banner */}
        <div className="hidden lg:block lg:w-1/2 relative min-h-[300px] lg:min-h-full bg-[#0a1510]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75 z-10"></div>
          <img
            src="https://i.pinimg.com/736x/38/d6/0f/38d60f4512bb70144cda861a22f42c70.jpg"
            alt="Interior room decorated with beautiful premium plants"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between text-white">
            <Link to="/" className="flex items-center gap-2 text-white">
              <Leaf className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold tracking-wider font-heading">GREENTHUMB</span>
            </Link>
            <div className="space-y-4">
              <p className="text-accent font-semibold tracking-wider text-sm uppercase">Curated Greenery</p>
              <h2 className="text-4xl font-bold font-heading leading-tight max-w-sm">Bring nature into your modern sanctuary.</h2>
              <p className="text-white/80 text-sm max-w-xs">Explore our premium selection of plants grown with care and delivered directly to your doorstep.</p>
            </div>
            <p className="text-white/60 text-sm">&copy; {new Date().getFullYear()} GreenThumb Nursery</p>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 bg-base-200/40 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-base-content font-heading">Welcome back</h1>
              <p className="text-base-content/75 text-sm">Enter your credentials to access your nursery dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/80 ml-1">Email address</label>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className={`input input-bordered w-full pl-12 pr-5 rounded-2xl glass-input ${errors.email ? 'border-error' : ''}`}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="text-error text-sm mt-1 ml-2 font-medium">{errors.email}</span>}
              </div>

              {/* Password Input */}
              <div className="form-control w-full space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-base-content/80">Password</label>
                  <a href="#" className="text-sm text-primary hover:text-accent font-medium transition-colors">Forgot?</a>
                </div>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    className={`input input-bordered w-full pl-12 pr-12 rounded-2xl glass-input ${errors.password ? 'border-error' : ''}`}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <span className="text-error text-sm mt-1 ml-2 font-medium">{errors.password}</span>}
              </div>


              {errors.form && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-2xl text-center">
                  <p className="text-error text-sm font-semibold">{errors.form}</p>
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full h-12 rounded-2xl btn-premium text-sm font-semibold shadow-md flex items-center justify-center gap-2">
                Sign In <ChevronRight className="h-4 w-4" />
              </button>

              {/* Register Link */}
              <p className="text-sm text-center text-base-content/70">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:text-accent font-semibold transition-colors">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
