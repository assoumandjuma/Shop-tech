import  { Order } from '../types';

export const orders: Order[] = [
  {
    id: 1,
    userId: 2,
    items: [
      {
        product: {
          id: 1,
          name: "Premium Gaming Processor",
          price: 329.99,
          category: "electronics",
          image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBzaG93Y2FzZXxlbnwwfHx8fDE3NDI4NDcyNjJ8MA&ixlib=rb-4.0.3",
          description: "High-performance processor designed for gaming and content creation with 8 cores and 16 threads.",
          stock: 25,
          rating: 4.8
        },
        quantity: 1
      },
      {
        product: {
          id: 3,
          name: "Wireless Earbuds",
          price: 129.99,
          category: "electronics",
          image: "https://images.unsplash.com/photo-1603694681044-e71c5993d6cd?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBzaG93Y2FzZXxlbnwwfHx8fDE3NDI4NDcyNjJ8MA&ixlib=rb-4.0.3",
          description: "Premium wireless earbuds with noise cancellation and immersive sound quality.",
          discount: 15,
          stock: 18,
          rating: 4.7
        },
        quantity: 2
      }
    ],
    total: 499.47,
    status: 'delivered',
    date: '2023-12-10T14:23:11',
    shippingAddress: {
      fullName: 'Test User',
      streetAddress: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
      country: 'Test Country'
    },
    paymentMethod: 'credit_card'
  },
  {
    id: 2,
    userId: 2,
    items: [
      {
        product: {
          id: 4,
          name: "Men's Casual T-Shirt",
          price: 24.99,
          category: "clothing",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
          description: "Comfortable cotton t-shirt with modern fit and durable quality.",
          stock: 120,
          rating: 4.2
        },
        quantity: 3
      }
    ],
    total: 74.97,
    status: 'shipped',
    date: '2024-01-15T10:11:22',
    shippingAddress: {
      fullName: 'Test User',
      streetAddress: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
      country: 'Test Country'
    },
    paymentMethod: 'paypal'
  },
  {
    id: 3,
    userId: 1,
    items: [
      {
        product: {
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
        quantity: 1
      }
    ],
    total: 179.99,
    status: 'pending',
    date: '2024-01-20T15:30:45',
    shippingAddress: {
      fullName: 'Admin User',
      streetAddress: '456 Admin St',
      city: 'Admin City',
      state: 'Admin State',
      zipCode: '54321',
      country: 'Admin Country'
    },
    paymentMethod: 'credit_card'
  }
];

export const getOrdersByUserId = (userId: number): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getAllOrders = (): Order[] => {
  return orders;
};

export const getOrderById = (id: number): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const addOrder = (order: Omit<Order, 'id' | 'date'>): Order => {
  const newOrder: Order = {
    ...order,
    id: orders.length + 1,
    date: new Date().toISOString()
  };
  
  orders.push(newOrder);
  return newOrder;
};

export const updateOrderStatus = (id: number, status: Order['status']): boolean => {
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    return true;
  }
  return false;
};
  