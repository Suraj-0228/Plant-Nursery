import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { Eye, EyeOff, User, Mail, Lock, UserCheck, ChevronRight, Leaf } from 'lucide-react';

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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const { showPopup } = useModal();

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
    } else if (formData.password.length < 6 || formData.password.length > 18) {
      newErrors.password = 'Password must be between 6 and 18 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
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

      showPopup({
        title: 'Account Created!',
        message: 'Your GreenThumb account was successfully registered. Please sign in to verify.',
        type: 'success',
        onConfirm: () => {
          navigate('/login');
        }
      });
    } catch (err) {
      setErrors({ form: err.message });
    }
  };

  return (
    <div className="min-h-screen py-24 flex items-center justify-center bg-base-100 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/15 blur-[120px] pointer-events-none animate-float-delayed"></div>

      <div className="flex flex-col lg:flex-row glass-card rounded-[32px] shadow-2xl max-w-5xl w-full overflow-hidden border border-base-300/40 relative z-10">
        
        {/* Left Side: Form Container */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 bg-base-200/40 flex flex-col justify-center order-2 lg:order-1">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-base-content font-heading">Create Account</h1>
              <p className="text-base-content/75 text-sm">Join the GreenThumb sanctuary and start cultivating your garden.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name Input */}
              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/80 ml-1">Full name</label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Enter your full name"
                    className={`input input-bordered w-full pl-12 pr-5 rounded-2xl glass-input ${errors.fullname ? 'border-error' : ''}`}
                    onChange={handleChange}
                  />
                </div>
                {errors.fullname && <span className="text-error text-sm mt-1 ml-2 font-medium">{errors.fullname}</span>}
              </div>

              {/* Username Input */}
              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/80 ml-1">Username</label>
                <div className="relative mt-2">
                  <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    className={`input input-bordered w-full pl-12 pr-5 rounded-2xl glass-input ${errors.username ? 'border-error' : ''}`}
                    onChange={handleChange}
                  />
                </div>
                {errors.username && <span className="text-error text-sm mt-1 ml-2 font-medium">{errors.username}</span>}
              </div>

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
                <label className="text-sm font-semibold text-base-content/80 ml-1">Password</label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a password"
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

              {/* Confirm Password Input */}
              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/80 ml-1">Confirm password</label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={`input input-bordered w-full pl-12 pr-12 rounded-2xl glass-input ${errors.confirmPassword ? 'border-error' : ''}`}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="text-error text-sm mt-1 ml-2 font-medium">{errors.confirmPassword}</span>}
              </div>

              {/* Terms Checkbox */}
              <div className="form-control w-full">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    className={`checkbox checkbox-primary rounded-lg ${errors.agreeTerms ? 'border-error' : ''}`} 
                    checked={agreeTerms} 
                    onChange={() => setAgreeTerms(!agreeTerms)} 
                  />
                  <span className="text-sm text-base-content/75 leading-tight">
                    I agree to the <a href="#" className="text-primary hover:text-accent font-semibold underline">Terms & Conditions</a> and privacy policies.
                  </span>
                </label>
                {errors.agreeTerms && <span className="text-error text-sm mt-1 ml-2 font-medium">{errors.agreeTerms}</span>}
              </div>

              {errors.form && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-2xl text-center">
                  <p className="text-error text-sm font-semibold">{errors.form}</p>
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full h-12 rounded-2xl btn-premium text-sm font-semibold shadow-md flex items-center justify-center gap-2 mt-4">
                Sign Up <ChevronRight className="h-4 w-4" />
              </button>

              {/* Login Link */}
              <p className="text-sm text-center text-base-content/70">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-accent font-semibold transition-colors">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side: Editorial Banner */}
        <div className="hidden lg:block lg:w-1/2 relative min-h-[300px] lg:min-h-full order-1 lg:order-2 bg-[#0a1510]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75 z-10"></div>
          <img
            src="https://i.pinimg.com/736x/d4/d9/41/d4d941c5e08d6545c11d6e32ef5afc63.jpg"
            alt="Beautiful garden setup with flowers"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between text-white">
            <Link to="/" className="flex items-center gap-2 text-white">
              <Leaf className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold tracking-wider font-heading">GREENTHUMB</span>
            </Link>
            <div className="space-y-4">
              <p className="text-accent font-semibold tracking-wider text-sm uppercase">Join Us Today</p>
              <h2 className="text-4xl font-bold font-heading leading-tight max-w-sm">Grow your own plant sanctuary.</h2>
              <p className="text-white/80 text-sm max-w-xs">Gain exclusive guides, select custom notifications, and access our premium online catalog of nature's best creations.</p>
            </div>
            <p className="text-white/60 text-sm">&copy; {new Date().getFullYear()} GreenThumb Nursery</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;