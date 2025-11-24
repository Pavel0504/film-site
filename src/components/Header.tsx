import { Film, Send, MessageCircle, Youtube, Menu, X } from 'lucide-react';
import { useState } from 'react';
import CartIcon from './CartIcon';
import Cart from './Cart';

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#2d2d2d] text-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-[#ff6347] p-2 rounded">
                <Film className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">FILMS HDD</span>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#about" className="hover:text-[#ff6347] transition-colors">О нас</a>
              <a href="#delivery" className="hover:text-[#ff6347] transition-colors">Доставка</a>
              <a href="#quality" className="hover:text-[#ff6347] transition-colors">Качество</a>
            </nav>

            <div className="hidden lg:flex items-center space-x-6">
              <a href="tel:+79629423057" className="text-xl font-semibold hover:text-[#ff6347] transition-colors">
                +7 962 942 30 57
              </a>
              <div className="flex items-center space-x-3">
                <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all">
                  <Send className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all">
                  <Youtube className="w-5 h-5" />
                </a>
                <CartIcon onClick={() => setIsCartOpen(true)} />
              </div>
            </div>

            <div className="flex lg:hidden items-center space-x-3">
              <CartIcon onClick={() => setIsCartOpen(true)} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#333333] border-t border-gray-600">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#about" className="hover:text-[#ff6347] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                О нас
              </a>
              <a href="#delivery" className="hover:text-[#ff6347] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Доставка
              </a>
              <a href="#quality" className="hover:text-[#ff6347] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Качество
              </a>
              <a href="tel:+79629423057" className="text-lg font-semibold hover:text-[#ff6347] transition-colors py-2">
                +7 962 942 30 57
              </a>
              <div className="flex items-center space-x-3 py-2">
                <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all">
                  <Send className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Header;
