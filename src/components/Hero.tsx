import { ChevronDown } from 'lucide-react';

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://optim.tildacdn.com/tild6530-6661-4933-a131-636130613365/-/format/webp/noise-istockphoto-11.jpg.webp)',
          filter: 'brightness(0.6)'
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          Жесткие диски<br />с фильмами
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-4">
          Домашняя коллекция без подписок, реклам и интернета всегда у вас на диске!
        </p>
        <p className="text-base md:text-lg lg:text-xl mb-8">
          Берите с собой и смотрите где угодно.
        </p>

        <button className="bg-[#ff6347] hover:bg-[#ff4529] text-white font-semibold py-3 px-8 md:py-4 md:px-12 rounded text-base md:text-lg transition-all transform hover:scale-105 mb-12">
          Не подходит готовая коллекция?
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-10 h-10 md:w-12 md:h-12" />
      </div>
    </section>
  );
}

export default Hero;
