import  { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { User, Package, CreditCard, LogOut, Edit, Settings, ShoppingCart, Eye, MapPin, Trash, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUserId } from '../data/orders';
import EditProfileModal from '../components/EditProfileModal';

function UserDashboardPage() {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  useEffect(() => {
    // Check if we have a state with activeTab (from navigation)
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const userOrders = getOrdersByUserId(user.id);

  // Mock user profile data
  const userProfile = {
    name: user.name,
    email: user.email,
    phone: user.phone || '+1 (555) 123-4567',
    defaultShippingAddress: {
      fullName: user.name,
      streetAddress: '123 Main Street',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'United States'
    },
    defaultPaymentMethod: {
      cardType: 'Visa',
      lastFour: '4242',
      expiryDate: '12/25'
    },
    avatar: user.avatar || (user.id === 1 
      ? 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500'
      : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500')
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile: any) => {
    updateUserProfile(updatedProfile);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 text-center border-b border-gray-100">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name} 
                    className="rounded-full object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500";
                    }}
                  />
                  <button 
                    onClick={handleOpenEditProfile}
                    className="absolute bottom-0 right-0 bg-primary-500 text-white p-1 rounded-full hover:bg-primary-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                <p className="text-gray-500 text-sm">{userProfile.email}</p>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 'profile' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <User className="w-5 h-5 mr-3" />
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 'orders' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Orders
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('addresses')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 'addresses' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <MapPin className="w-5 h-5 mr-3" />
                      Addresses
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('payment')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 'payment' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mr-3" />
                      Payment Methods
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 'settings' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      Account Settings
                    </button>
                  </li>
                  <li className="pt-2 mt-2 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Profile Information</h3>
                    <button 
                      onClick={handleOpenEditProfile} 
                      className="btn btn-outline flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-gray-500 text-sm mb-1">Full Name</h4>
                      <p className="font-medium">{userProfile.name}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-500 text-sm mb-1">Email</h4>
                      <p className="font-medium">{userProfile.email}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-500 text-sm mb-1">Phone</h4>
                      <p className="font-medium">{userProfile.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-500 text-sm mb-1">Account Type</h4>
                      <p className="font-medium capitalize">{user.role}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          defaultChecked
                        />
                        <label htmlFor="emailNotifications" className="ml-2 text-gray-700">
                          Email notifications for order updates
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newsletter"
                          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          defaultChecked
                        />
                        <label htmlFor="newsletter" className="ml-2 text-gray-700">
                          Subscribe to newsletter
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="specialOffers"
                          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          defaultChecked
                        />
                        <label htmlFor="specialOffers" className="ml-2 text-gray-700">
                          Receive special offers and promotions
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">My Orders</h3>
                    <Link to="/products/all" className="btn btn-outline flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </div>
                  
                  {userOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap font-medium">
                                #{order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                {new Date(order.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap font-medium">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="text-primary-600 hover:text-primary-800 mr-3">
                                  <Eye className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h4>
                      <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                      <Link to="/products/all" className="btn btn-primary">
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">My Addresses</h3>
                    <button className="btn btn-outline flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Address
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-medium mb-2">Default Shipping Address</h4>
                      <p className="text-gray-600">{userProfile.defaultShippingAddress.fullName}</p>
                      <p className="text-gray-600">{userProfile.defaultShippingAddress.streetAddress}</p>
                      <p className="text-gray-600">
                        {userProfile.defaultShippingAddress.city}, {userProfile.defaultShippingAddress.state} {userProfile.defaultShippingAddress.zipCode}
                      </p>
                      <p className="text-gray-600">{userProfile.defaultShippingAddress.country}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Payment Methods</h3>
                    <button className="btn btn-outline flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Card
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-start">
                        <CreditCard className="w-10 h-10 text-primary-600 mr-4" />
                        <div>
                          <h4 className="font-medium mb-1">{userProfile.defaultPaymentMethod.cardType} ending in {userProfile.defaultPaymentMethod.lastFour}</h4>
                          <p className="text-gray-600 text-sm">Expires: {userProfile.defaultPaymentMethod.expiryDate}</p>
                          <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded mt-2 inline-block">Default</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Change Password</h4>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Update Password
                        </button>
                      </form>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-medium mb-4 text-red-600">Danger Zone</h4>
                      <button className="btn border border-red-300 text-red-600 hover:bg-red-50">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        onSave={handleSaveProfile}
        profileData={{
          name: userProfile.name,
          email: userProfile.email,
          phone: userProfile.phone,
          avatar: userProfile.avatar
        }}
      />
    </div>
  );
}

export default UserDashboardPage;
 