import  { Star } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'asssuoman',
      role: 'Tech Enthusiast',
      content: 'Amazing selection of electronics! I found exactly what I was looking for at a great price. The shipping was quick and everything arrived in perfect condition.',
      rating: 5,
      avatar: 'https://scontent.fkgl4-1.fna.fbcdn.net/v/t39.30808-6/480485281_552872321133345_4839359891697153761_n.jpg?stp=c0.67.612.612a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeG5r5EuI_Rd_FktMS4EpYoJbV94FK7asFltX3gUrtqwWTquJ4hCt2m1IdxsWNpdXYstzn7z6lNDRgD-IEbOHYD_&_nc_ohc=ewiLNOkgE_8Q7kNvgG0BD3W&_nc_oc=AdkgBmbjcjCcTYF7cmeSrDcTfcoq4Y8mbD4f8le2fw7Pb0fzkGmaIXENS4JgOuVExrI&_nc_zt=23&_nc_ht=scontent.fkgl4-1.fna&_nc_gid=NotVX_I782mlH8Kc1xdz0A&oh=00_AYGFedsf1aJXLDgCdEhnTt-nyIDCRzHg1BQSef3OExwj8Q&oe=67E79E4D'
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
      avatar: 'https://scontent.fkgl4-1.fna.fbcdn.net/v/t39.30808-6/472225831_122119546700610905_7860624694701213967_n.jpg?stp=c0.185.720.720a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=50c75d&_nc_eui2=AeEksBoxvpl-O5026kEM7c6cAEBDWfZV_0cAQENZ9lX_RxVH9gz_ms3pWgRMVwpTfINJ1Qq6fEfZ7nQuUVqFi3vd&_nc_ohc=1QzYjucPtvwQ7kNvgFLs2EZ&_nc_oc=Adm2eRX2_Lr52EODOZdh8qc2Q0DsSWRv2X9ThXu6380RSAjtvlLRWRJtvs-5YL53Mp0&_nc_zt=23&_nc_ht=scontent.fkgl4-1.fna&_nc_gid=nCc0E5wZObToRuS8KlQcvA&oh=00_AYGB8etAM3MtTsDm59IDI4_iF9YroIi9QCgoU60oFrjj_A&oe=67E7A315'
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
 