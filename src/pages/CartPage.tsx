import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash, ShoppingCart, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products/all" className="btn btn-primary inline-flex items-center">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
            </div>
            <ul>
              {cart.map(item => {
                const { product, quantity } = item;
                const itemPrice = product.discount 
                  ? product.price * (1 - product.discount / 100) 
                  : product.price;
                
                return (
                  <li key={product.id} className="p-6 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-grow">
                        <Link 
                          to={`/product/${product.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors"
                        >
                          {product.name}
                        </Link>
                        <div className="flex items-center mt-1">
                          <span className="text-primary-600 font-medium">${itemPrice.toFixed(2)}</span>
                          {product.discount && (
                            <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="flex border border-gray-300 rounded">
                          <button 
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-3 py-1 border-r border-gray-300"
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            min="1" 
                            value={quantity} 
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center py-1 focus:outline-none"
                          />
                          <button 
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-3 py-1 border-l border-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(product.id)}
                          className="ml-4 text-gray-500 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className="mt-6">
            <Link to="/products/all" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900 font-medium">${(totalPrice * 0.07).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${(totalPrice + (totalPrice * 0.07)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="btn btn-primary w-full mt-6 py-3 flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              
              <p className="text-gray-600 text-sm text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
 