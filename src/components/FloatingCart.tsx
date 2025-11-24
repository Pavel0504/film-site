// src/components/FloatingCart.tsx
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

interface FloatingCartProps {
  onOpenCart?: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ onOpenCart }) => {
  const { items } = useCart();
  const [localOpen, setLocalOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  useEffect(() => {
    console.log('[FloatingCart] items:', items);
    console.log('[FloatingCart] count:', count);
  }, [items, count]);

  useEffect(() => {
    // Диагностика: сколько таких кнопок в DOM и где они находятся
    if (typeof document === 'undefined') return;

    const list = document.querySelectorAll('[aria-label="Открыть корзину"]');
    console.log('[FloatingCart] number of buttons in DOM:', list.length);
    list.forEach((el, i) => {
      console.log(`[FloatingCart] button[${i}] parent:`, el.parentElement?.tagName, el.parentElement);
    });

    // если есть реф на кнопку — принудительно установим стили с !important и залогируем computedStyle
    const btn = btnRef.current;
    if (!btn) return;

    // Принудительно выставляем свойства (включая важность)
    try {
      btn.style.setProperty('position', 'fixed', 'important');
      btn.style.setProperty('top', '100px', 'important');
      btn.style.setProperty('right', '16px', 'important');
      btn.style.setProperty('bottom', 'auto', 'important');
      btn.style.setProperty('z-index', '2147483647', 'important'); // максимально высокий
      btn.style.setProperty('width', '56px', 'important');
      btn.style.setProperty('height', '56px', 'important');
      btn.style.setProperty('display', 'flex', 'important');
      btn.style.setProperty('align-items', 'center', 'important');
      btn.style.setProperty('justify-content', 'center', 'important');
    } catch (e) {
      console.warn('[FloatingCart] failed to set important styles', e);
    }

    const cs = window.getComputedStyle(btn);
    console.log('[FloatingCart] computed style:', {
      position: cs.position,
      top: cs.top,
      right: cs.right,
      bottom: cs.bottom,
      zIndex: cs.zIndex,
      display: cs.display,
      visibility: cs.visibility,
      opacity: cs.opacity,
    });

    console.log('[FloatingCart] getBoundingClientRect:', btn.getBoundingClientRect());
  }, [btnRef.current, count]); // eslint-disable-line

  if (typeof document === 'undefined') return null;
  if (count === 0) return null;

  const handleOpen = () => {
    if (onOpenCart) onOpenCart();
    else setLocalOpen(true);
  };

  const node = (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        aria-label="Открыть корзину"
        // оставляем классы, но ключевые стили принудительно выставляются в useEffect
        className="bg-[#ff6347] hover:bg-[#ff4529] text-white rounded-full shadow-2xl transition-transform transform hover:scale-110 relative"
        // базовые inline-стили (на случай, если setProperty не сработает)
        style={{ width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ShoppingCart className="w-6 h-6" />
        <span
          className="absolute -top-2 -right-2 bg-white text-[#ff6347] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-[#ff6347]"
          style={{ lineHeight: 1 }}
        >
          {count}
        </span>
      </button>

      {!onOpenCart && (
        <Cart
          isOpen={localOpen}
          onClose={() => setLocalOpen(false)}
          onOrderComplete={() => {
            setLocalOpen(false);
          }}
        />
      )}
    </>
  );

  return createPortal(node, document.body);
};

export default FloatingCart;
