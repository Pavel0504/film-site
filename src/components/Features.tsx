function Features() {
  return (
    <section className="py-12 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-800">
          Лучшие фильмы на жестком диске
        </h2>
        <p className="text-center text-base md:text-xl text-gray-600 mb-8 md:mb-16">
          Все коллекции собраны по рейтингу сайтов<br />
          Кинопоиск и IMDB - лучшие фильмы планеты!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Качество фильмов - Full HD</h3>
            <p className="text-gray-600 leading-relaxed">
              Все фильмы в коллекциях представлены в лучшем качестве для просмотра на телевизорах,
              домашних кинотеатрах и мониторах. Звук у большинства фильмов (кроме "стареньких",
              у которых изначально не было такого) - 5.1 и 6.1
            </p>
          </div>

          <div className="text-center">
            <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Доставка</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              По Москве и области - СДЕК или курьер, возможна так же доставка яндекс такси.
              Стоимость доставки курьером по Москве - 1000 р.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              В любой город России или регион - СДЕК или Почта России
            </p>
            <p className="text-gray-600 leading-relaxed">
              В Беларусь - СДЕК
            </p>
          </div>

          <div className="text-center">
            <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Гарантия</h3>
            <p className="text-gray-600 leading-relaxed">
              Гарантия на жесткий диск - стандартная, 1 или 2 года. Гарантия записи -
              если вы случайно сотрете фильмы, перезапишем то же самое - бесплатно!
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-bold">Жесткий диск подходит</span> для ноутбука, телевизора,
            медиаплеера с USB, так же у нас есть недорогой{' '}
            <span className="font-bold">переходник для подключения телефона</span>, планшета с Type-C входом
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
