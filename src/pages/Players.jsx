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

//   const updatePlayerStatus = async (userId, newStatus) => {
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

//   const renderPlayersTable = () => (
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
//           {players.map((user) => (
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
//                   onChange={(e) => updatePlayerStatus(user.id, e.target.value)}
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
//       {activeButton === 'players' && renderPlayersTable()}
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

// export default Players;







//pages/Players.jsx - Mobile Responsive Version
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, X } from 'lucide-react';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Players = () => {
  const { user } = useAuth();
  const [activeButton, setActiveButton] = useState('players');
  const [players, setPlayers] = useState([]);
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const openDetailModal = (type, item) => {
    setSelectedType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeDetailModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setSelectedType(null);
    setEnlargedImage(null);
  };

  useEffect(() => {
    fetchData();
  }, [activeButton, pagination.page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      
      if (activeButton === 'players') {
        await fetchPlayers();
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

  const fetchPlayers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${URL}/api/admin/players?page=${pagination.page}&limit=${pagination.limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setPlayers(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching players:', err);
      setError('Failed to fetch players');
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

  const updatePlayerStatus = async (playerId, newStatus) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.patch(`${URL}/api/admin/players/${playerId}/status`,
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
      console.error('Error updating player status:', err);
      setError('Failed to update player status');
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

  const renderPlayersTable = () => (
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
              View
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {players.map((user) => (
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
                <button
                  onClick={() => openDetailModal('player', user)}
                  className="text-[#946BEF] hover:text-[#7042D2] transition-colors"
                  title="View details"
                >
                  <Eye size={18} />
                </button>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                <select
                  value={user.status}
                  onChange={(e) => updatePlayerStatus(user.id, e.target.value)}
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
              View
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
                <button
                  onClick={() => openDetailModal('coach', coach)}
                  className="text-[#946BEF] hover:text-[#7042D2] transition-colors"
                  title="View details"
                >
                  <Eye size={18} />
                </button>
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
              View
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
                <button
                  onClick={() => openDetailModal('facility', facility)}
                  className="text-[#946BEF] hover:text-[#7042D2] transition-colors"
                  title="View details"
                >
                  <Eye size={18} />
                </button>
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

  const renderDetailModal = () => {
    if (!showModal || !selectedItem) return null;

    const item = selectedItem;

    return (
      <>
        {/* Enlarged image overlay */}
        {enlargedImage && (
          <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setEnlargedImage(null)}>
            <button onClick={() => setEnlargedImage(null)} className="absolute top-4 right-4 text-white hover:text-gray-300">
              <X size={28} />
            </button>
            <img src={enlargedImage} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
          </div>
        )}

        {/* Modal overlay */}
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4" onClick={closeDetailModal}>
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-black border-r-[6px] border-b-[4px] rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {selectedType === 'player' && 'Player Details'}
                {selectedType === 'coach' && 'Coach Details'}
                {selectedType === 'facility' && 'Facility Details'}
              </h2>
              <button onClick={closeDetailModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-4 sm:p-6 space-y-6">

              {/* === PLAYER DETAILS === */}
              {selectedType === 'player' && (
                <>
                  {/* Profile header */}
                  <div className="flex items-center gap-4">
                    {item.profileImage ? (
                      <img
                        src={item.profileImage}
                        alt={`${item.firstName} ${item.lastName}`}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
                        onClick={() => setEnlargedImage(item.profileImage)}
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-[#946BEF] flex items-center justify-center text-white text-xl font-semibold">
                        {item.firstName?.[0]}{item.lastName?.[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{item.firstName} {item.lastName}</h3>
                      <p className="text-sm text-gray-500">{item.email}</p>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium">{item.phone || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Gender</p>
                      <p className="text-sm font-medium capitalize">{item.gender || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Date of Birth</p>
                      <p className="text-sm font-medium">{item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Wallet Balance</p>
                      <p className="text-sm font-medium">₦{parseFloat(item.walletBalance || 0).toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Email Verified</p>
                      <p className="text-sm font-medium">{item.emailVerified ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Phone Verified</p>
                      <p className="text-sm font-medium">{item.phoneVerified ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Joined</p>
                      <p className="text-sm font-medium">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Last Login</p>
                      <p className="text-sm font-medium">{item.lastLoginAt ? new Date(item.lastLoginAt).toLocaleDateString() : 'Never'}</p>
                    </div>
                  </div>
                </>
              )}

              {/* === COACH DETAILS === */}
              {selectedType === 'coach' && (
                <>
                  {/* Profile header */}
                  <div className="flex items-center gap-4">
                    {(item.User?.profileImage || item.profileImage) ? (
                      <img
                        src={item.User?.profileImage || item.profileImage}
                        alt={`${item.User?.firstName} ${item.User?.lastName}`}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
                        onClick={() => setEnlargedImage(item.User?.profileImage || item.profileImage)}
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-[#946BEF] flex items-center justify-center text-white text-xl font-semibold">
                        {item.User?.firstName?.[0]}{item.User?.lastName?.[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{item.User?.firstName} {item.User?.lastName}</h3>
                      <p className="text-sm text-gray-500">{item.User?.email}</p>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${getStatusColor(item.verificationStatus)}`}>
                        {item.verificationStatus}
                      </span>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium">{item.User?.phone || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Experience</p>
                      <p className="text-sm font-medium">{item.experience || 0} years</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Hourly Rate</p>
                      <p className="text-sm font-medium">₦{parseFloat(item.hourlyRate || 0).toLocaleString()}/hr</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Average Rating</p>
                      <p className="text-sm font-medium">{parseFloat(item.averageRating || 0).toFixed(1)} / 5</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Total Reviews</p>
                      <p className="text-sm font-medium">{item.totalReviews || 0}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Total Bookings</p>
                      <p className="text-sm font-medium">{item.totalBookings || 0}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Country</p>
                      <p className="text-sm font-medium">{item.country || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">State</p>
                      <p className="text-sm font-medium">{item.state || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  {item.bio && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Bio</p>
                      <p className="text-sm text-gray-700">{item.bio}</p>
                    </div>
                  )}

                  {/* Specialties */}
                  {item.specialties && item.specialties.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {item.specialties.map((s, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {item.certifications && item.certifications.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Certifications</p>
                      <div className="flex flex-wrap gap-2">
                        {item.certifications.map((c, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {typeof c === 'string' ? c : c.name || JSON.stringify(c)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certificate Image */}
                  {item.certificateImage && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Certificate Image</p>
                      <img
                        src={item.certificateImage}
                        alt="Certificate"
                        className="w-full max-w-sm rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setEnlargedImage(item.certificateImage)}
                      />
                    </div>
                  )}

                  {/* Gallery Images */}
                  {item.galleryImages && item.galleryImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Gallery</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {item.galleryImages.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setEnlargedImage(img)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rejection reason */}
                  {item.verificationStatus === 'rejected' && item.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-xs text-red-400 uppercase tracking-wider mb-1">Rejection Reason</p>
                      <p className="text-sm text-red-700">{item.rejectionReason}</p>
                    </div>
                  )}
                </>
              )}

              {/* === FACILITY DETAILS === */}
              {selectedType === 'facility' && (
                <>
                  {/* Facility images */}
                  {item.images && item.images.length > 0 && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {item.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`${item.name} ${i + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setEnlargedImage(img)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Facility header */}
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.address}</p>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${getStatusColor(item.verificationStatus)}`}>
                      {item.verificationStatus}
                    </span>
                  </div>

                  {/* Owner info */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Owner</p>
                    <div className="flex items-center gap-3">
                      {item.Owner?.profileImage ? (
                        <img
                          src={item.Owner.profileImage}
                          alt={`${item.Owner.firstName} ${item.Owner.lastName}`}
                          className="w-10 h-10 rounded-full object-cover cursor-pointer"
                          onClick={() => setEnlargedImage(item.Owner.profileImage)}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#946BEF] flex items-center justify-center text-white text-sm font-semibold">
                          {item.Owner?.firstName?.[0]}{item.Owner?.lastName?.[0]}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{item.Owner?.firstName} {item.Owner?.lastName}</p>
                        <p className="text-xs text-gray-500">{item.Owner?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Price / Hour</p>
                      <p className="text-sm font-medium">₦{parseFloat(item.pricePerHour || 0).toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Capacity</p>
                      <p className="text-sm font-medium">{item.capacity || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Average Rating</p>
                      <p className="text-sm font-medium">{parseFloat(item.averageRating || 0).toFixed(1)} / 5</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Total Reviews</p>
                      <p className="text-sm font-medium">{item.totalReviews || 0}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Total Bookings</p>
                      <p className="text-sm font-medium">{item.totalBookings || 0}</p>
                    </div>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Description</p>
                      <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                  )}

                  {/* Amenities */}
                  {item.amenities && item.amenities.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Amenities</p>
                      <div className="flex flex-wrap gap-2">
                        {item.amenities.map((a, i) => (
                          <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                            {typeof a === 'string' ? a : a.name || JSON.stringify(a)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rules */}
                  {item.rules && item.rules.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Rules</p>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {item.rules.map((r, i) => (
                          <li key={i}>{typeof r === 'string' ? r : r.name || JSON.stringify(r)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Operating Hours */}
                  {item.operatingHours && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Operating Hours</p>
                      <p className="text-sm text-gray-700">
                        {typeof item.operatingHours === 'string' ? item.operatingHours : JSON.stringify(item.operatingHours, null, 2)}
                      </p>
                    </div>
                  )}

                  {/* Rejection reason */}
                  {item.verificationStatus === 'rejected' && item.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-xs text-red-400 uppercase tracking-wider mb-1">Rejection Reason</p>
                      <p className="text-sm text-red-700">{item.rejectionReason}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const getPageNumbers = () => {
    const { page, pages } = pagination;
    if (pages <= 5) return Array.from({ length: pages }, (_, i) => i + 1);

    const nums = [];
    if (page <= 3) {
      nums.push(1, 2, 3, 4, '...', pages);
    } else if (page >= pages - 2) {
      nums.push(1, '...', pages - 3, pages - 2, pages - 1, pages);
    } else {
      nums.push(1, '...', page - 1, page, page + 1, '...', pages);
    }
    return nums;
  };

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
      {activeButton === 'players' && renderPlayersTable()}
      {activeButton === 'coaches' && renderCoachesTable()}
      {activeButton === 'facility-owners' && renderFacilityOwnersTable()}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
        <p className="text-sm text-gray-500">
          Showing {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
          -{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
        </p>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md disabled:opacity-40 text-sm hover:bg-gray-50 transition-colors"
          >
            Prev
          </button>
          {getPageNumbers().map((num, idx) =>
            num === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-sm text-gray-400">...</span>
            ) : (
              <button
                key={num}
                onClick={() => setPagination(prev => ({ ...prev, page: num }))}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  pagination.page === num
                    ? 'bg-[#946BEF] text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {num}
              </button>
            )
          )}
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.pages || pagination.pages === 0}
            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md disabled:opacity-40 text-sm hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {renderDetailModal()}
    </div>
  );
};

export default Players;