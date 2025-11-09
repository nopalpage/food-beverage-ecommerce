import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

// Extended product data
const allProducts = [
  {
    id: 1,
    name: "Gourmet Beef Burger",
    description: "Premium beef patty with fresh vegetables and special sauce on a brioche bun",
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
  },
  {
    id: 9,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan and caesar dressing",
    price: 9.99,
    image: "https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/731df5933c28aa41247e9a435d947f6ed3e6accb.jpg",
    category: "Food",
    rating: 4.2,
    reviews: 56,
    stock: 14,
    tags: ["Salad", "Healthy", "Fresh"]
  },
  {
    id: 10,
    name: "Fruit Smoothie Bowl",
    description: "Acai bowl topped with fresh fruits and granola",
    price: 7.99,
    image: "https://kimi-web-img.moonshot.cn/img/cdn.shopify.com/32cc10228d1105e142afbaab69b4b8f71c197fbb.jpg",
    category: "Beverages",
    rating: 4.6,
    reviews: 84,
    stock: 16,
    tags: ["Fruits", "Healthy", "Bowl"]
  },
  {
    id: 11,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and fresh basil",
    price: 13.99,
    image: "https://kimi-web-img.moonshot.cn/img/www.cucinabyelena.com/4e37fd657252d2fb100ec64223e7c1e749b23633.jpg",
    category: "Food",
    rating: 4.4,
    reviews: 112,
    stock: 11,
    tags: ["Pizza", "Italian", "Vegetarian"]
  },
  {
    id: 12,
    name: "Taco Platter",
    description: "Three soft tacos with your choice of filling",
    price: 11.99,
    image: "https://kimi-web-img.moonshot.cn/img/cdnimg.webstaurantstore.com/5ca9e2b555da3a76a4c865a5a15fe973d7a13055.jpg",
    category: "Food",
    rating: 4.5,
    reviews: 93,
    stock: 19,
    tags: ["Mexican", "Spicy", "Street Food"]
  }
];

export default function Products() {
  const [products, setProducts] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);

  const categories = ['All', 'Food', 'Beverages', 'Desserts'];

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

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

  return (
    <Layout title="Products - Food & Beverage Store">
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">
              Our Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our wide selection of premium food and beverages
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FiFilter className="w-5 h-5 mr-2" />
                Filters
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-6 mt-6">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Price:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    min="0"
                    max="50"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700 mb-2 block">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <span className="text-sm font-medium text-gray-700 mb-2 block">Price Range:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    min="0"
                    max="50"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold">{products.length}</span> products
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse our categories
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setPriceRange([0, 50]);
                }}
                className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}