// //pages/Profile.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';
// import profilepic from "../assets/profilepic.jpg";

// const Profile = () => {
//   const { user, updateUser } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Initialize form data with user data
//   useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         email: user.email || ''
//       }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setError('');
//     setSuccess('');
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//     setError('');
//     setSuccess('');
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     // Reset form data to original user data
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         email: user.email || '',
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       }));
//     }
//     setError('');
//     setSuccess('');
//   };

//   const validateForm = () => {
//     if (!formData.firstName.trim() || !formData.lastName.trim()) {
//       setError('First name and last name are required');
//       return false;
//     }

//     if (!formData.email.trim()) {
//       setError('Email is required');
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError('Please enter a valid email address');
//       return false;
//     }

//     // If password change is attempted
//     if (formData.newPassword || formData.confirmPassword) {
//       if (!formData.currentPassword) {
//         setError('Current password is required to change password');
//         return false;
//       }

//       if (formData.newPassword.length < 8) {
//         setError('New password must be at least 8 characters long');
//         return false;
//       }

//       if (formData.newPassword !== formData.confirmPassword) {
//         setError('New password and confirmation do not match');
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleSave = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('access_token');
      
//       // Prepare update data
//       const updateData = {
//         firstName: formData.firstName.trim(),
//         lastName: formData.lastName.trim(),
//         email: formData.email.trim()
//       };

//       // Add password fields if password change is requested
//       if (formData.newPassword) {
//         updateData.currentPassword = formData.currentPassword;
//         updateData.newPassword = formData.newPassword;
//       }

//       const response = await axios.put(`${URL}/api/auth/admin/profile`, updateData, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         // Update user context
//         updateUser(response.data.data);
        
//         setSuccess('Profile updated successfully');
//         setIsEditing(false);
        
//         // Clear password fields
//         setFormData(prev => ({
//           ...prev,
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         }));
//       }
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       setError(err.response?.data?.message || 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='px-6'>
//       {/* Profile Header */}
//       <div className='flex gap-3 items-center'>
//         <img src={user?.profileImage || profilepic} className='rounded-full w-24 h-24 object-cover' />
//         <div>
//           <p className='font-semibold'>{user?.firstName} {user?.lastName}</p>
//           <p className='font-thin'>Role: {user?.role || 'Admin'}</p>
//           <p className='text-sm text-gray-500'>Last login: {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'N/A'}</p>
//         </div>
//       </div>

//       <div className='border-b pt-9'></div>

//       {/* Success/Error Messages */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       {success && (
//         <div className="bg-green-50 border border-green-200 rounded-md p-3 mt-4">
//           <span className="text-sm text-green-700">{success}</span>
//         </div>
//       )}

//       {/* Name Section */}
//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Name</p>
//           <p className='font-normal max-w-[250px]'>Make changes to your name</p>
//         </div>

//         <div>
//           <div>
//             <p className='py-1'>First Name</p>
//             <input 
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder='First Name' 
//               className={`px-2 rounded-2xl py-2 border border-gray-500 w-[320px] ${!isEditing ? 'bg-gray-100' : ''}`}
//             />
//           </div>
//           <div>
//             <p className='py-1 pt-3'>Last Name</p>
//             <input 
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder='Last Name' 
//               className={`px-2 rounded-2xl py-2 border border-gray-500 w-[320px] ${!isEditing ? 'bg-gray-100' : ''}`}
//             />
//           </div>
//         </div>
//       </div>

//       <div className='border-b'></div>

//       {/* Email Section */}
//       <div className='flex gap-32 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Email Address</p>
//           <p className='font-normal max-w-[250px]'>Make changes to your email</p>
//         </div>

//         <div>
//           <div>
//             <p className='py-1'>Email</p>
//             <input 
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder='email@example.com' 
//               className={`px-2 rounded-2xl py-2 border border-gray-500 w-[320px] ${!isEditing ? 'bg-gray-100' : ''}`}
//             />
//           </div>
//         </div>
//       </div>

//       <div className='border-b'></div>

//       {/* Password Section */}
//       <div className='flex gap-24 py-9'>
//         <div>
//           <p className='font-semibold text-lg'>Password</p>
//           <p className='font-normal max-w-[250px]'>Make changes to your password</p>
//         </div>

//         <div>
//           {isEditing && (
//             <>
//               <div>
//                 <p className='py-1'>Current Password</p>
//                 <input 
//                   name="currentPassword"
//                   type="password"
//                   value={formData.currentPassword}
//                   onChange={handleChange}
//                   placeholder='Enter current password' 
//                   className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]'
//                 />
//               </div>
//               <div>
//                 <p className='py-1 pt-3'>New Password</p>
//                 <input 
//                   name="newPassword"
//                   type="password"
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                   placeholder='Enter new password' 
//                   className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]'
//                 />
//               </div>
//               <div>
//                 <p className='py-1 pt-3'>Confirm New Password</p>
//                 <input 
//                   name="confirmPassword"
//                   type="password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder='Confirm new password' 
//                   className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]'
//                 />
//               </div>
//             </>
//           )}
          
//           {!isEditing && (
//             <div>
//               <p className='py-1'>Password</p>
//               <input 
//                 type="password"
//                 value="********"
//                 disabled
//                 className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px] bg-gray-100'
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className='flex gap-x-6'>
//         {!isEditing ? (
//           <button 
//             onClick={handleEdit}
//             className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg hover:bg-[#946BEF] hover:text-white transition-colors'
//           >
//             Edit
//           </button>
//         ) : (
//           <>
//             <button 
//               onClick={handleCancel}
//               className='border-2 border-gray-400 text-gray-600 px-12 py-2 rounded-lg hover:bg-gray-100 transition-colors'
//             >
//               Cancel
//             </button>
//             <button 
//               onClick={handleSave}
//               disabled={loading}
//               className={`px-12 py-2 rounded-lg transition-colors ${
//                 loading 
//                   ? 'bg-gray-400 text-white cursor-not-allowed' 
//                   : 'bg-[#946BEF] text-white hover:bg-[#7839c7]'
//               }`}
//             >
//               {loading ? (
//                 <div className="flex items-center">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Saving...
//                 </div>
//               ) : (
//                 'Save'
//               )}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;




//pages/Profile.jsx - Mobile Responsive Version
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import profilepic from "../assets/profilepic.jpg";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize form data with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original user data
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First name and last name are required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // If password change is attempted
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        setError('Current password is required to change password');
        return false;
      }

      if (formData.newPassword.length < 8) {
        setError('New password must be at least 8 characters long');
        return false;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('New password and confirmation do not match');
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      
      // Prepare update data
      const updateData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim()
      };

      // Add password fields if password change is requested
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await axios.put(`${URL}/api/auth/admin/profile`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Update user context
        updateUser(response.data.data);
        
        setSuccess('Profile updated successfully');
        setIsEditing(false);
        
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-2 sm:px-4 lg:px-6 py-4 lg:py-6'>
      {/* Profile Header - Mobile Responsive */}
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start mb-6'>
        <img 
          src={user?.profileImage || profilepic} 
          className='rounded-full w-20 h-20 sm:w-24 sm:h-24 object-cover flex-shrink-0' 
          alt="Profile"
        />
        <div className="text-center sm:text-left">
          <p className='font-semibold text-lg sm:text-xl'>{user?.firstName} {user?.lastName}</p>
          <p className='font-thin text-gray-600'>Role: {user?.role || 'Admin'}</p>
          <p className='text-sm text-gray-500 mt-1'>
            Last login: {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      <div className='border-b mb-6'></div>

      {/* Success/Error Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-6">
          <span className="text-sm text-green-700">{success}</span>
        </div>
      )}

      {/* Profile Sections Container */}
      <div className="space-y-8">
        {/* Name Section - Mobile Responsive */}
        <div className='flex flex-col lg:flex-row lg:gap-32'>
          <div className="mb-4 lg:mb-0 lg:flex-shrink-0">
            <p className='font-semibold text-lg'>Name</p>
            <p className='font-normal text-gray-600 max-w-[250px]'>Make changes to your name</p>
          </div>

          <div className="flex-1 max-w-md lg:max-w-none">
            <div className="mb-4">
              <p className='py-1 text-sm font-medium text-gray-700'>First Name</p>
              <input 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder='First Name' 
                className={`px-3 py-2 rounded-2xl border border-gray-500 w-full sm:w-[320px] transition-colors ${
                  !isEditing ? 'bg-gray-100 text-gray-600' : 'bg-white'
                }`}
              />
            </div>
            <div>
              <p className='py-1 text-sm font-medium text-gray-700'>Last Name</p>
              <input 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder='Last Name' 
                className={`px-3 py-2 rounded-2xl border border-gray-500 w-full sm:w-[320px] transition-colors ${
                  !isEditing ? 'bg-gray-100 text-gray-600' : 'bg-white'
                }`}
              />
            </div>
          </div>
        </div>

        <div className='border-b'></div>

        {/* Email Section - Mobile Responsive */}
        <div className='flex flex-col lg:flex-row lg:gap-32'>
          <div className="mb-4 lg:mb-0 lg:flex-shrink-0">
            <p className='font-semibold text-lg'>Email Address</p>
            <p className='font-normal text-gray-600 max-w-[250px]'>Make changes to your email</p>
          </div>

          <div className="flex-1 max-w-md lg:max-w-none">
            <div>
              <p className='py-1 text-sm font-medium text-gray-700'>Email</p>
              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder='email@example.com' 
                className={`px-3 py-2 rounded-2xl border border-gray-500 w-full sm:w-[320px] transition-colors ${
                  !isEditing ? 'bg-gray-100 text-gray-600' : 'bg-white'
                }`}
              />
            </div>
          </div>
        </div>

        <div className='border-b'></div>

        {/* Password Section - Mobile Responsive */}
        <div className='flex flex-col lg:flex-row lg:gap-24'>
          <div className="mb-4 lg:mb-0 lg:flex-shrink-0">
            <p className='font-semibold text-lg'>Password</p>
            <p className='font-normal text-gray-600 max-w-[250px]'>Make changes to your password</p>
          </div>

          <div className="flex-1 max-w-md lg:max-w-none">
            {isEditing && (
              <div className="space-y-4">
                <div>
                  <p className='py-1 text-sm font-medium text-gray-700'>Current Password</p>
                  <input 
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder='Enter current password' 
                    className='px-3 py-2 rounded-2xl border border-gray-500 w-full sm:w-[320px]'
                  />
                </div>
                <div>
                  <p className='py-1 text-sm font-medium text-gray-700'>New Password</p>
                  <input 
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder='Enter new password' 
                    className='px-3 py-2 rounded-2xl border border-gray-500 w-full sm:w-[320px]'
                  />
                </div>
                <div>
                  <p className='py-1 text-sm font-medium text-gray-700'>Confirm New Password</p>
                  <input 
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Confirm new password' 
                    className='px-3 py-2 rounded-2xl border border-gray-500 w-full sm:w-[320px]'
                  />
                </div>
              </div>
            )}
            
            {!isEditing && (
              <div>
                <p className='py-1 text-sm font-medium text-gray-700'>Password</p>
                <input 
                  type="password"
                  value="********"
                  disabled
                  className='px-3 py-2 rounded-2xl border border-gray-500 w-full sm:w-[320px] bg-gray-100 text-gray-600'
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Mobile Responsive */}
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6'>
          {!isEditing ? (
            <button 
              onClick={handleEdit}
              className='border-2 border-[#946BEF] text-[#946BEF] px-8 sm:px-12 py-3 rounded-lg hover:bg-[#946BEF] hover:text-white transition-colors w-full sm:w-auto'
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button 
                onClick={handleCancel}
                className='border-2 border-gray-400 text-gray-600 px-8 sm:px-12 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto order-2 sm:order-1'
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className={`px-8 sm:px-12 py-3 rounded-lg transition-colors w-full sm:w-auto order-1 sm:order-2 ${
                  loading 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-[#946BEF] text-white hover:bg-[#7839c7]'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;