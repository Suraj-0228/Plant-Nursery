import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">Join our community of plant lovers. Create an account to start your green journey with us.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <RegisterForm />
          <div className="text-center p-4">
            <p>Already have an account? <Link to="/login" className="link link-primary">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
