import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import OrderModal from './OrderModal';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

// Вспомогательный компонент для изображения товара
function ProductImage({ src, alt }: { src?: string; alt?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    // Заглушка (можно заменить на svg/иконку)
    return (
      <div className="w-16 h-16 bg-gray-200 rounded mr-4 flex-shrink-0 flex items-center justify-center text-gray-400">
        📦
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? 'product'}
      className="w-16 h-16 object-cover rounded mr-4 flex-shrink-0"
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: ''
  });

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;

      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'order',
          data: {
            name: formData.name,
            contact: formData.contact,
            address: formData.address,
            items: items,
            total: total
          }
        })
      });

      setShowOrderModal(true);
      clearCart();
      setFormData({ name: '', contact: '', address: '' });
    } catch (error) {
      console.error('Error submitting order:', error);
      setShowOrderModal(true);
      clearCart();
      setFormData({ name: '', contact: '', address: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-800">Ваш заказ:</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">Корзина пуста</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div className="flex items-center flex-1">
                        <ProductImage src={item.image} alt={item.title} />
                        <div className="flex-1">
                          <h3 className="font-normal text-gray-800 mb-2">{item.title}</h3>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-normal">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 ml-4">
                        <span className="font-normal text-gray-800 text-lg">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} р.
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-right text-lg text-gray-800 mb-6">
                    Сумма: <span className="font-semibold">{total.toLocaleString('ru-RU')} р.</span>
                  </p>
                </div>

                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder=""
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Контакт
                      <span className="block text-xs text-gray-500">(email, телефон, мессенджеры)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="vash-email@mail.ru, 8-905-111-22-33"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Адрес доставки
                      <span className="block text-xs text-gray-500">не обязательно</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder=""
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>

                  <div className="pt-4">
                    <p className="text-right text-xl text-gray-800 mb-6">
                      Итоговая сумма: <span className="font-semibold">{total.toLocaleString('ru-RU')} р.</span>
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black hover:bg-gray-800 text-white font-normal py-4 rounded transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Отправка...' : 'Оформить заказ'}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {showOrderModal && (
        <OrderModal
          onClose={() => {
            setShowOrderModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
}

export default Cart;
