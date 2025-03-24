import  { useState } from 'react';
import { Mail } from 'lucide-react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // In a real app, you would send this to your backend
    }
  };

  return (
    <section className="py-12 bg-primary-900 text-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-primary-100 mb-6">Get the latest updates, deals and exclusive offers directly to your inbox.</p>
          
          {subscribed ? (
            <div className="bg-primary-800 p-4 rounded-lg">
              <p className="font-medium">Thank you for subscribing!</p>
              <p className="text-sm text-primary-200 mt-1">You'll receive our next newsletter soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow py-3 px-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button type="submit" className="btn bg-white text-primary-700 hover:bg-gray-100 py-3">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
 