import  { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white">
      <div className="container-custom py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ish pop & Fashion For Everyone
            </h1>
            <p className="text-lg text-primary-100 mb-8">
              Discover premium electronics, stylish clothing, and more with free shipping and amazing deals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products/electronics" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Shop Electronics
              </Link>
              <Link to="/products/all" className="btn border border-white text-white hover:bg-primary-800 flex items-center">
                View All Products <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1591799265444-d66432b91588?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBzaG93Y2FzZXxlbnwwfHx8fDE3NDI4NDcyNjJ8MA&ixlib=rb-4.0.3"
              alt="Featured electronics"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white opacity-10"></div>
    </div>
  );
}

export default Hero;
 