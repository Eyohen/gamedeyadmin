// //pages/login.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   RiMailLine,
//   RiLockLine,
//   RiEyeLine,
//   RiEyeOffLine,
//   RiErrorWarningLine
// } from 'react-icons/ri';
// import { useAuth } from '../context/AuthContext';
// import authpic from '../assets/authpic.png'
// import logo from '../assets/logo.png';
// import { LuUserRoundPlus } from "react-icons/lu";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     setError(''); // Clear error when user types
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.email || !formData.password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const result = await login(formData.email, formData.password);

//       if (result.success) {
//         console.log('Login successful:', result.data);
//         navigate("/dashboard");
//       } else {
//         setError(result.message || 'Invalid email or password');
//       }
//     } catch (err) {
//       setError('An unexpected error occurred. Please try again.');
//       console.error('Login error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className='flex justify-center gap-x-32'>
//         <div>
//           <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
//             {/* Logo placeholder */}
//             <div className="mx-auto flex items-center">
//               <span className="text-white"><img src={logo} className='w-36 object-cover' /></span>
//             </div>

//             <div className='bg-yellow-400 w-[75px] h-[75px] rounded-full flex justify-center items-center border border-black border-r-4 border-b-4 mt-9'>
//               <div className='bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center border border-black'>
//                 <LuUserRoundPlus />
//               </div>
//             </div>

//             <h2 className="mt-4 text-3xl font-semibold text-gray-900">
//               Admin Login
//             </h2>
//             <p className="mt-1 text-sm text-gray-600 font-medium">
//               Login into your admin account
//             </p>
//           </div>

//           <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Error Display */}
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
//                   <RiErrorWarningLine className="h-5 w-5 text-red-400 mr-2" />
//                   <span className="text-sm text-red-700">{error}</span>
//                 </div>
//               )}

//               {/* Email Field */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <RiMailLine className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="block w-[400px] pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <RiLockLine className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="current-password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     ) : (
//                       <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                     isLoading 
//                       ? 'bg-gray-400 cursor-not-allowed' 
//                       : 'bg-[#7042D2] hover:bg-[#5a2eb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2]'
//                   }`}
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Logging in...
//                     </div>
//                   ) : (
//                     'Login'
//                   )}
//                 </button>
//               </div>

//               {/* Forgot Password */}
//               <div className="text-center">
//                 <Link to="/forgot-password" className="text-sm text-[#7042D2] hover:text-[#5a2eb8]">
//                   Forgot your password?
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>

//         <img src={authpic} className='w-[750px] h-[650px] object-cover rounded-3xl hidden md:block' />
//       </div>
//     </div>
//   );
// };

// export default Login;




//pages/login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiErrorWarningLine
} from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import authpic from '../assets/authpic.png'
import logo from '../assets/logo.png';
import { LuUserRoundPlus } from "react-icons/lu";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        console.log('Login successful:', result.data);
        navigate("/dashboard");
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Container with responsive layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Form Section */}
        <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 lg:flex-none lg:w-1/2">
          <div className="mx-auto w-full max-w-md lg:max-w-sm xl:max-w-md">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src={logo} className='w-24 sm:w-32 lg:w-36 object-cover' alt="Logo" />
            </div>

            {/* Icon and Header */}
            <div className="text-center mb-8">
              <div className='bg-yellow-400 w-16 h-16 sm:w-20 sm:h-20 lg:w-[75px] lg:h-[75px] rounded-full flex justify-center items-center border border-black border-r-4 border-b-4 mx-auto mb-4'>
                <div className='bg-white w-8 h-8 sm:w-10 sm:h-10 lg:w-[40px] lg:h-[40px] rounded-full flex justify-center items-center border border-black'>
                  <LuUserRoundPlus className="text-sm sm:text-base" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Admin Login
              </h2>
              <p className="text-sm text-gray-600 font-medium">
                Login into your admin account
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex items-start">
                    <RiErrorWarningLine className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiMailLine className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockLine className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#7042D2] hover:bg-[#5a2eb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2]'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-center pt-2">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-[#7042D2] hover:text-[#5a2eb8] transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-gray-50 p-8">
          <img 
            src={authpic} 
            className='max-w-full max-h-full object-cover rounded-3xl shadow-lg' 
            alt="Authentication illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;