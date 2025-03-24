import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ChevronRight, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(getRelatedProducts(productId, foundProduct.category));
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <p>Product not found.</p>
        <Link to="/products/all" className="text-primary-600 hover:underline mt-4 inline-block">
          <ArrowLeft className="inline mr-1 w-4 h-4" /> Back to all products
        </Link>
      </div>
    );
  }

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
        <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
        <Link to={`/products/${product.category}`} className="text-gray-500 hover:text-primary-600 capitalize">
          {product.category}
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star 
                  key={index} 
                  className={`w-5 h-5 ${index < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-gray-600">{product.rating} Rating</span>
          </div>

          <div className="mb-6">
            {product.discount ? (
              <div className="flex items-end">
                <span className="text-3xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
                <span className="text-xl text-gray-500 line-through ml-3">${product.price.toFixed(2)}</span>
                <span className="ml-3 bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">Save {product.discount}%</span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="text-gray-700 mr-3">Quantity:</span>
              <div className="flex border border-gray-300 rounded">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 border-r border-gray-300"
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center py-1 focus:outline-none"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-1 border-l border-gray-300"
                >
                  +
                </button>
              </div>
              <span className="ml-4 text-gray-600">{product.stock} in stock</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 py-3 flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button className="btn btn-outline flex-1 py-3">Buy Now</button>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start">
              <Truck className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Free Shipping</p>
                <p className="text-gray-600 text-sm">Free standard shipping on orders over $50</p>
              </div>
            </div>
            <div className="flex items-start">
              <ShieldCheck className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">2-Year Warranty</p>
                <p className="text-gray-600 text-sm">Full coverage for manufacturing defects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
 