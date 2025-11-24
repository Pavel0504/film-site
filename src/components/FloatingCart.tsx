import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

function FloatingCart() {
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (count === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed right-4 top-24 z-40 bg-[#ff6347] hover:bg-[#ff4529] text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 animate-fade-in"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-white text-[#ff6347] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-[#ff6347]">
          {count}
        </span>
      </button>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default FloatingCart;
