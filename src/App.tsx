import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCart from './components/FloatingCart';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Cart from './components/Cart';
import OrderModal from './components/OrderModal';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </main>
          <Footer />

          {/* Плавающая кнопка — теперь может открыть корзину через проп */}
          <FloatingCart onOpenCart={() => setIsCartOpen(true)} />

          {/* Cart управляется на уровне App */}
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onOrderComplete={() => {
              // Закрываем корзину и открываем модал успешно созданного заказа
              setIsCartOpen(false);
              setShowOrderModal(true);
            }}
          />

          {/* Заказный модал рендерим на уровне App (не внутри Cart) */}
          {showOrderModal && (
            <OrderModal
              onClose={() => setShowOrderModal(false)}
            />
          )}
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
