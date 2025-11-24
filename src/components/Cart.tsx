import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import OrderModal from './OrderModal';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: ''
  });

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOrderModal(true);
    clearCart();
    setFormData({ name: '', contact: '', address: '' });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Корзина</h2>
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
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-semibold text-[#ff6347]">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} р.
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 space-y-4">
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ff6347]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Контакт (email, телефон, мессенджер)
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="+7 XXX XXX XX XX или email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ff6347]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Адрес доставки (не обязательно)
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Москва, ул. Примера, 1"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ff6347]"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-800">Итого:</span>
                    <span className="text-2xl font-bold text-[#ff6347]">
                      {total.toLocaleString('ru-RU')} р.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ff6347] hover:bg-[#ff4529] text-white font-semibold py-3 rounded transition-all"
                  >
                    Оформить заказ
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
