import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const { category = 'all' } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let filteredProducts = getProductsByCategory(category);

    switch (sortBy) {
      case 'price-low':
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setProducts(filteredProducts);
  }, [category, sortBy]);

  const categoryTitle = 
    category === 'all' ? 'All Products' : 
    category === 'electronics' ? 'Electronics' :
    category === 'clothing' ? 'Clothing' :
    category === 'accessories' ? 'Accessories' : 
    'Products';

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb and Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{categoryTitle}</h1>
        <p className="text-gray-600 mt-1">Browse our collection of {categoryTitle.toLowerCase()}</p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="btn btn-outline flex items-center sm:w-auto w-full justify-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className="sm:w-auto w-full">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox rounded text-primary-600" />
                  <span className="ml-2 text-gray-700">Under $50</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox rounded text-primary-600" />
                  <span className="ml-2 text-gray-700">$50 - $100</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox rounded text-primary-600" />
                  <span className="ml-2 text-gray-700">$100 - $200</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox rounded text-primary-600" />
                  <span className="ml-2 text-gray-700">Over $200</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Rating</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox rounded text-primary-600" />
                  <span className="ml-2 text-gray-700">4 Stars & Above</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox rounded text-primary-600" />
                  <span className="ml-2 text-gray-700">3 Stars & Above</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Availability</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox rounded text-primary-600" />
                  <span className="ml-2 text-gray-700">In Stock</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox rounded text-primary-600" />
                  <span className="ml-2 text-gray-700">On Sale</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
 