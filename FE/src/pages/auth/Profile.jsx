import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import api from '../../api/axios';

const Profile = () => {
  const { user, updateProfile, isLoading, error, clearError } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Assuming updateProfile handles the api call and store update
      const res = await api.put('/users/profile', {
        name,
        email,
        password: password || undefined,
      });
      
      // Update local storage via store if we implemented it, 
      // but for simplicity we can just rely on the API and reload if needed, 
      // or update user store manually if we add `updateProfile` to `useAuthStore`.
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating profile');
    }
  };

  return (
    <div className="py-16 px-4 md:px-12 lg:px-24 bg-gray-50 min-h-[70vh] flex justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-brand-dark mb-6">User Profile</h1>

        {message && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{message}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">Profile updated successfully!</div>}

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Change Password</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-dark text-white font-medium py-3 rounded-md hover:bg-brand-orange transition-colors"
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
