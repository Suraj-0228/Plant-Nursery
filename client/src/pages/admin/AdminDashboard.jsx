import React, { useState, useEffect } from 'react';
import { Sprout, Users, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [plantCount, setPlantCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const fetchPlantCount = async () => {
    const res = await fetch('/api/plants');
    const data = await res.json();
    setPlantCount(data.length);
  };

  const fetchUserCount = async () => {
    const res = await fetch('/api/auth');
    const data = await res.json();
    setUserCount(data.length);
  };

  useEffect(() => {
    fetchPlantCount();
    fetchUserCount();
  }, []);

  return (
    <div className="p-6 bg-base-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Total Plants</h2>
              <Sprout className="w-12 h-12" />
            </div>
            <p className="text-5xl font-bold">{plantCount}</p>
            <p className="text-sm">21% more than last month</p>
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Total Users</h2>
              <Users className="w-12 h-12" />
            </div>
            <p className="text-5xl font-bold">{userCount}</p>
            <p className="text-sm">10% more than last month</p>
          </div>
        </div>
        <div className="card bg-accent text-accent-content">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Total Revenue</h2>
              <DollarSign className="w-12 h-12" />
            </div>
            <p className="text-5xl font-bold">₹12,000</p>
            <p className="text-sm">15% more than last month</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Welcome, Admin!</h2>
        <p>Here you can manage your plants and users. Use the sidebar to navigate through the different sections.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;