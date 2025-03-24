import  { useState } from 'react';
import { Search, MailPlus, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock customer data
  const customers = [
    { id: 1, name: 'Test User', email: 'user@example.com', orders: 2, totalSpent: 574.44, joinDate: '2023-11-15' },
    { id: 2, name: 'Alice Johnson', email: 'alice@example.com', orders: 5, totalSpent: 823.75, joinDate: '2023-09-22' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com', orders: 1, totalSpent: 129.99, joinDate: '2024-01-08' },
    { id: 4, name: 'Carol Williams', email: 'carol@example.com', orders: 3, totalSpent: 367.50, joinDate: '2023-12-03' },
    { id: 5, name: 'Dave Brown', email: 'dave@example.com', orders: 0, totalSpent: 0, joinDate: '2024-02-01' },
  ];
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEmailAll = () => {
    // In a real app, this would open a modal to send a mass email
    alert('Email all customers functionality would go here');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button
          onClick={handleEmailAll}
          className="btn btn-outline inline-flex items-center"
        >
          <MailPlus className="w-4 h-4 mr-2" />
          Email All Customers
        </button>
      </div>
      
      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={`mailto:${customer.email}`} className="text-gray-500 hover:text-primary-600">
                      {customer.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-800 p-1">
                        <User className="w-5 h-5" />
                      </button>
                      <Link to={`/admin/customers/${customer.id}/orders`} className="text-blue-600 hover:text-blue-800 p-1">
                        <ShoppingCart className="w-5 h-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No customers found matching your search criteria.</p>
          </div>
        )}
      </div>
      
      {/* Customer Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h2>
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src="https://images.unsplash.com/photo-1556155092-8707de31f9c4?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxhZG1pbiUyMGRhc2hib2FyZCUyMGFuYWx5dGljcyUyMGVjb21tZXJjZXxlbnwwfHx8fDE3NDI4NDc3NjJ8MA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=800" 
            alt="Customer analytics dashboard" 
            className="rounded-lg object-cover w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminCustomersPage;
  