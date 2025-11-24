import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import CustomDisc from '../components/CustomDisc';
import Features from '../components/Features';
import Article from '../components/Article';

function HomePage() {
  const navigate = useNavigate();

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <ProductGrid onProductClick={handleProductClick} />
      <Hero />
      <CustomDisc />
      <Features />
      <Article />
    </>
  );
}

export default HomePage;
