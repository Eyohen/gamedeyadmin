// import React, {useState} from 'react'
// import axios from 'axios';
// import { URL } from '../url';

// const Users = () => {
//       const [activeButton, setActiveButton] = useState('players'); // 'transaction history' or 'payout history' or 'non pitch'

//     const bookings = [
//     {
//       id: 'BK001',
//       user: 'John Smith',
//       reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-08',
//       payment: 'N50000.00',
//       status: 'Active'
//     },
//     {
//       id: 'BK002',
//       user: 'Sarah Johnson',
//         reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-08',
//       payment: 'N35000.00',
//       status: 'Inactive'
//     },
//     {
//       id: 'BK003',
//       user: 'Mike Wilson',
   
//      reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-09',
//       payment: 'N25000.00',
//       status: 'Active'
//     },
//     {
//       id: 'BK004',
//       user: 'Emily Davis',
//    reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-09',
//       payment: 'N80000.00',
//       status: 'Deactivated'
//     },
//     {
//       id: 'BK005',
//       user: 'David Brown',
 
//    reference:'29894784323242',
//       description:'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-10',
//       payment: 'N20000.00',
//       status: 'Active'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active':
//         return 'bg-green-100 text-green-800';
//       case 'Inactive':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Deactivated':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };
//   return (
//     <div className='px-6 py-6'>


//           <div className='bg-gray-100 w-[350px] px-2 py-2 rounded-lg mb-6'>
//         <div className='flex'>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'players'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('today')}
//           >
//             Players
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'facility-owner'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('facility-owner')}
//           >
//             Facility Owners
//           </button>
//            <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'coaches'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('coaches')}
//           >
//             Coaches
//           </button>


//         </div>

//         {/* Optional: Show which is selected */}
//         {/* <div className="mt-4 text-sm text-gray-600">
//         Currently showing: {activeButton === 'recent' ? 'Recent Bookings' : "Today's Bookings"}
//       </div> */}

//       </div>
      
//         <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Reference
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                Description
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Payment Method
//                 </th>

//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Status
//                 </th>
  
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {bookings.map((booking) => (
//                 <tr key={booking.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                      {new Date(booking.date).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.payment}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.reference}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.description}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.paymentMethod}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
//                       {booking.status}
//                     </span>
//                   </td>
//                   {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
//                       onClick={() => alert(`Viewing details for booking ${booking.id}`)}
//                     >
//                       View Details
//                     </button>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//     </div>
//   )
// }

// export default Users








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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Join Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.phone || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <select 
                  value={user.status}
                  onChange={(e) => updateUserStatus(user.id, e.target.value)}
                  className="text-[#946BEF] bg-transparent border-none cursor-pointer hover:underline"
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Experience
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Hourly Rate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Verification Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {coaches.map((coach) => (
            <tr key={coach.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {coach.User?.firstName} {coach.User?.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {coach.User?.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {coach.experience || 0} years
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₦{parseFloat(coach.hourlyRate || 0).toLocaleString()}/hr
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(coach.verificationStatus)}`}>
                  {coach.verificationStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <select 
                  value={coach.verificationStatus}
                  onChange={(e) => updateCoachVerification(coach.id, e.target.value)}
                  className="text-[#946BEF] bg-transparent border-none cursor-pointer hover:underline"
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Facility Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Price/Hour
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Verification Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {facilityOwners.map((facility) => (
            <tr key={facility.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {facility.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {facility.Owner?.firstName} {facility.Owner?.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {facility.address?.slice(0, 30)}...
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₦{parseFloat(facility.pricePerHour || 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(facility.verificationStatus)}`}>
                  {facility.verificationStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <select 
                  value={facility.verificationStatus}
                  onChange={(e) => updateFacilityVerification(facility.id, e.target.value)}
                  className="text-[#946BEF] bg-transparent border-none cursor-pointer hover:underline"
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
    <div className='px-6 py-6'>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Filter Buttons */}
      <div className='bg-gray-100 w-[350px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex'>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'players'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('players')}
          >
            Players
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'facility-owners'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('facility-owners')}
          >
            Facility Owners
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'coaches'
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

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-gray-100 rounded-md">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50"
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