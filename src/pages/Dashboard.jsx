// import React, { useState } from 'react'
// import {
//   TrendingUp
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';


// const Dashboard = () => {

//   const bookings = [
//     {
//       id: 'BK001',
//       user: 'John Smith',
//       email: 'john@gmail.com',
//       type:'Player',
//       reference: '29894784323242',
//       description: 'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-08',
//       payment: 'N50000.00',
//       status: 'Confirmed'
//     },
//     {
//       id: 'BK002',
//       user: 'Sarah Johnson',
//       email: 'john@gmail.com',
//       type:'Coach',
//       reference: '29894784323242',
//       description: 'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-08',
//       payment: 'N35000.00',
//       status: 'Pending'
//     },
//     {
//       id: 'BK003',
//       user: 'Mike Wilson',
//       email: 'john@gmail.com',
//       type:'Facility Owner',
//       reference: '29894784323242',
//       description: 'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-09',
//       payment: 'N25000.00',
//       status: 'Confirmed'
//     },
//     {
//       id: 'BK004',
//       user: 'Emily Davis',
//       email: 'john@gmail.com',
//       type:'Player',
//       reference: '29894784323242',
//       description: 'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-09',
//       payment: 'N80000.00',
//       status: 'Cancelled'
//     },
//     {
//       id: 'BK005',
//       user: 'David Brown',
//       email: 'john@gmail.com',
//       type:'Coach',
//       reference: '29894784323242',
//       description: 'uyereyeurywueyiu',
//       paymentMethod: 'Debit Card',
//       date: '2025-06-10',
//       payment: 'N20000.00',
//       status: 'Confirmed'
//     }
//   ];

//   const payout = [
//     {
//       id: 'BK001',
//       user: 'John Smith',
//       bank: 'First bank...3242',
//       amount: 'N50000.00',

//     },
//     {
//       id: 'BK002',
//       user: 'Sarah Johnson',
//       bank: 'First bank...3242',
//       amount: 'N50000.00',
//     },
//     {
//       id: 'BK003',
//       user: 'Mike Wilson',
//       bank: 'First bank...3242',
//       amount: 'N50000.00',
//     },
//     {
//       id: 'BK004',
//       user: 'Emily Davis',
//       bank: 'First bank...3242',
//       amount: 'N50000.00',
//     },
//     {
//       id: 'BK005',
//       user: 'David Brown',
//       bank: 'First bank...3242',
//       amount: 'N50000.00',
//     }
//   ];

//   const dispute = [
//     {
//       id: 'BK001',
//       user: 'John Smith',
//       type: 'No Show',

//     },
//     {
//       id: 'BK002',
//       user: 'Sarah Johnson',
//       type: 'Failed Payout',

//     },
//     {
//       id: 'BK003',
//       user: 'Mike Wilson',
//       type: 'Facility Condition',

//     },
//     {
//       id: 'BK004',
//       user: 'Emily Davis',
//       type: 'Aggressive',
//     },
//     {
//       id: 'BK005',
//       user: 'David Brown',
//       type: 'No Show',

//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Confirmed':
//         return 'bg-green-100 text-green-800';
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };
//   return (
//     <div className='px-6 py-6'>
//       <div className='max-w-[1000px]'>

//       <div className='flex gap-x-6 pb-6'>
//         <div className='grid grid-cols-3 gap-4'>

//           <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Total Revenue</p>
//                 <p className='font-semibold text-3xl'>N300M</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>

//           <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Total Facilities</p>
//                 <p className='font-semibold text-3xl'>500,000</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>

//           <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Total Coaches</p>
//                 <p className='font-semibold text-3xl'>1</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>


//           <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Total Users</p>
//                 <p className='font-semibold text-3xl'>200,000</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>


//           <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Total Communities</p>
//                 <p className='font-semibold text-3xl'>100,000</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>


//           <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Total Sessions</p>
//                 <p className='font-semibold text-3xl'>50,000</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>



//         </div>
//       </div>

//    <div className='flex justify-between py-1'>
//             <p className='font-semibold'>New Users</p>
//             <p className='text-[#946BEF]'>View All</p>
//           </div>
//       <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Email Address
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 User Type
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                 Join Date
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {bookings.map((booking) => (
//               <tr key={booking.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {booking.user}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {booking.email}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {booking.type}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {booking.date}
//                 </td>
            
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>




//       <div className='flex justify-center gap-x-4 mt-6'>

//         <div>
//           <div className='flex justify-between py-1'>
//             <p className='font-semibold'>Payout Requests</p>
//             <p className='text-[#946BEF]'>View All</p>
//           </div>
//           <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                     Bank Details
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                     Amount
//                   </th>


//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                     Action
//                   </th>

//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {payout.map((booking) => (
//                   <tr key={booking.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {booking.user}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {booking.bank}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {booking.amount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF]">
//                       View Request
//                     </td>


//                     {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
//                       onClick={() => alert(`Viewing details for booking ${booking.id}`)}
//                     >
//                       View Details
//                     </button>
//                   </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//         </div>

//         <div>
//           <div className='flex justify-between py-1'>
//             <p className='font-semibold'>Dispute Resolution</p>
//             <p className='text-[#946BEF]'>View All</p>
//           </div>
//           <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                     Dispute Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                     Action
//                   </th>


//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {dispute.map((booking) => (
//                   <tr key={booking.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {booking.user}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {booking.type}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF]">
//                       View Dispute
//                     </td>

//                     {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
//                       onClick={() => alert(`Viewing details for booking ${booking.id}`)}
//                     >
//                       View Details
//                     </button>
//                   </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//         </div>

//       </div>

// </div>

//     </div>
//   )
// }

// export default Dashboard






import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [payoutRequests, setPayoutRequests] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dashboard overview data
  useEffect(() => {
    fetchDashboardData();
    fetchRecentUsers();
    // fetchPayoutRequests();
    // fetchDisputes();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${URL}/api/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    }
  };

  const fetchRecentUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${URL}/api/admin/users?limit=5&sortBy=createdAt&sortOrder=DESC`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setRecentUsers(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching recent users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder data for features not yet implemented
  const payoutRequestsData = [
    {
      id: 'PR001',
      user: 'John Smith',
      bank: 'First bank...3242',
      amount: 'N50,000.00',
    },
    {
      id: 'PR002',
      user: 'Sarah Johnson',
      bank: 'Access bank...1234',
      amount: 'N35,000.00',
    },
    {
      id: 'PR003',
      user: 'Mike Wilson',
      bank: 'GTBank...5678',
      amount: 'N25,000.00',
    },
    {
      id: 'PR004',
      user: 'Emily Davis',
      bank: 'UBA...9012',
      amount: 'N80,000.00',
    },
    {
      id: 'PR005',
      user: 'David Brown',
      bank: 'Zenith...3456',
      amount: 'N20,000.00',
    }
  ];

  const disputeData = [
    {
      id: 'DS001',
      user: 'John Smith',
      type: 'No Show',
    },
    {
      id: 'DS002',
      user: 'Sarah Johnson',
      type: 'Failed Payout',
    },
    {
      id: 'DS003',
      user: 'Mike Wilson',
      type: 'Facility Condition',
    },
    {
      id: 'DS004',
      user: 'Emily Davis',
      type: 'Aggressive Behavior',
    },
    {
      id: 'DS005',
      user: 'David Brown',
      type: 'No Show',
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className='px-6 py-6'>
      <div className='max-w-[1000px]'>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Dashboard Cards */}
        <div className='flex gap-x-6 pb-6'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
              <div className='flex gap-x-6 items-center'>
                <div>
                  <p className='text-sm'>Total Revenue</p>
                  <p className='font-semibold text-3xl'>
                    {dashboardData ? formatCurrency(dashboardData.revenue.total) : 'N0'}
                  </p>
                </div>
                <div>
                  <p className='text-green-500'><TrendingUp size={16} /></p>
                  <p className='text-green-500'>
                    {dashboardData ? formatCurrency(dashboardData.revenue.thisMonth) : 'N0'}
                  </p>
                </div>
              </div>
            </div>

            <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
              <div className='flex gap-x-6 items-center'>
                <div>
                  <p className='text-sm'>Total Facilities</p>
                  <p className='font-semibold text-3xl'>
                    {dashboardData ? formatNumber(dashboardData.facilities.total) : '0'}
                  </p>
                </div>
                <div>
                  <p className='text-green-500'><TrendingUp size={16} /></p>
                  <p className='text-green-500'>
                    {dashboardData ? dashboardData.facilities.verified : '0'}
                  </p>
                </div>
              </div>
            </div>

            <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
              <div className='flex gap-x-6 items-center'>
                <div>
                  <p className='text-sm'>Total Coaches</p>
                  <p className='font-semibold text-3xl'>
                    {dashboardData ? formatNumber(dashboardData.coaches.total) : '0'}
                  </p>
                </div>
                <div>
                  <p className='text-green-500'><TrendingUp size={16} /></p>
                  <p className='text-green-500'>
                    {dashboardData ? dashboardData.coaches.verified : '0'}
                  </p>
                </div>
              </div>
            </div>

            <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
              <div className='flex gap-x-6 items-center'>
                <div>
                  <p className='text-sm'>Total Users</p>
                  <p className='font-semibold text-3xl'>
                    {dashboardData ? formatNumber(dashboardData.users.total) : '0'}
                  </p>
                </div>
                <div>
                  <p className='text-green-500'><TrendingUp size={16} /></p>
                  <p className='text-green-500'>
                    {dashboardData ? dashboardData.users.newThisMonth : '0'}
                  </p>
                </div>
              </div>
            </div>

            <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
              <div className='flex gap-x-6 items-center'>
                <div>
                  <p className='text-sm'>Total Communities</p>
                  <p className='font-semibold text-3xl'>
                    {dashboardData ? formatNumber(dashboardData.community?.totalPosts || 0) : '0'}
                  </p>
                </div>
                <div>
                  <p className='text-green-500'><TrendingUp size={16} /></p>
                  <p className='text-green-500'>
                    {dashboardData ? dashboardData.community?.postsThisMonth || '0' : '0'}
                  </p>
                </div>
              </div>
            </div>

            <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
              <div className='flex gap-x-6 items-center'>
                <div>
                  <p className='text-sm'>Total Bookings</p>
                  <p className='font-semibold text-3xl'>
                    {dashboardData ? formatNumber(dashboardData.bookings.total) : '0'}
                  </p>
                </div>
                <div>
                  <p className='text-green-500'><TrendingUp size={16} /></p>
                  <p className='text-green-500'>
                    {dashboardData ? dashboardData.bookings.thisMonth : '0'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Users Table */}
        <div className='flex justify-between py-1'>
          <p className='font-semibold'>New Users</p>
          <p className='text-[#946BEF] cursor-pointer hover:underline'>View All</p>
        </div>
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  User Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Join Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.userType || 'Player'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payout Requests and Disputes */}
        <div className='flex justify-center gap-x-4 mt-6'>
          {/* Payout Requests */}
          <div>
            <div className='flex justify-between py-1'>
              <p className='font-semibold'>Payout Requests</p>
              <p className='text-[#946BEF] cursor-pointer hover:underline'>View All</p>
            </div>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                      Bank Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payoutRequestsData.map((payout) => (
                    <tr key={payout.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payout.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payout.bank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payout.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF] cursor-pointer hover:underline">
                        View Request
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dispute Resolution */}
          <div>
            <div className='flex justify-between py-1'>
              <p className='font-semibold'>Dispute Resolution</p>
              <p className='text-[#946BEF] cursor-pointer hover:underline'>View All</p>
            </div>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                      Dispute Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disputeData.map((dispute) => (
                    <tr key={dispute.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dispute.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dispute.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF] cursor-pointer hover:underline">
                        View Dispute
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;