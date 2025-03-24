import  { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

function OrderConfirmationPage() {
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random order number
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
            <p className="text-gray-600 mb-6">Your order has been received and is being processed</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Package className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-lg font-semibold">Order #{orderNumber}</span>
              </div>
              <p className="text-gray-600 text-sm">
                A confirmation email has been sent to your email address
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                You can track your order status in the "My Orders" section of your account.
              </p>
              <p className="text-gray-700">
                If you have any questions about your order, please contact our customer service team.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
              <Link to="/orders" className="btn btn-primary flex items-center justify-center">
                View My Orders
              </Link>
              <Link to="/" className="btn btn-outline flex items-center justify-center">
                Continue Shopping
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
  