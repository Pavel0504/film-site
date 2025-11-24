import { HardDrive } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  oldPrice: number | null;
  image: string;
  storage: string;
  onCardClick?: () => void;
}

function ProductCard({ id, title, price, oldPrice, image, storage, onCardClick }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id,
      title: `${title} ${storage}`,
      price,
      quantity: 1
    });
  };
  return (
    <div onClick={onCardClick} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full cursor-pointer">
      <div className="relative">
        <div
          className="h-48 md:h-80 lg:h-96 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#ff6347] text-white px-2 py-1 md:px-3 md:py-1 rounded flex items-center space-x-1">
            <HardDrive className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold">{storage}</span>
          </div>

          <div className="absolute top-2 left-2 md:top-4 md:left-4 text-white text-xs">
            <div className="flex items-center space-x-1 bg-black/30 rounded px-2 py-1">
              <HardDrive className="w-3 h-3" />
              <span className="hidden md:inline">FILMS HDD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-6 flex flex-col flex-grow">
        <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-4 text-gray-800 line-clamp-3">{title} {storage}</h3>

        <div className="flex items-baseline space-x-1 md:space-x-2 mb-3 md:mb-6 flex-shrink-0">
          <span className="text-lg md:text-3xl font-bold text-[#ff6347]">{price.toLocaleString('ru-RU')} р.</span>
          {oldPrice && (
            <span className="text-xs md:text-lg text-gray-400 line-through">{oldPrice.toLocaleString('ru-RU')} р.</span>
          )}
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCardClick?.();
            }}
            className="flex-1 border-2 border-gray-800 text-gray-800 font-semibold py-2 md:py-3 rounded text-xs md:text-base hover:bg-gray-800 hover:text-white transition-all"
          >
            СПИСОК
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#ff6347] hover:bg-[#ff4529] text-white font-semibold py-2 md:py-3 rounded text-xs md:text-base transition-all"
          >
            КУПИТЬ
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
