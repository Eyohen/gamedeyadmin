// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   RiMailLine,
//   RiLockLine,
//   RiEyeLine,
//   RiEyeOffLine,
//   RiErrorWarningLine
// } from 'react-icons/ri';
// import axios from 'axios';
// import { URL } from '../url';
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


//   const [selectedRole, setSelectedRole] = useState('');

//   const roles = [
//     { id: 'user', label: 'User' },
//     { id: 'facility-owner', label: 'Facility Owner' },
//     { id: 'coach', label: 'Coach' }
//   ];

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
//       // Add your login API call here
//       const res = await axios.post(`${URL}/api/merchants/login`, formData, {
//         timeout: 50000,
//       });

//       const { token, merchant } = res.data;

//       if (res.status === 200) {
//         localStorage.setItem("access_token", token)
//         login(merchant)
//         setError(false)
//         console.log(res.data)
//         navigate("/dashboard")
//       }

//     } catch (err) {
//       setError('Invalid email or password');
//       console.error('Login error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">

//       {/* <div className="w-48 h-24 bg-gray-100 rounded-3xl border-r-4 border-b-4 border-black">
 
// </div> */}

//       <div className='flex justify-center gap-x-32'>

    
//         <div>
//           <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
//             {/* Logo placeholder */}
//             <div className="mx-auto flex items-center">
//               <span className="text-white"><img src={logo} className='w-36 object-cover' /></span>
//             </div>


//             <div className='bg-yellow-400 w-[75px] h-[75px] rounded-full flex justify-center items-center border border-black border-r-4 border-b-4 mt-9'><div className='bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center border border-black'><LuUserRoundPlus /></div></div>
      


//             <h2 className="mt-4 text-3xl font-semibold text-gray-900">
//             Admin Login
//             </h2>
//             <p className="mt-1 text-sm text-gray-600 font-medium">
//               Login into your admin account
//             </p>
//           </div>

//           <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      

//               <form className="space-y-6" onSubmit={handleSubmit}>


//                 {/* Email Field */}
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email address
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <RiMailLine className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       autoComplete="email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="block w-[400px] pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter your email"
//                     />
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <RiLockLine className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="password"
//                       name="password"
//                       type={showPassword ? "text" : "password"}
//                       autoComplete="current-password"
//                       required
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter your password"
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                       ) : (
//                         <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                       )}
//                     </button>
//                   </div>
//                 </div>


//                 {/* Submit Button */}
//                 <div>
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                       }`}
//                   >
//                     {isLoading ? 'Logging in...' : 'Login'}
//                   </button>
//                 </div>


//                 {/* Dont have an account */}
//                 <p className="mt-2 text-center text-sm text-gray-600">
//                   Don't have an account?{' '}
//                   <Link to="/register" className="font-medium text-purple-400 hover:text-blue-500">
//                     Sign Up
//                   </Link>
//                 </p>

//               </form>

 
//           </div>


//         </div>

//     <img src={authpic} className='w-[750px] h-[650px] object-cover rounded-3xl hidden md:block' />



//       </div>
//     </div>
//   );
// };

// export default Login;





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
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className='flex justify-center gap-x-32'>
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
            {/* Logo placeholder */}
            <div className="mx-auto flex items-center">
              <span className="text-white"><img src={logo} className='w-36 object-cover' /></span>
            </div>

            <div className='bg-yellow-400 w-[75px] h-[75px] rounded-full flex justify-center items-center border border-black border-r-4 border-b-4 mt-9'>
              <div className='bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center border border-black'>
                <LuUserRoundPlus />
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-semibold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-1 text-sm text-gray-600 font-medium">
              Login into your admin account
            </p>
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
                  <RiErrorWarningLine className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
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
                    className="block w-[400px] pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
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
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
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
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
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
              <div className="text-center">
                <Link to="/forgot-password" className="text-sm text-[#7042D2] hover:text-[#5a2eb8]">
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </div>

        <img src={authpic} className='w-[750px] h-[650px] object-cover rounded-3xl hidden md:block' />
      </div>
    </div>
  );
};

export default Login;