import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Typed from 'typed.js';
import { FiArrowRight } from 'react-icons/fi';

export default function HeroSection() {
  const typedRef = useRef(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          'Delicious Food',
          'Fresh Beverages', 
          'Gourmet Meals',
          'Artisan Drinks'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <section className="hero-pattern relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary-100 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-secondary-100 rounded-full opacity-20 animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6">
              Discover Amazing
              <span className="block text-primary-500">
                <span ref={typedRef}></span>
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Experience the finest selection of gourmet food and artisan beverages. 
              From farm-fresh ingredients to expertly crafted drinks, we bring you 
              quality that satisfies your taste buds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link 
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">500+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">10k+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">24/7</div>
                <div className="text-sm text-gray-600">Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 opacity-20"></div>
              
              {/* Featured Product Images */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 h-full">
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src="https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/227a7ffa9ec5109cadcc6d60961e0c9c94966179.jpg"
                    alt="Gourmet Burger"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white font-semibold">Burger</div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src="https://kimi-web-img.moonshot.cn/img/www.allrecipes.com/a486e46e1b5a0fa43c73db716715c1f4bc26259e.jpg"
                    alt="Pasta Carbonara"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white font-semibold">Pasta</div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src="https://kimi-web-img.moonshot.cn/img/www.justonecookbook.com/f02c1516036f837d881609e7814b84d69644d676.jpg"
                    alt="Sushi Rolls"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white font-semibold">Sushi</div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src="https://kimi-web-img.moonshot.cn/img/i.ytimg.com/92b0658ec582ce86d852e8f174cf257f9148a938.jpg"
                    alt="Chocolate Dessert"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white font-semibold">Dessert</div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-primary-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg animate-bounce-soft">
              Fresh & Tasty!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}