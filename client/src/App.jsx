import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Category from './pages/Category';
import Guide from './pages/Guide';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import PlantDetail from './pages/PlantDetail';
import Cart from './pages/Cart';
import Settings from './pages/Settings';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePlants from './pages/admin/ManagePlants';
import ManageUsers from './pages/admin/ManageUsers';
import ManageOrders from './pages/admin/ManageOrders';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const routeTitles = {
      '/': 'Home — GreenThumb Nursery',
      '/category': 'Shop Category — GreenThumb Nursery',
      '/guide': 'Care Guide — GreenThumb Nursery',
      '/about': 'About Us — GreenThumb Nursery',
      '/contact': 'Contact Us — GreenThumb Nursery',
      '/login': 'Sign In — GreenThumb Nursery',
      '/register': 'Register — GreenThumb Nursery',
      '/cart': 'Shopping Cart — GreenThumb Nursery',
      '/account': 'My Profile — GreenThumb Nursery',
      '/wishlist': 'My Wishlist — GreenThumb Nursery',
      '/checkout': 'Checkout Details — GreenThumb Nursery',
      '/orders': 'My Orders — GreenThumb Nursery',
      '/payment': 'Payment Verification — GreenThumb Nursery',
      '/settings': 'Account Settings — GreenThumb Nursery',
      '/admin/dashboard': 'Admin Dashboard — GreenThumb Control',
      '/admin/plants': 'Manage Plants — GreenThumb Control',
      '/admin/users': 'Manage Users — GreenThumb Control',
      '/admin/orders': 'Manage Orders — GreenThumb Control',
    };

    const path = location.pathname;
    let title = 'GreenThumb Nursery — Premium Plant Boutique';
    
    if (routeTitles[path]) {
      title = routeTitles[path];
    } else if (path.startsWith('/plant/')) {
      title = 'Specimen Details — GreenThumb Nursery';
    }
    
    document.title = title;
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Private Routes */}
          <Route path='/' element={<PrivateRoute/>}>
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/plant/:id" element={<PlantDetail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="plants" element={<ManagePlants />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="orders" element={<ManageOrders />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </CartProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
