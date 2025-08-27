import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Welcome back to Your Green Paradise. Access your account to manage your plants and orders.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <LoginForm />
          <div className="text-center p-4">
            <p>Don't have an account? <Link to="/register" className="link link-primary">Register here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
