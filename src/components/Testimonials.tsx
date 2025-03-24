import  { Star } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'asssuoman',
      role: 'Tech Enthusiast',
      content: 'Amazing selection of electronics! I found exactly what I was looking for at a great price. The shipping was quick and everything arrived in perfect condition.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2,
      name: 'jonathan',
      role: 'Fashion Blogger',
      content: 'The clothing quality is exceptional. I appreciate the attention to detail and the customer service team was very helpful when I needed to exchange an item.',
      rating: 4,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 3,
      name: 'bizz',
      role: 'Regular Customer',
      content: 'Been shopping here for years and never disappointed. The website is easy to navigate and the rewards program is a great bonus for loyal customers.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80'
    }
  ];
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star 
                    key={index} 
                    className={`w-4 h-4 ${index < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
 