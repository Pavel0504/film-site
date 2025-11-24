import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ImageSection from './components/ImageSection';
import CustomDisc from './components/CustomDisc';
import Features from './components/Features';
import Article from './components/Article';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <ProductGrid />
        <Hero />
        <CustomDisc />
        <Features />
        <Article />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
