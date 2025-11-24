import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartIconProps {
  onClick: () => void;
}

function CartIcon({ onClick }: CartIconProps) {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
    >
      <ShoppingCart className="w-6 h-6 text-white" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#ff6347] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

export default CartIcon;
