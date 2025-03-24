import  { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface UserWithAvatar extends User {
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: UserWithAvatar | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updatedProfile: Partial<UserWithAvatar>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: UserWithAvatar[] = [
  {
    id: 1,
    email: 'admin@techtrove.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    email: 'user@example.com',
    name: 'Test User',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500',
    phone: '+1 (555) 987-6543'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithAvatar | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('techtrove_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you would make an API call to authenticate
    // For demonstration, we're using mock data
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && password === 'password') { // Simple password check
        setUser(foundUser);
        setIsAuthenticated(true);
        localStorage.setItem('techtrove_user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, you would make an API call to register
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if email already exists
      const emailExists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        return false;
      }
      
      // Create new user with default avatar
      const newUser: UserWithAvatar = {
        id: mockUsers.length + 1,
        email,
        name,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500',
        phone: '+1 (555) 000-0000'
      };
      
      // In a real app, would save to database
      mockUsers.push(newUser);
      
      // Auto login after registration
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('techtrove_user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateUserProfile = (updatedProfile: Partial<UserWithAvatar>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedProfile };
      
      // Update both the current state and local storage
      setUser(updatedUser);
      localStorage.setItem('techtrove_user', JSON.stringify(updatedUser));
      
      // Also update the mockUsers array (in real app, would update database)
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedProfile };
      }
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('techtrove_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout, 
      updateUserProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
 