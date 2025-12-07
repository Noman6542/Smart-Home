import React from 'react';

const Service = () => {
  return (
     <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">Popular Decoration Services</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card */}
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://i.ibb.co/Z6ddW7W/wedding.jpg"
              className="rounded-lg mb-4"
              alt=""
            />
            <h3 className="text-xl font-semibold">Wedding Decoration</h3>
            <p className="text-gray-600">Premium event & stage decoration.</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://i.ibb.co/1bLnc6r/home-deco.jpg"
              className="rounded-lg mb-4"
              alt=""
            />
            <h3 className="text-xl font-semibold">Home Decoration</h3>
            <p className="text-gray-600">Interior styling & festival decoration.</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://i.ibb.co/2FJtKmm/flower.jpg"
              className="rounded-lg mb-4"
              alt=""
            />
            <h3 className="text-xl font-semibold">Floral Decoration</h3>
            <p className="text-gray-600">Beautiful flower arrangements.</p>
          </div>
        </div>
      </section>
  );
};

export default Service;