import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Upload, Plus, X } from 'lucide-react';
import { addProduct } from '../../data/products';

interface CategoryOption {
  value: string;
  label: string;
}

function AdminProductNewPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    stock: '',
    featured: false,
    discount: ''
  });
  
  const categoryOptions: CategoryOption[] = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'accessories', label: 'Accessories' }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setProduct(prev => ({
      ...prev,
      [name]: newValue
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate product data
      if (!product.name || !product.price || !product.category || !product.description || !product.image || !product.stock) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }
      
      // Simulate API call to save product
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save product to the products array using the addProduct function
      const newProduct = addProduct({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        stock: product.stock,
        featured: product.featured,
        discount: product.discount || undefined
      });
      
      console.log('New product added:', newProduct);
      
      // Redirect to products page
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/admin/products')}
            className="mr-4 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={product.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={product.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      min="0"
                      max="100"
                      value={product.discount}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      min="0"
                      value={product.stock}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={product.featured}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    Feature this product on the homepage
                  </label>
                </div>
              </div>
              
              {/* Right Column - Product Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image <span className="text-red-500">*</span>
                </label>
                
                {product.image ? (
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt="Product preview" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setProduct(prev => ({ ...prev, image: '' }))}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors hover:border-primary-500">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">
                        Drag and drop an image, or
                      </p>
                      <div className="mt-2">
                        <label
                          htmlFor="file-upload"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Select a file
                        </label>
                      </div>
                      <input 
                        id="file-upload" 
                        type="file" 
                        className="sr-only" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // For demo purposes only, in a real app you would upload to your server/cloud storage
                            // Here we create a temporary URL to show a preview
                            const imageUrl = URL.createObjectURL(file);
                            setProduct(prev => ({ ...prev, image: imageUrl }));
                          }
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
                
                <div className="mt-2">
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Or enter image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Sample Product Images</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMGFkbWluJTIwaW50ZXJmYWNlfGVufDB8fHx8MTc0Mjg0ODgzN3ww&ixlib=rb-4.0.3&fit=fillmax&h=500&w=800",
                      "https://images.unsplash.com/photo-1503602642458-232111445657?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMGFkbWluJTIwaW50ZXJmYWNlfGVufDB8fHx8MTc0Mjg0ODgzN3ww&ixlib=rb-4.0.3&fit=fillmax&h=500&w=800",
                      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMGFkbWluJTIwaW50ZXJmYWNlfGVufDB8fHx8MTc0Mjg0ODgzN3ww&ixlib=rb-4.0.3&fit=fillmax&h=500&w=800"
                    ].map((url, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setProduct(prev => ({ ...prev, image: url }))}
                        className="relative rounded-md overflow-hidden h-16 border-2 hover:border-primary-500 focus:outline-none focus:border-primary-500"
                      >
                        <img src={url} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary py-2 flex items-center"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              <span className="flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Create Product
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductNewPage;
 