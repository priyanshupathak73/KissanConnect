import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../services/api';
import api from '../services/api';

const UserDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Pincode auto-fill state
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  // Fetch user data and orders on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!user?._id) {
          return;
        }

        // Initialize form with user data
        setFormData({
          name: user.name || '',
          phone: user.phone || '',
          addressLine1: user.addressLine1 || '',
          addressLine2: user.addressLine2 || '',
          city: user.city || '',
          state: user.state || '',
          pincode: user.pincode || ''
        });

        // Fetch user orders
        const ordersResponse = await orderApi.getOrders({ userId: user._id });
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Auto-fill City and State based on Pincode
  useEffect(() => {
    const fetchLocationByPincode = async () => {
      try {
        const pincodeDigits = formData.pincode.replace(/\D/g, '');
        
        // Only fetch if pincode is exactly 6 digits
        if (pincodeDigits.length !== 6) {
          if (pincodeDigits.length === 0) {
            // Clear city and state if pincode is cleared
            setFormData(prev => ({
              ...prev,
              city: '',
              state: ''
            }));
            setPincodeError('');
          }
          return;
        }

        setPincodeLoading(true);
        setPincodeError('');

        // Call external API to get location data
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincodeDigits}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch pincode data');
        }

        const data = await response.json();

        // Check if the API returned valid data
        if (data[0]?.Status === 'Success' && data[0]?.PostOffice && data[0].PostOffice.length > 0) {
          const locationData = data[0].PostOffice[0];
          
          setFormData(prev => ({
            ...prev,
            city: locationData.District || '',
            state: locationData.State || ''
          }));
          setPincodeError('');
          
          // Clear any existing pincode-related errors
          setErrors(prev => ({
            ...prev,
            pincode: ''
          }));
        } else {
          // Invalid pincode
          setPincodeError('Invalid Pincode');
          setFormData(prev => ({
            ...prev,
            city: '',
            state: ''
          }));
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        setPincodeError('Invalid Pincode');
        setFormData(prev => ({
          ...prev,
          city: '',
          state: ''
        }));
      } finally {
        setPincodeLoading(false);
      }
    };

    // Debounce the API call
    const timer = setTimeout(() => {
      fetchLocationByPincode();
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.pincode]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.phone) {
      newErrors.phone = 'Mobile number is required';
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        newErrors.phone = 'Mobile number must be exactly 10 digits (no more, no less)';
      }
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }

    if (!formData.city) {
      newErrors.city = 'City is required';
    }

    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else {
      const pincodeDigits = formData.pincode.replace(/\D/g, '');
      if (pincodeDigits.length !== 6) {
        newErrors.pincode = 'Pincode must be exactly 6 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle profile save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSaveLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      await api.post('/users/profile/update', formData);
      
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to update profile';
      setErrorMessage(errorMsg);
      
      // Set specific field error if available
      if (error.response?.data?.message?.includes('Mobile number')) {
        setErrors(prev => ({
          ...prev,
          phone: error.response.data.message
        }));
      }
    } finally {
      setSaveLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Calculate summary
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Orders */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Orders</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="p-4 border border-green-100 rounded-xl bg-green-50 hover:bg-green-100 transition-colors\">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                          <p className="text-sm text-gray-600 mt-1">{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-green-600 text-white'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="border-t border-b border-green-200 py-3 my-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">🥔</span>
                            <div>
                              <p className="font-medium text-gray-900">{item.productName}</p>
                              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <p className="font-bold text-lg text-gray-900">Total: ₹{order.totalAmount}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Profile and Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile</h2>
              <p className="text-gray-600 mb-6">Manage contact details for delivery updates.</p>

              {successMessage && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">✓ {successMessage}</p>
                </div>
              )}

              {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">✕ {errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border-2 rounded-lg text-sm focus:outline-none transition-colors ${
                      errors.name 
                        ? 'border-red-500 bg-red-50 focus:border-red-500' 
                        : 'border-green-100 focus:border-green-500'
                    }`}
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">⚠ {errors.name}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <i className="fas fa-phone text-green-600"></i>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    className={`w-full px-4 py-3 border-2 rounded-lg text-sm focus:outline-none transition-colors ${
                      errors.phone 
                        ? 'border-red-500 bg-red-50 focus:border-red-500' 
                        : 'border-green-100 focus:border-green-500'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Address Section */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900">
                    <i className="fas fa-map-pin text-green-600"></i>
                    Delivery Address
                  </div>

                  {/* Address Line 1 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-2">Address Line 1</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      placeholder="House No., Building Name"
                      className={`w-full px-4 py-2 border-2 rounded-lg text-sm focus:outline-none transition-colors ${
                        errors.addressLine1 
                          ? 'border-red-500 bg-red-50 focus:border-red-500' 
                          : 'border-green-100 focus:border-green-500 bg-white'
                      }`}
                    />
                    {errors.addressLine1 && <p className="text-red-600 text-sm mt-1">⚠ {errors.addressLine1}</p>}
                  </div>

                  {/* Address Line 2 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Address Line 2 <span className="text-xs text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      placeholder="Near landmark (Optional)"
                      className="w-full px-4 py-2 border-2 border-green-100 bg-white rounded-lg text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  {/* City and Pincode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">City / District</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        readOnly
                        placeholder="Auto-filled from pincode"
                        className="w-full px-4 py-2 border-2 border-green-200 bg-gray-50 rounded-lg text-sm cursor-not-allowed opacity-75"
                      />
                      {errors.city && <p className="text-red-600 text-sm mt-1">⚠ {errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Pincode</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="400001"
                          maxLength="6"
                          className={`w-full px-4 py-2 border-2 rounded-lg text-sm focus:outline-none transition-colors ${
                            pincodeError
                              ? 'border-red-500 bg-red-50 focus:border-red-500'
                              : errors.pincode 
                                ? 'border-red-500 bg-red-50 focus:border-red-500' 
                                : 'border-orange-100 focus:border-orange-500 bg-white'
                          }`}
                        />
                        {pincodeLoading && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin">
                              <i className="fas fa-spinner text-orange-500"></i>
                            </div>
                          </div>
                        )}
                      </div>
                      {pincodeError && (
                        <p className="text-red-600 text-sm mt-1">
                          <i className="fas fa-exclamation-circle"></i> {pincodeError}
                        </p>
                      )}
                      {errors.pincode && !pincodeError && <p className="text-red-600 text-sm mt-1">⚠ {errors.pincode}</p>}
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">State / Province</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      readOnly
                      placeholder="Auto-filled from pincode"
                      className="w-full px-4 py-2 border-2 border-green-200 bg-gray-50 rounded-lg text-sm cursor-not-allowed opacity-75"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <i className="fas fa-save"></i>
                  {saveLoading ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-green-100">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-shopping-bag text-green-600 text-lg"></i>
                    <span className="font-semibold text-gray-900">Total Orders</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">{totalOrders}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-rupee-sign text-green-600 text-lg"></i>
                    <span className="font-semibold text-gray-900">Total Spent</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">₹{totalSpent}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
