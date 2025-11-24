import { CheckCircle, X } from 'lucide-react';

interface OrderModalProps {
  onClose: () => void;
}

function OrderModal({ onClose }: OrderModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Ваш заказ успешно создан!
        </h2>

        <p className="text-gray-600 text-lg mb-8">
          С вами свяжутся для дальнейшего оформления
        </p>

        <button
          onClick={onClose}
          className="w-full bg-[#ff6347] hover:bg-[#ff4529] text-white font-semibold py-3 rounded transition-all"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default OrderModal;
