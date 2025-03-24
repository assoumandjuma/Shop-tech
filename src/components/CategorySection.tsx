import  { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function CategorySection() {
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Latest gadgets and tech',
      image: 'https://images.unsplash.com/photo-1591799265444-d66432b91588?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBzaG93Y2FzZXxlbnwwfHx8fDE3NDI4NDcyNjJ8MA&ixlib=rb-4.0.3'
    },
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Fashionable apparel',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Complete your style',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              to={`/products/${category.id}`}
              key={category.id}
              className="group relative overflow-hidden rounded-lg shadow-md"
            >
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity z-10"></div>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <div className="flex items-center text-white">
                  <span>{category.description}</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
 