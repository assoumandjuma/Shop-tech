import  { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="container-custom py-16 text-center">
      <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary inline-flex items-center px-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
 