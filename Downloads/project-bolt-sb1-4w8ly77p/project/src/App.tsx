import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CareGuidePage from './pages/CareGuidePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';
import WishlistPage from './pages/WishlistPage';
import PlantDetailPage from './pages/PlantDetailPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    if (page !== 'plant-detail') {
      setSelectedPlantId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlantSelect = (plantId: string) => {
    setSelectedPlantId(plantId);
    setCurrentPage('plant-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} onPlantSelect={handlePlantSelect} />;
      case 'categories':
        return <CategoriesPage onPlantSelect={handlePlantSelect} />;
      case 'care-guide':
        return <CareGuidePage />;
      case 'about':
        return <AboutPage onPageChange={handlePageChange} />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onPageChange={handlePageChange} />;
      case 'register':
        return <RegisterPage onPageChange={handlePageChange} />;
      case 'cart':
        return <CartPage onPageChange={handlePageChange} />;
      case 'dashboard':
        return <DashboardPage onPageChange={handlePageChange} />;
      case 'wishlist':
        return <WishlistPage onPageChange={handlePageChange} onPlantSelect={handlePlantSelect} />;
      case 'plant-detail':
        return selectedPlantId ? (
          <PlantDetailPage plantId={selectedPlantId} onPageChange={handlePageChange} onPlantSelect={handlePlantSelect} />
        ) : (
          <HomePage onPageChange={handlePageChange} onPlantSelect={handlePlantSelect} />
        );
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Header currentPage={currentPage} onPageChange={handlePageChange} />
          <main>
            {renderCurrentPage()}
          </main>
          <Footer onPageChange={handlePageChange} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;