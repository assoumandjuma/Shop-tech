import  { Globe, Users, Shield, Truck } from 'lucide-react';

function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About TechTrove</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Your trusted destination for premium electronics, fashion, and accessories since 2010.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                TechTrove was founded in 2010 with a simple mission: to provide high-quality electronics and fashion items at fair prices with exceptional customer service.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small online store has grown into a trusted marketplace serving thousands of customers worldwide. We take pride in curating only the best products that meet our strict quality standards.
              </p>
              <p className="text-gray-700">
                Our team of experts carefully selects each item in our inventory, ensuring that we offer products that we would use ourselves. We believe in building long-term relationships with our customers based on trust and satisfaction.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80" 
                alt="Our team working" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality and only stock products that meet our high standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do, and their satisfaction is our priority.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">
                We build trust through transparent pricing, honest descriptions, and reliable service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600">
                Fast shipping, secure payments, and dependable customer support you can count on.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=800&q=80" 
                alt="CEO" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">Michael Johnson</h3>
                <p className="text-primary-600 mb-2">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Tech enthusiast with 15+ years of experience in retail and e-commerce.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                alt="CTO" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">Sarah Williams</h3>
                <p className="text-primary-600 mb-2">CTO</p>
                <p className="text-gray-600 text-sm">
                  Former Silicon Valley engineer bringing cutting-edge technology to e-commerce.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" 
                alt="Head of Customer Service" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">David Chen</h3>
                <p className="text-primary-600 mb-2">Head of Customer Service</p>
                <p className="text-gray-600 text-sm">
                  Dedicated to ensuring every customer has an exceptional shopping experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
 