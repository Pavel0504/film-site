import { useState } from 'react';

function CustomDisc() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-gray-800">
            Создайте свой уникальный диск
          </h2>

          <p className="text-center text-base md:text-xl text-gray-600 mb-8 md:mb-12">
            Если вам не подошел никакой из наших готовых дисков, вы можете<br />
            записать часть одной и другой коллекции на один диск
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ваш E-mail"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#ff6347] transition-colors text-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-lg text-gray-700 mb-2">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше полное имя"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#ff6347] transition-colors text-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="comments" className="block text-lg text-gray-700 mb-2">
                Комментарии
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={6}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#ff6347] transition-colors text-lg resize-none"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#ff6347] hover:bg-[#ff4529] text-white font-semibold py-4 px-16 rounded text-lg transition-all transform hover:scale-105"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CustomDisc;
