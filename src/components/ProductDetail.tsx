import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: `${product.title} ${product.storage}`,
      price: product.price,
      quantity: 1
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center pt-4 md:pt-8">
        <div className="bg-white w-full max-w-4xl mx-4 rounded-lg shadow-2xl">
          <div className="sticky top-0 bg-white border-b flex items-center justify-between p-4 md:p-6 rounded-t-lg">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
              {product.title} - Список
            </h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
              <div className="md:col-span-1">
                <div
                  className="w-full h-64 md:h-96 bg-cover bg-center rounded-lg sticky top-20"
                  style={{
                    backgroundImage: `url(${product.image})`,
                  }}
                />
              </div>

              <div className="md:col-span-2">
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  Картинка располагается на этом месте
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#ff6347] hover:bg-[#ff4529] text-white font-semibold py-3 md:py-4 rounded-lg text-base md:text-lg transition-all"
                  >
                    Купить
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-800 font-semibold py-3 md:py-4 rounded-lg text-base md:text-lg hover:bg-gray-50 transition-all">
                    Закрыть
                  </button>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                    В этой коллекции
                  </h2>
                  <ul className="text-sm md:text-base text-gray-700 space-y-2">
                    {product.films.map((film, index) => (
                      <li key={index} className="leading-relaxed">
                        {film}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
