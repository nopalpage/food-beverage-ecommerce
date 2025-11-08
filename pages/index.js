import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';

// Mock product data
const featuredProducts = [
  {
    id: 1,
    name: "Gourmet Beef Burger",
    description: "Premium beef patty with fresh vegetables and special sauce",
    price: 12.99,
    originalPrice: 16.99,
    image: "https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/227a7ffa9ec5109cadcc6d60961e0c9c94966179.jpg",
    category: "Food",
    rating: 4.5,
    reviews: 128,
    stock: 15,
    tags: ["Beef", "Fresh", "Premium"]
  },
  {
    id: 2,
    name: "Artisan Coffee Latte",
    description: "Rich espresso with steamed milk and beautiful latte art",
    price: 4.99,
    image: "https://kimi-web-img.moonshot.cn/img/freshjuicebar.com/8bdd7088fc85c3973026cc92e9db10b0b91b785d.png",
    category: "Beverages",
    rating: 4.8,
    reviews: 89,
    stock: 25,
    tags: ["Coffee", "Hot", "Artisan"]
  },
  {
    id: 3,
    name: "Italian Pasta Carbonara",
    description: "Traditional Roman pasta with eggs, cheese, and pancetta",
    price: 14.99,
    image: "https://kimi-web-img.moonshot.cn/img/www.allrecipes.com/a486e46e1b5a0fa43c73db716715c1f4bc26259e.jpg",
    category: "Food",
    rating: 4.7,
    reviews: 156,
    stock: 12,
    tags: ["Italian", "Pasta", "Traditional"]
  },
  {
    id: 4,
    name: "Fresh Sushi Rolls",
    description: "Assorted sushi rolls with fresh fish and vegetables",
    price: 18.99,
    image: "https://kimi-web-img.moonshot.cn/img/www.justonecookbook.com/f02c1516036f837d881609e7814b84d69644d676.jpg",
    category: "Food",
    rating: 4.9,
    reviews: 203,
    stock: 8,
    tags: ["Japanese", "Fresh", "Healthy"]
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 8.99,
    image: "https://kimi-web-img.moonshot.cn/img/i.ytimg.com/92b0658ec582ce86d852e8f174cf257f9148a938.jpg",
    category: "Desserts",
    rating: 4.6,
    reviews: 92,
    stock: 20,
    tags: ["Chocolate", "Warm", "Dessert"]
  },
  {
    id: 6,
    name: "Craft Beer Selection",
    description: "Premium craft beer with unique flavors and aromas",
    price: 6.99,
    image: "https://kimi-web-img.moonshot.cn/img/www.fullcirclebrew.co.uk/c254c1c4429205a2b7a32b3b1d55c6e3afcbe12b.jpg",
    category: "Beverages",
    rating: 4.4,
    reviews: 67,
    stock: 30,
    tags: ["Beer", "Craft", "Alcoholic"]
  },
  {
    id: 7,
    name: "Grilled Chicken Sandwich",
    description: "Juicy grilled chicken with fresh vegetables and aioli",
    price: 10.99,
    image: "https://kimi-web-img.moonshot.cn/img/www.farmerboys.com/68d432f5d5252bdd7b78943ed17cbddc567d163e.jpg",
    category: "Food",
    rating: 4.3,
    reviews: 78,
    stock: 18,
    tags: ["Chicken", "Grilled", "Healthy"]
  },
  {
    id: 8,
    name: "Bubble Tea Special",
    description: "Refreshing bubble tea with tapioca pearls and milk",
    price: 5.99,
    image: "https://kimi-web-img.moonshot.cn/img/www.chinasichuanfood.com/3efb5c77b4f83abcb77fb7f80e7e2f58ebaf1aba.webp",
    category: "Beverages",
    rating: 4.5,
    reviews: 145,
    stock: 22,
    tags: ["Tea", "Bubble", "Refreshing"]
  }
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // Show success message
    showToast('Added to cart!', 'success');
  };

  const showToast = (message, type) => {
    const event = new CustomEvent('showToast', {
      detail: { message, type }
    });
    window.dispatchEvent(event);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Food & Beverage Store - Premium Quality Food Delivery">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of delicious food and refreshing beverages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Food', icon: '🍔', count: 150, color: 'bg-red-100 text-red-600' },
              { name: 'Beverages', icon: '🥤', count: 80, color: 'bg-blue-100 text-blue-600' },
              { name: 'Snacks', icon: '🍿', count: 120, color: 'bg-yellow-100 text-yellow-600' },
              { name: 'Desserts', icon: '🍰', count: 90, color: 'bg-pink-100 text-pink-600' }
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our most popular and delicious items
            </p>
          </div>

          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-300"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to providing the best food and beverage experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiTrendingUp className="w-8 h-8" />,
                title: 'Quality Products',
                description: 'We source only the finest ingredients and products from trusted suppliers around the world.'
              },
              {
                icon: <FiClock className="w-8 h-8" />,
                title: 'Fast Delivery',
                description: 'Get your favorite food and beverages delivered to your doorstep in 30 minutes or less.'
              },
              {
                icon: <FiAward className="w-8 h-8" />,
                title: 'Best Prices',
                description: 'Enjoy competitive prices on all our products with regular discounts and special offers.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-500 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive offers, new product updates, and more!
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="px-6 py-3 bg-secondary-500 text-white font-semibold rounded-r-lg hover:bg-secondary-600 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}