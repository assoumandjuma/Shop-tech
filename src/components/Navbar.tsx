import  { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, Globe, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Electronics', path: '/products/electronics' },
    { name: 'Clothing', path: '/products/clothing' },
    { name: 'Accessories', path: '/products/accessories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Globe className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TechTrove</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive(link.path) ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive('/admin') ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cart"
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="p-2 text-gray-700 hover:text-primary-600 transition-colors flex items-center"
                  aria-label="Account"
                >
                  <User size={20} />
                  <span className="ml-2 text-sm font-medium hidden md:inline">{user?.name}</span>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        navigate('/account', { state: { activeTab: 'orders' } });
                      }}
                    >
                      My Orders
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 text-gray-700 hover:text-primary-600 transition-colors hidden md:flex items-center"
              >
                <User size={20} />
                <span className="ml-2 text-sm font-medium">Login</span>
              </Link>
            )}
            
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors md:hidden"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-3 px-4 border-t">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="py-4 px-6 border-t md:hidden">
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block py-1 text-base font-medium transition-colors hover:text-primary-600 ${
                      isActive(link.path) ? 'text-primary-600' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {user?.role === 'admin' && (
                <li>
                  <Link
                    to="/admin"
                    className={`block py-1 text-base font-medium transition-colors hover:text-primary-600 ${
                      isActive('/admin') ? 'text-primary-600' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
              )}
              {!isAuthenticated && (
                <li>
                  <Link
                    to="/login"
                    className={`block py-1 text-base font-medium transition-colors hover:text-primary-600 ${
                      isActive('/login') ? 'text-primary-600' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login / Register
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/account"
                      className={`block py-1 text-base font-medium transition-colors hover:text-primary-600 ${
                        isActive('/account') ? 'text-primary-600' : 'text-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account"
                      className={`block py-1 text-base font-medium transition-colors hover:text-primary-600 ${
                        isActive('/account') ? 'text-primary-600' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/account', { state: { activeTab: 'orders' } });
                      }}
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center py-1 text-base font-medium text-gray-700 hover:text-primary-600"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
 