import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import { products } from '../data/products';

function ProductGrid() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const selectedProduct = products.find(p => p.id === selectedProductId);

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onClose={() => setSelectedProductId(null)} />;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 auto-rows-max">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              {...product}
              onCardClick={() => setSelectedProductId(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
