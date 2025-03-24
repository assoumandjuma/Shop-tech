import  { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'TechTrove',
    storeEmail: 'admin@techtrove.com',
    storePhone: '(123) 456-7890',
    currency: 'USD',
    taxRate: '7',
    shippingOptions: {
      freeShippingThreshold: '50',
      standardShippingRate: '5',
      expressShippingRate: '15'
    }
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCreditCards: true,
    acceptPaypal: true,
    acceptApplePay: false,
    acceptGooglePay: false,
    testMode: true
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    lowStockAlerts: true,
    marketingEmails: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  
  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setStoreSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setStoreSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handlePaymentSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPaymentSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleNotificationSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettingsUpdated(true);
      
      // Reset notification after 3 seconds
      setTimeout(() => {
        setSettingsUpdated(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
      </div>
      
      {settingsUpdated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">Settings updated successfully.</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* General Store Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={storeSettings.storeName}
                  onChange={handleStoreSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Store Email
                </label>
                <input
                  type="email"
                  id="storeEmail"
                  name="storeEmail"
                  value={storeSettings.storeEmail}
                  onChange={handleStoreSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Store Phone
                </label>
                <input
                  type="tel"
                  id="storePhone"
                  name="storePhone"
                  value={storeSettings.storePhone}
                  onChange={handleStoreSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={storeSettings.currency}
                  onChange={handleStoreSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  min="0"
                  step="0.1"
                  value={storeSettings.taxRate}
                  onChange={handleStoreSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Shipping Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                  Free Shipping Threshold ($)
                </label>
                <input
                  type="number"
                  id="freeShippingThreshold"
                  name="shippingOptions.freeShippingThreshold"
                  min="0"
                  value={storeSettings.shippingOptions.freeShippingThreshold}
                  onChange={handleStoreSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Set to 0 for no free shipping
                </p>
              </div>
              
              <div>
                <label htmlFor="standardShippingRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Standard Shipping Rate ($)
                </label>
                <input
                  type="number"
                  id="standardShippingRate"
                  name="shippingOptions.standardShippingRate"
                  min="0"
                  step="0.01"
                  value={storeSettings.shippingOptions.standardShippingRate}
                  onChange={handleStoreSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="expressShippingRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Express Shipping Rate ($)
                </label>
                <input
                  type="number"
                  id="expressShippingRate"
                  name="shippingOptions.expressShippingRate"
                  min="0"
                  step="0.01"
                  value={storeSettings.shippingOptions.expressShippingRate}
                  onChange={handleStoreSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Payment Settings</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptCreditCards"
                  name="acceptCreditCards"
                  checked={paymentSettings.acceptCreditCards}
                  onChange={handlePaymentSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="acceptCreditCards" className="ml-2 text-sm text-gray-700">
                  Accept Credit/Debit Cards
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptPaypal"
                  name="acceptPaypal"
                  checked={paymentSettings.acceptPaypal}
                  onChange={handlePaymentSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="acceptPaypal" className="ml-2 text-sm text-gray-700">
                  Accept PayPal
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptApplePay"
                  name="acceptApplePay"
                  checked={paymentSettings.acceptApplePay}
                  onChange={handlePaymentSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="acceptApplePay" className="ml-2 text-sm text-gray-700">
                  Accept Apple Pay
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptGooglePay"
                  name="acceptGooglePay"
                  checked={paymentSettings.acceptGooglePay}
                  onChange={handlePaymentSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="acceptGooglePay" className="ml-2 text-sm text-gray-700">
                  Accept Google Pay
                </label>
              </div>
              
              <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                <input
                  type="checkbox"
                  id="testMode"
                  name="testMode"
                  checked={paymentSettings.testMode}
                  onChange={handlePaymentSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="testMode" className="ml-2 text-sm text-gray-700">
                  Test Mode
                </label>
                {paymentSettings.testMode && (
                  <div className="ml-2 flex items-center text-amber-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    No real payments will be processed
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="orderConfirmation"
                  name="orderConfirmation"
                  checked={notificationSettings.orderConfirmation}
                  onChange={handleNotificationSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="orderConfirmation" className="ml-2 text-sm text-gray-700">
                  Send order confirmation emails
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="orderShipped"
                  name="orderShipped"
                  checked={notificationSettings.orderShipped}
                  onChange={handleNotificationSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="orderShipped" className="ml-2 text-sm text-gray-700">
                  Send order shipped notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="orderDelivered"
                  name="orderDelivered"
                  checked={notificationSettings.orderDelivered}
                  onChange={handleNotificationSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="orderDelivered" className="ml-2 text-sm text-gray-700">
                  Send order delivered notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lowStockAlerts"
                  name="lowStockAlerts"
                  checked={notificationSettings.lowStockAlerts}
                  onChange={handleNotificationSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="lowStockAlerts" className="ml-2 text-sm text-gray-700">
                  Receive low stock alerts
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="marketingEmails"
                  name="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onChange={handleNotificationSettingsChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="marketingEmails" className="ml-2 text-sm text-gray-700">
                  Send marketing emails to customers
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
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
                Saving...
              </span>
            ) : (
              <span className="flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminSettingsPage;
  