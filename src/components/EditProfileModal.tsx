import  { useState, useRef, useEffect } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: any) => void;
  profileData: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
}

const ProfilePictures = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500",
  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500",
  "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500",
  "https://images.unsplash.com/photo-1551438632-e8c7d9a5d1b7?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500",
  "https://images.unsplash.com/photo-1706097893941-843d7379339e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw2fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500"
];

export default function EditProfileModal({ isOpen, onClose, onSave, profileData }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: profileData.name,
    email: profileData.email,
    phone: profileData.phone,
    avatar: profileData.avatar,
  });
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPicSelector, setShowPicSelector] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        avatar: profileData.avatar,
      });
      setCustomImageUrl('');
      setUploadedImage(null);
      setShowPicSelector(false);
    }
  }, [isOpen, profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          setFormData(prev => ({ ...prev, avatar: event.target?.result as string }));
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectProfilePic = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, avatar: imageUrl }));
    setShowPicSelector(false);
  };

  const handleSetCustomUrl = () => {
    if (customImageUrl) {
      setFormData(prev => ({ ...prev, avatar: customImageUrl }));
      setShowPicSelector(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src={formData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHByb2ZpbGUlMjBwaG90b3N8ZW58MHx8fHwxNzQyODUwMjY2fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=500";
                    }}
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => setShowPicSelector(!showPicSelector)}
                  className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {showPicSelector && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Change profile picture</h3>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {ProfilePictures.map((url, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectProfilePic(url)}
                      className={`relative overflow-hidden h-20 w-20 rounded-full border-2 hover:border-primary-500 focus:outline-none focus:border-primary-500 ${
                        formData.avatar === url ? 'border-primary-500' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={url} 
                        alt={`Avatar option ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      {formData.avatar === url && (
                        <div className="absolute inset-0 bg-primary-500 bg-opacity-20 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Or enter image URL"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      type="button"
                      onClick={handleSetCustomUrl}
                      disabled={!customImageUrl}
                      className="btn btn-outline text-sm py-2 px-3 disabled:opacity-50"
                    >
                      Set
                    </button>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="file"
                      id="image-upload"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full btn btn-outline text-sm py-2"
                    >
                      {isUploading ? 'Uploading...' : 'Upload from device'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={user?.role === 'admin'} // Admins can't change their email for demo purposes
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
              required
            />
            {user?.role === 'admin' && (
              <p className="mt-1 text-xs text-gray-500">Email cannot be changed in demo mode.</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (123) 456-7890"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 