import React from 'react';

const Header = () => {
  return (
    <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between ">
      
      {/* Left Side Content */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Smart Home & Ceremony Decoration  
          <span className="text-primary block">Book Your Service Easily</span>
        </h1>

        <p className="text-gray-600 text-lg">
          Professional decorators ready to transform your home, events, and ceremonies with premium design & on-site service.
        </p>

        <button className="btn btn-primary px-6">
          Book Decoration Service
        </button>
      </div>

      {/* Right Side Image */}
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img
          src="https://i.ibb.co.com/99B4gMSZ/images-q-tbn-ANd9-Gc-T314-DEj3-Vy-OMa9wwa-JRc-ML6ox-Yywkdgp-P7-Q-s.jpg"
          alt="Decoration"
          className="rounded-xl shadow-lg w-full"
        />
      </div>

    </section>
  );
};

export default Header;
