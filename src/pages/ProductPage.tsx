import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Товар не найден</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-[#ff6347] hover:bg-[#ff4529] text-white font-semibold py-2 px-6 rounded"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: `${product.title} ${product.storage}`,
      price: product.price,
      quantity: 1
    });
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white border-b sticky top-[72px] z-30">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#ff6347] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Назад к каталогу</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 lg:p-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
            {product.title} - Список фильмов
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            <div className="md:col-span-1">
              <div className="sticky top-32">
                <div
                  className="w-full h-64 md:h-96 bg-cover bg-center rounded-lg shadow-md mb-6"
                  style={{
                    backgroundImage: `url(${product.image})`,
                  }}
                />

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Объем:</span>
                    <span className="font-bold text-lg">{product.storage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Цена:</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-[#ff6347]">
                        {product.price.toLocaleString('ru-RU')} р.
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.oldPrice.toLocaleString('ru-RU')} р.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#ff6347] hover:bg-[#ff4529] text-white font-semibold py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-md"
                >
                  Добавить в корзину
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  Фильмы в этой коллекции
                </h2>
                <ul className="space-y-3">
                  {product.films.map((film, index) => (
                    <li
                      key={index}
                      className="text-base md:text-lg text-gray-700 leading-relaxed pl-4 border-l-4 border-[#ff6347] py-2"
                    >
                      {film}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Качество фильмов</h3>
                <p className="text-gray-700">
                  Все фильмы представлены в качестве Full HD с многоканальным звуком 5.1 и 6.1
                  для максимального удовольствия от просмотра.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
