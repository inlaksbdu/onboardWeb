import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Home, Edit, Save, X } from 'lucide-react';
import { useGetCardDataMutation, } from '../../features/auth/authApiSlice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [getCardData, { isLoading }] = useGetCardDataMutation();

  const fetchProfileData = async () => {
    try {
      const response = await getCardData().unwrap();
      setProfileData(response);
      
      // Initialize form data
      setFormData({
        firstName: response?.first_name?.content || '',
        lastName: response?.last_name?.content || '',
        email: response?.email?.content || '',
        phone: response?.phone?.content || '',
        address: response?.address?.content || ''
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        first_name: { content: formData.firstName },
        last_name: { content: formData.lastName },
        email: { content: formData.email },
        phone: { content: formData.phone },
        address: { content: formData.address }
      }).unwrap();
      
      setEditMode(false);
      fetchProfileData(); // Refresh data
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (profileData) {
      setFormData({
        firstName: profileData?.first_name?.content || '',
        lastName: profileData?.last_name?.content || '',
        email: profileData?.email?.content || '',
        phone: profileData?.phone?.content || '',
        address: profileData?.address?.content || ''
      });
    }
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
     

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                <Edit size={18} className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={handleSubmit}
                  disabled={isUpdating}
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  <Save size={18} className="mr-2" />
                  Save
                </button>
                <button 
                  onClick={handleCancel}
                  className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
              <div className="space-y-4">
                <Skeleton height="50px" />
                <Skeleton height="50px" />
                <Skeleton height="50px" />
                <Skeleton height="50px" />
                <Skeleton height="50px" />
              </div>
            </SkeletonTheme>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isUpdating}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border border-gray-200">
                      {profileData?.first_name?.content || 'Not provided'}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isUpdating}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border border-gray-200">
                      {profileData?.last_name?.content || 'Not provided'}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isUpdating}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border border-gray-200">
                      {profileData?.email?.content || 'Not provided'}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isUpdating}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border border-gray-200">
                      {profileData?.phone?.content || 'Not provided'}
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  {editMode ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isUpdating}
                    ></textarea>
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border border-gray-200">
                      {profileData?.address?.content || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
              
              {editMode && (
                <div className="mt-6 md:hidden flex space-x-2">
                  <button 
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Information</h2>
          
          {isLoading ? (
            <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
              <div className="space-y-4">
                <Skeleton height="50px" />
                <Skeleton height="50px" />
              </div>
            </SkeletonTheme>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {profileData?.document_type || 'Not provided'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document ID</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {profileData?.document_id || 'Not provided'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;