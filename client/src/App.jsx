import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './layouts/AdminLayout';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const Guide = lazy(() => import('./pages/Guide'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Account = lazy(() => import('./pages/Account'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Orders = lazy(() => import('./pages/Orders'));
const Payment = lazy(() => import('./pages/Payment'));
const PlantDetail = lazy(() => import('./pages/PlantDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Settings = lazy(() => import('./pages/Settings'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const FAQ = lazy(() => import('./pages/FAQ'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManagePlants = lazy(() => import('./pages/admin/ManagePlants'));
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const ManageOrders = lazy(() => import('./pages/admin/ManageOrders'));
const ManageTax = lazy(() => import('./pages/admin/ManageTax'));

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full py-12 space-y-4">
    <div className="relative flex items-center justify-center">
      <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <div className="absolute w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-primary font-bold text-[9px]">GT</span>
      </div>
    </div>
    <div className="space-y-1 text-center animate-pulse">
      <p className="font-heading font-extrabold text-sm text-base-content/85 tracking-wider uppercase">Loading Greenhouse</p>
      <p className="text-xs text-base-content/55">Cultivating your specimen profiles...</p>
    </div>
  </div>
);

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
      '/admin/tax': 'GST Settings — GreenThumb Control',
      '/privacy': 'Privacy Policy — GreenThumb Nursery',
      '/terms': 'Terms & Conditions — GreenThumb Nursery',
      '/faq': 'FAQ & Support — GreenThumb Nursery',
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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/faq" element={<FAQ />} />
            
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
                <Route path="tax" element={<ManageTax />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
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
