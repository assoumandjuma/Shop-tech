import  { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Gaming Processor",
    price: 329.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBzaG93Y2FzZXxlbnwwfHx8fDE3NDI4NDcyNjJ8MA&ixlib=rb-4.0.3",
    description: "High-performance processor designed for gaming and content creation with 8 cores and 16 threads.",
    featured: true,
    stock: 25,
    rating: 4.8
  },
  {
    id: 2,
    name: "Mechanical Gaming Keyboard",
    price: 89.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBzaG93Y2FzZXxlbnwwfHx8fDE3NDI4NDcyNjJ8MA&ixlib=rb-4.0.3",
    description: "Responsive mechanical keyboard with customizable RGB lighting and programmable keys.",
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 129.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1603694681044-e71c5993d6cd?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBzaG93Y2FzZXxlbnwwfHx8fDE3NDI4NDcyNjJ8MA&ixlib=rb-4.0.3",
    description: "Premium wireless earbuds with noise cancellation and immersive sound quality.",
    featured: true,
    discount: 15,
    stock: 18,
    rating: 4.7
  },
  {
    id: 4,
    name: "Men's Casual T-Shirt",
    price: 24.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description: "Comfortable cotton t-shirt with modern fit and durable quality.",
    stock: 120,
    rating: 4.2
  },
  {
    id: 5, 
    name: "Women's Running Shoes",
    price: 89.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    description: "Lightweight running shoes designed for comfort and performance.",
    featured: true,
    stock: 35,
    rating: 4.6
  },
  {
    id: 6,
    name: "Smart Watch",
    price: 199.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    description: "Feature-packed smartwatch with health tracking and smartphone notifications.",
    discount: 10,
    stock: 22,
    rating: 4.4
  },
  {
    id: 7,
    name: "Leather Backpack",
    price: 79.99, 
    category: "accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    description: "Stylish leather backpack with multiple compartments and durable construction.",
    stock: 15,
    rating: 4.3
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    price: 69.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    description: "Portable Bluetooth speaker with crisp audio and long battery life.",
    featured: true,
    stock: 30,
    rating: 4.5
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getRelatedProducts = (id: number, category: string): Product[] => {
  return products.filter(product => product.category === category && product.id !== id).slice(0, 4);
};

// Function to add a new product to the store
export const addProduct = (product: Omit<Product, 'id' | 'rating'>): Product => {
  // Generate a new ID for the product (in a real app, this would be handled by the backend)
  const newId = Math.max(...products.map(p => p.id)) + 1;
  
  // Create a new product with default rating 
  const newProduct: Product = {
    ...product,
    id: newId,
    price: parseFloat(product.price as unknown as string), // Convert from form string if needed
    stock: parseInt(product.stock as unknown as string), // Convert from form string if needed
    discount: product.discount ? parseFloat(product.discount as unknown as string) : undefined, // Convert from form string if needed
    rating: 5.0 // Default rating for new products
  };
  
  // Add the product to the products array
  products.push(newProduct);
  
  return newProduct;
};

// Function to update an existing product
export const updateProduct = (id: number, updatedProduct: Partial<Product>): Product | undefined => {
  const index = products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...updatedProduct
    };
    return products[index];
  }
  
  return undefined;
};

// Function to delete a product
export const deleteProduct = (id: number): boolean => {
  const index = products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    products.splice(index, 1);
    return true;
  }
  
  return false;
};
 