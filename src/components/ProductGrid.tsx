import ProductCard from './ProductCard';
import { products } from '../data/products';

interface ProductGridProps {
  onProductClick?: (id: number) => void;
}

function ProductGrid({ onProductClick }: ProductGridProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 auto-rows-max">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              {...product}
              onCardClick={() => onProductClick?.(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
