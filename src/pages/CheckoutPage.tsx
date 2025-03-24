import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check, ChevronRight, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { addOrder } from '../data/orders';
import { Address } from '../types';

function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to cart if cart is empty
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login', { state: { from: { pathname: '/checkout' } } });
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!user) return;
      
      // Create new order
      addOrder({
        userId: user.id,
        items: cart,
        total: totalPrice + (totalPrice * 0.07), // Including tax
        status: 'pending',
        shippingAddress,
        paymentMethod
      });
      
      // Clear cart
      clearCart();
      
      // Redirect to confirmation page
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="flex items-center mb-6">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary-100' : 'bg-gray-100'}`}>
                {currentStep > 1 ? <Check className="w-5 h-5" /> : <span>1</span>}
              </div>
              <span className="ml-2 text-sm font-medium">Shipping</span>
            </div>
            
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            
            <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary-100' : 'bg-gray-100'}`}>
                {currentStep > 2 ? <Check className="w-5 h-5" /> : <span>2</span>}
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
            
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            
            <div className={`flex items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary-100' : 'bg-gray-100'}`}>
                <span>3</span>
              </div>
              <span className="ml-2 text-sm font-medium">Review</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
                  
                  <form onSubmit={handleShippingSubmit}>
                    <div className="mb-4">
                      <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName"
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="streetAddress" className="block text-gray-700 font-medium mb-2">Street Address</label>
                      <input 
                        type="text" 
                        id="streetAddress"
                        value={shippingAddress.streetAddress}
                        onChange={(e) => setShippingAddress({...shippingAddress, streetAddress: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                        <input 
                          type="text" 
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-gray-700 font-medium mb-2">State/Province</label>
                        <input 
                          type="text" 
                          id="state"
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">ZIP/Postal Code</label>
                        <input 
                          type="text" 
                          id="zipCode"
                          value={shippingAddress.zipCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country</label>
                        <select 
                          id="country"
                          value={shippingAddress.country}
                          onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Japan">Japan</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button type="submit" className="btn btn-primary">
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                  
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <input 
                          type="radio" 
                          id="credit_card" 
                          name="paymentMethod"
                          value="credit_card"
                          checked={paymentMethod === 'credit_card'}
                          onChange={() => setPaymentMethod('credit_card')}
                          className="mr-2"
                        />
                        <label htmlFor="credit_card" className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                          <span>Credit / Debit Card</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <input 
                          type="radio" 
                          id="paypal" 
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="mr-2"
                        />
                        <label htmlFor="paypal" className="flex items-center">
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9.112 7.896H6.917c-0.137 0-0.254 0.1-0.276 0.234L5.327 17.16c-0.016 0.098 0.016 0.196 0.083 0.269 0.068 0.073 0.163 0.115 0.262 0.115h1.286c0.137 0 0.254-0.1 0.276-0.234l0.437-2.77c0.021-0.135 0.138-0.234 0.275-0.234h0.699c1.318 0 2.08-0.638 2.281-1.901 0.091-0.569 0.003-1.026-0.256-1.339-0.282-0.343-0.782-0.522-1.558-0.522zM9.549 10.009c-0.11 0.722-0.662 0.722-1.196 0.722H7.995l0.21-1.33c0.013-0.081 0.081-0.139 0.163-0.139h0.158c0.364 0 0.707 0 0.883 0.207C9.511 9.607 9.585 9.77 9.549 10.009z"></path>
                            <path d="M15.872 7.881h-1.287c-0.082 0-0.15 0.058-0.163 0.139l-0.958 6.082-0.042-0.021c0 0-0.003 0.011-0.01 0.033-0.073 0.176-0.232 0.474-0.56 0.746-0.326 0.271-0.756 0.413-1.288 0.413H9.619l-0.602 3.833c-0.016 0.098 0.016 0.196 0.083 0.269 0.068 0.073 0.163 0.115 0.262 0.115h1.273c0.137 0 0.254-0.1 0.276-0.234l0.398-2.529c0.021-0.135 0.137-0.234 0.275-0.234h0.7c1.318 0 2.079-0.638 2.28-1.901 0.09-0.569 0.004-1.026-0.256-1.339 0.261-0.333 0.407-0.75 0.448-1.255 0.071-0.866-0.468-1.626-1.884-1.626h0.009 0.001z"></path>
                          </svg>
                          <span>PayPal</span>
                        </label>
                      </div>
                    </div>
                    
                    {paymentMethod === 'credit_card' && (
                      <div className="space-y-4 border border-gray-200 rounded-lg p-4 mb-6">
                        <div>
                          <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">Card Number</label>
                          <input 
                            type="text" 
                            id="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
                          <input 
                            type="text" 
                            id="cardName"
                            value={cardDetails.cardName}
                            onChange={(e) => setCardDetails({...cardDetails, cardName: e.target.value})}
                            placeholder="John Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                            <input 
                              type="text" 
                              id="expiryDate"
                              value={cardDetails.expiryDate}
                              onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">CVV</label>
                            <input 
                              type="text" 
                              id="cvv"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                              placeholder="123"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-sm">
                          <Lock className="w-4 h-4 mr-1" />
                          <span>Your payment details are secured with SSL encryption</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(1)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Back to Shipping
                      </button>
                      
                      <button type="submit" className="btn btn-primary">
                        Continue to Review
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    {/* Shipping Information Summary */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">Shipping Information</h3>
                        <button 
                          onClick={() => setCurrentStep(1)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-medium">{shippingAddress.fullName}</p>
                        <p>{shippingAddress.streetAddress}</p>
                        <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                        <p>{shippingAddress.country}</p>
                      </div>
                    </div>
                    
                    {/* Payment Method Summary */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">Payment Method</h3>
                        <button 
                          onClick={() => setCurrentStep(2)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 flex items-center">
                        {paymentMethod === 'credit_card' ? (
                          <>
                            <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                            <span>Credit Card ending in {cardDetails.cardNumber.slice(-4)}</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9.112 7.896H6.917c-0.137 0-0.254 0.1-0.276 0.234L5.327 17.16c-0.016 0.098 0.016 0.196 0.083 0.269 0.068 0.073 0.163 0.115 0.262 0.115h1.286c0.137 0 0.254-0.1 0.276-0.234l0.437-2.77c0.021-0.135 0.138-0.234 0.275-0.234h0.699c1.318 0 2.08-0.638 2.281-1.901 0.091-0.569 0.003-1.026-0.256-1.339-0.282-0.343-0.782-0.522-1.558-0.522zM9.549 10.009c-0.11 0.722-0.662 0.722-1.196 0.722H7.995l0.21-1.33c0.013-0.081 0.081-0.139 0.163-0.139h0.158c0.364 0 0.707 0 0.883 0.207C9.511 9.607 9.585 9.77 9.549 10.009z"></path>
                              <path d="M15.872 7.881h-1.287c-0.082 0-0.15 0.058-0.163 0.139l-0.958 6.082-0.042-0.021c0 0-0.003 0.011-0.01 0.033-0.073 0.176-0.232 0.474-0.56 0.746-0.326 0.271-0.756 0.413-1.288 0.413H9.619l-0.602 3.833c-0.016 0.098 0.016 0.196 0.083 0.269 0.068 0.073 0.163 0.115 0.262 0.115h1.273c0.137 0 0.254-0.1 0.276-0.234l0.398-2.529c0.021-0.135 0.137-0.234 0.275-0.234h0.7c1.318 0 2.079-0.638 2.28-1.901 0.09-0.569 0.004-1.026-0.256-1.339 0.261-0.333 0.407-0.75 0.448-1.255 0.071-0.866-0.468-1.626-1.884-1.626h0.009 0.001z"></path>
                            </svg>
                            <span>PayPal</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Items Summary */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Items ({cart.length})</h3>
                      <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                        {cart.map(item => {
                          const { product, quantity } = item;
                          const itemPrice = product.discount 
                            ? product.price * (1 - product.discount / 100) 
                            : product.price;
                          
                          return (
                            <div key={product.id} className="p-3 flex items-center">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="ml-4 flex-grow">
                                <p className="font-medium">{product.name}</p>
                                <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${(itemPrice * quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <button 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="w-full btn btn-primary py-3 flex items-center justify-center"
                      >
                        {isProcessing ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing Order...
                          </span>
                        ) : (
                          <span>Place Order</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                
                <div className="mt-6 flex items-center text-gray-600 text-sm">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
  