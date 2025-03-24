import  { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Users, ShoppingCart, BarChart, Settings, Menu, X } from 'lucide-react';

function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <BarChart className="w-5 h-5" /> },
    { name: 'Products', path: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden px-4 py-3 border-b">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-between w-full"
        >
          <span className="text-lg font-semibold">Admin Menu</span>
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Sidebar content */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 lg:pt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 hidden lg:block">Admin Panel</h2>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-800 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={`${isActive(item.path) ? 'text-primary-600' : 'text-gray-500'} mr-3`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
  