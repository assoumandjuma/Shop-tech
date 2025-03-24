import  { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { id, name, price, image, rating, discount } = product;

  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 ml-1">{rating}</span>
        </div>
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-gray-900 font-medium mb-1 hover:text-primary-600 transition-colors">{name}</h3>
        </Link>
        <div className="flex items-center justify-between mb-3">
          <div>
            {discount ? (
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900">${discountedPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through ml-2">${price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-lg font-semibold text-gray-900">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
        <button 
          onClick={() => addToCart(product)}
          className="w-full btn btn-primary flex items-center justify-center"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
 