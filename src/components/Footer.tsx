import { Send, MessageCircle, Youtube, Mail, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#2d2d2d] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="bg-white bg-opacity-10 p-3 rounded-full hover:bg-opacity-20 transition-all hover:scale-110"
              aria-label="Telegram"
            >
              <Send className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="bg-white bg-opacity-10 p-3 rounded-full hover:bg-opacity-20 transition-all hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="bg-white bg-opacity-10 p-3 rounded-full hover:bg-opacity-20 transition-all hover:scale-110"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center">
            <a
              href="tel:+79629423057"
              className="flex items-center space-x-2 hover:text-[#ff6347] transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg font-semibold">+7 962 942 30 57</span>
            </a>
            <a
              href="mailto:info@filmshdd.ru"
              className="flex items-center space-x-2 hover:text-[#ff6347] transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>info@filmshdd.ru</span>
            </a>
          </div>

          <div className="border-t border-gray-600 w-full max-w-2xl pt-6 mt-6">
            <p className="text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} FILMS HDD. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
