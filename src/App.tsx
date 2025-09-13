import { useState } from 'react';
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import PlanWorkspace from "./components/PlanWorkspace";
import ResearchPage from "./components/ResearchPage";
import OperatePage from "./components/OperatePage";
import BenchmarkPage from "./components/BenchmarkPage";
import DocumentPage from "./components/DocumentPage";
import DefendPage from "./components/DefendPage";
import RepositoryPage from "./components/RepositoryPage";
import LoginPage from "./components/LoginPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import ErrorResolutionPage from "./components/ErrorResolutionPage";

// Types for cart items
export interface CartItem {
  id: number;
  type: 'agreement' | 'analysis' | 'document';
  title: string;
  description: string;
  metadata?: any;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartAnimationTrigger, setCartAnimationTrigger] = useState(0);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard'); // Reset to dashboard when logging out
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      // Check if item already exists in cart
      const existingItem = prev.find(cartItem => cartItem.id === item.id && cartItem.type === item.type);
      if (existingItem) {
        return prev; // Don't add duplicates
      }
      // Trigger cart animation
      setCartAnimationTrigger(prev => prev + 1);
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId: number, itemType: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === itemId && item.type === itemType)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-white flex flex-col relative">
      <Toaster position="top-right" />
      <div className="relative z-50">
        <Header 
          currentPage={currentPage} 
          onNavigate={handleNavigation}
          cartItems={cartItems}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
          onLogout={handleLogout}
          cartAnimationTrigger={cartAnimationTrigger}
        />
      </div>
      {/* Main content area */}
      <div className={`flex-1 relative z-10 ${
        currentPage === 'dashboard' || currentPage === 'benchmark' || currentPage === 'error-resolution' || currentPage === 'checkout'
          ? 'overflow-auto' 
          : 'overflow-hidden'
      }`}>
        {currentPage === 'dashboard' ? (
          <Dashboard onNavigate={handleNavigation} />
        ) : currentPage === 'plan' ? (
          <PlanWorkspace onAddToCart={addToCart} />
        ) : currentPage === 'research' ? (
          <ResearchPage />
        ) : currentPage === 'operate' ? (
          <OperatePage />
        ) : currentPage === 'benchmark' ? (
          <BenchmarkPage onAddToCart={addToCart} />
        ) : currentPage === 'document' ? (
          <DocumentPage />
        ) : currentPage === 'defend' ? (
          <DefendPage />
        ) : currentPage === 'repository' ? (
          <RepositoryPage />
        ) : currentPage === 'cart' ? (
          <CartPage 
            cartItems={cartItems}
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
            onNavigate={handleNavigation}
          />
        ) : currentPage === 'checkout' ? (
          <CheckoutPage 
            cartItems={cartItems}
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
            onNavigate={handleNavigation}
          />
        ) : currentPage === 'error-resolution' ? (
          <ErrorResolutionPage />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}