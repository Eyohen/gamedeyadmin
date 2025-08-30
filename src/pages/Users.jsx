// //pages/Users.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// const Users = () => {
//   const { user } = useAuth();
//   const [activeButton, setActiveButton] = useState('players');
//   const [users, setUsers] = useState([]);
//   const [coaches, setCoaches] = useState([]);
//   const [facilityOwners, setFacilityOwners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });

//   useEffect(() => {
//     fetchData();
//   }, [activeButton, pagination.page]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('access_token');
      
//       if (activeButton === 'players') {
//         await fetchUsers();
//       } else if (activeButton === 'coaches') {
//         await fetchCoaches();
//       } else if (activeButton === 'facility-owners') {
//         await fetchFacilityOwners();
//       }
//     } catch (err) {
//       setError('Failed to fetch data');
//       console.error('Error fetching data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.get(`${URL}/api/admin/users?page=${pagination.page}&limit=${pagination.limit}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         setUsers(response.data.data);
//         setPagination(response.data.pagination);
//       }
//     } catch (err) {
//       console.error('Error fetching users:', err);
//       setError('Failed to fetch users');
//     }
//   };

//   const fetchCoaches = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.get(`${URL}/api/admin/coaches?page=${pagination.page}&limit=${pagination.limit}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         setCoaches(response.data.data);
//         setPagination(response.data.pagination);
//       }
//     } catch (err) {
//       console.error('Error fetching coaches:', err);
//       setError('Failed to fetch coaches');
//     }
//   };

//   const fetchFacilityOwners = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.get(`${URL}/api/admin/facilities?page=${pagination.page}&limit=${pagination.limit}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         setFacilityOwners(response.data.data);
//         setPagination(response.data.pagination);
//       }
//     } catch (err) {
//       console.error('Error fetching facility owners:', err);
//       setError('Failed to fetch facility owners');
//     }
//   };

//   const updateUserStatus = async (userId, newStatus) => {
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.patch(`${URL}/api/admin/users/${userId}/status`, 
//         { status: newStatus },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         // Refresh the current data
//         fetchData();
//       }
//     } catch (err) {
//       console.error('Error updating user status:', err);
//       setError('Failed to update user status');
//     }
//   };

//   const updateCoachVerification = async (coachId, verificationStatus, rejectionReason = '') => {
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.patch(`${URL}/api/admin/coaches/${coachId}/verification`, 
//         { verificationStatus, rejectionReason },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         fetchData();
//       }
//     } catch (err) {
//       console.error('Error updating coach verification:', err);
//       setError('Failed to update coach verification');
//     }
//   };

//   const updateFacilityVerification = async (facilityId, verificationStatus, rejectionReason = '') => {
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.patch(`${URL}/api/admin/facilities/${facilityId}/verification`, 
//         { verificationStatus, rejectionReason },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         fetchData();
//       }
//     } catch (err) {
//       console.error('Error updating facility verification:', err);
//       setError('Failed to update facility verification');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified':
//         return 'bg-green-100 text-green-800';
//       case 'inactive':
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'suspended':
//       case 'rejected':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const renderUsersTable = () => (
//     <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Email
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Phone
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Join Date
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Status
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {users.map((user) => (
//             <tr key={user.id} className="hover:bg-gray-50">
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 {user.firstName} {user.lastName}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {user.email}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {user.phone || 'N/A'}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {new Date(user.createdAt).toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
//                   {user.status}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm">
//                 <select 
//                   value={user.status}
//                   onChange={(e) => updateUserStatus(user.id, e.target.value)}
//                   className="text-[#946BEF] bg-transparent border-none cursor-pointer hover:underline"
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="suspended">Suspended</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderCoachesTable = () => (
//     <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Email
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Experience
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Hourly Rate
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Verification Status
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {coaches.map((coach) => (
//             <tr key={coach.id} className="hover:bg-gray-50">
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 {coach.User?.firstName} {coach.User?.lastName}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {coach.User?.email}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {coach.experience || 0} years
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 ₦{parseFloat(coach.hourlyRate || 0).toLocaleString()}/hr
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(coach.verificationStatus)}`}>
//                   {coach.verificationStatus}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm">
//                 <select 
//                   value={coach.verificationStatus}
//                   onChange={(e) => updateCoachVerification(coach.id, e.target.value)}
//                   className="text-[#946BEF] bg-transparent border-none cursor-pointer hover:underline"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="verified">Verified</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderFacilityOwnersTable = () => (
//     <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Facility Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Owner
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Address
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Price/Hour
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Verification Status
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {facilityOwners.map((facility) => (
//             <tr key={facility.id} className="hover:bg-gray-50">
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 {facility.name}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {facility.Owner?.firstName} {facility.Owner?.lastName}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {facility.address?.slice(0, 30)}...
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 ₦{parseFloat(facility.pricePerHour || 0).toLocaleString()}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(facility.verificationStatus)}`}>
//                   {facility.verificationStatus}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm">
//                 <select 
//                   value={facility.verificationStatus}
//                   onChange={(e) => updateFacilityVerification(facility.id, e.target.value)}
//                   className="text-[#946BEF] bg-transparent border-none cursor-pointer hover:underline"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="verified">Verified</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className='px-6 py-6'>
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       {/* Filter Buttons */}
//       <div className='bg-gray-100 w-[350px] px-2 py-2 rounded-lg mb-6'>
//         <div className='flex'>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'players'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('players')}
//           >
//             Players
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'facility-owners'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('facility-owners')}
//           >
//             Facility Owners
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'coaches'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('coaches')}
//           >
//             Coaches
//           </button>
//         </div>
//       </div>

//       {/* Data Table */}
//       {activeButton === 'players' && renderUsersTable()}
//       {activeButton === 'coaches' && renderCoachesTable()}
//       {activeButton === 'facility-owners' && renderFacilityOwnersTable()}

//       {/* Pagination */}
//       {pagination.pages > 1 && (
//         <div className="flex justify-center mt-6">
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//               disabled={pagination.page === 1}
//               className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 bg-gray-100 rounded-md">
//               Page {pagination.page} of {pagination.pages}
//             </span>
//             <button
//               onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//               disabled={pagination.page === pagination.pages}
//               className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;







//pages/Users.jsx - Mobile Responsive Version
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const { user } = useAuth();
  const [activeButton, setActiveButton] = useState('players');
  const [users, setUsers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [facilityOwners, setFacilityOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchData();
  }, [activeButton, pagination.page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      
      if (activeButton === 'players') {
        await fetchUsers();
      } else if (activeButton === 'coaches') {
        await fetchCoaches();
      } else if (activeButton === 'facility-owners') {
        await fetchFacilityOwners();
      }
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${URL}/api/admin/users?page=${pagination.page}&limit=${pagination.limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUsers(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users');
    }
  };

  const fetchCoaches = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${URL}/api/admin/coaches?page=${pagination.page}&limit=${pagination.limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setCoaches(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching coaches:', err);
      setError('Failed to fetch coaches');
    }
  };

  const fetchFacilityOwners = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${URL}/api/admin/facilities?page=${pagination.page}&limit=${pagination.limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setFacilityOwners(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching facility owners:', err);
      setError('Failed to fetch facility owners');
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.patch(`${URL}/api/admin/users/${userId}/status`, 
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Refresh the current data
        fetchData();
      }
    } catch (err) {
      console.error('Error updating user status:', err);
      setError('Failed to update user status');
    }
  };

  const updateCoachVerification = async (coachId, verificationStatus, rejectionReason = '') => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.patch(`${URL}/api/admin/coaches/${coachId}/verification`, 
        { verificationStatus, rejectionReason },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        fetchData();
      }
    } catch (err) {
      console.error('Error updating coach verification:', err);
      setError('Failed to update coach verification');
    }
  };

  const updateFacilityVerification = async (facilityId, verificationStatus, rejectionReason = '') => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.patch(`${URL}/api/admin/facilities/${facilityId}/verification`, 
        { verificationStatus, rejectionReason },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        fetchData();
      }
    } catch (err) {
      console.error('Error updating facility verification:', err);
      setError('Failed to update facility verification');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderUsersTable = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Name
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden sm:table-cell">
              Email
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
              Phone
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
              Join Date
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Status
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div>
                  <div className="font-medium">{user.firstName} {user.lastName}</div>
                  <div className="sm:hidden text-xs text-gray-500 truncate max-w-[120px]">
                    {user.email}
                  </div>
                  <div className="lg:hidden text-xs text-gray-400 mt-1">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                  </div>
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                <div className="truncate max-w-[200px]">{user.email}</div>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                {user.phone || 'N/A'}
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                <select 
                  value={user.status}
                  onChange={(e) => updateUserStatus(user.id, e.target.value)}
                  className="text-[#946BEF] bg-transparent border-none cursor-pointer hover:underline text-xs sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCoachesTable = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Name
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden sm:table-cell">
              Email
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
              Experience
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
              Hourly Rate
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Status
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {coaches.map((coach) => (
            <tr key={coach.id} className="hover:bg-gray-50">
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div>
                  <div className="font-medium">{coach.User?.firstName} {coach.User?.lastName}</div>
                  <div className="sm:hidden text-xs text-gray-500 truncate max-w-[120px]">
                    {coach.User?.email}
                  </div>
                  <div className="lg:hidden text-xs text-gray-400 mt-1 space-x-2">
                    <span>{coach.experience || 0} yrs</span>
                    <span>₦{parseFloat(coach.hourlyRate || 0).toLocaleString()}/hr</span>
                  </div>
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                <div className="truncate max-w-[200px]">{coach.User?.email}</div>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                {coach.experience || 0} years
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                ₦{parseFloat(coach.hourlyRate || 0).toLocaleString()}/hr
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(coach.verificationStatus)}`}>
                  {coach.verificationStatus}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                <select 
                  value={coach.verificationStatus}
                  onChange={(e) => updateCoachVerification(coach.id, e.target.value)}
                  className="text-[#946BEF] bg-transparent border-none cursor-pointer hover:underline text-xs sm:text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFacilityOwnersTable = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Facility Name
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden sm:table-cell">
              Owner
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
              Address
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
              Price/Hour
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Status
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {facilityOwners.map((facility) => (
            <tr key={facility.id} className="hover:bg-gray-50">
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div>
                  <div className="font-medium truncate max-w-[120px] sm:max-w-none">{facility.name}</div>
                  <div className="sm:hidden text-xs text-gray-500 truncate max-w-[120px]">
                    {facility.Owner?.firstName} {facility.Owner?.lastName}
                  </div>
                  <div className="lg:hidden text-xs text-gray-400 mt-1">
                    ₦{parseFloat(facility.pricePerHour || 0).toLocaleString()}/hr
                  </div>
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                {facility.Owner?.firstName} {facility.Owner?.lastName}
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                <div className="truncate max-w-[200px]">{facility.address?.slice(0, 30)}...</div>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                ₦{parseFloat(facility.pricePerHour || 0).toLocaleString()}
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(facility.verificationStatus)}`}>
                  {facility.verificationStatus}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                <select 
                  value={facility.verificationStatus}
                  onChange={(e) => updateFacilityVerification(facility.id, e.target.value)}
                  className="text-[#946BEF] bg-transparent border-none cursor-pointer hover:underline text-xs sm:text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className='px-2 sm:px-4 lg:px-6 py-4 lg:py-6'>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Filter Buttons - Mobile Responsive */}
      <div className='bg-gray-100 w-full sm:w-[350px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex flex-wrap gap-1'>
          <button
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-colors text-sm ${activeButton === 'players'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('players')}
          >
            Players
          </button>
          <button
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${activeButton === 'facility-owners'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('facility-owners')}
          >
            Facility Owners
          </button>
          <button
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-colors text-sm ${activeButton === 'coaches'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('coaches')}
          >
            Coaches
          </button>
        </div>
      </div>

      {/* Data Table */}
      {activeButton === 'players' && renderUsersTable()}
      {activeButton === 'coaches' && renderCoachesTable()}
      {activeButton === 'facility-owners' && renderFacilityOwnersTable()}

      {/* Pagination - Mobile Responsive */}
      {pagination.pages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-3 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 text-sm"
            >
              Prev
            </button>
            <span className="px-3 py-2 bg-gray-100 rounded-md text-sm">
              {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;