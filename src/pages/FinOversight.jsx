// //pages/FinOversight.jsx
// import React, { useState } from 'react'
// import axios from 'axios';
// import { URL } from '../url';
// import {
//   TrendingUp
// } from 'lucide-react';

// const FinOversight = () => {
//     const [activeButton, setActiveButton] = useState('requests'); // 'transaction history' or 'payout history' or 'non pitch'

//     const communities = [
//         {
//             id: 'BK001',
//             payout: '#88837727',
//             recipient: 'Daniel Anderson',
//             bank: 'GTBank...7824',
//             amount: 'N20,000',
//             withdrawal: 'Weekly(Next Pay is Friday)',
//             requestDate: 'Jun 25,2025 9:15AM',

//         },
//         {
//             id: 'BK002',
//             payout: '#88837727',
//             recipient: 'Daniel Anderson',
//             bank: 'GTBank...7824',
//             amount: 'N20,000',
//             withdrawal: 'Weekly(Next Pay is Friday)',
//             requestDate: 'Jun 25,2025 9:15AM',
//         },
//         {
//             id: 'BK003',
//             payout: '#88837727',
//             recipient: 'Daniel Anderson',
//             bank: 'GTBank...7824',
//             amount: 'N20,000',
//             withdrawal: 'Weekly(Next Pay is Friday)',
//             requestDate: 'Jun 25,2025 9:15AM',
//         },
//         {
//             id: 'BK004',
//             payout: '#88837727',
//             recipient: 'Daniel Anderson',
//             bank: 'GTBank...7824',
//             amount: 'N20,000',
//             withdrawal: 'Weekly(Next Pay is Friday)',
//             requestDate: 'Jun 25,2025 9:15AM',
//         },
//         {
//             id: 'BK005',
//             payout: '#88837727',
//             recipient: 'Daniel Anderson',
//             bank: 'GTBank...7824',
//             amount: 'N20,000',
//             withdrawal: 'Weekly(Next Pay is Friday)',
//             requestDate: 'Jun 25,2025 9:15AM',
//         }
//     ];

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'Active':
//                 return 'bg-green-100 text-green-800';
//             case 'Inactive':
//                 return 'bg-yellow-100 text-yellow-800';
//             case 'Deactivated':
//                 return 'bg-red-100 text-red-800';
//             default:
//                 return 'bg-gray-100 text-gray-800';
//         }
//     };
//     return (
//         <div className='px-6 py-6'>
//  <div className='flex gap-x-6 pb-6'>

//           <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Total Bookings</p>
//                 <p className='font-semibold text-3xl'>25</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>

//   <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Facility Booking</p>
//                 <p className='font-semibold text-3xl'>5</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>

//             <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Coach Booking</p>
//                 <p className='font-semibold text-3xl'>1</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>




//         </div>




//             <div className='bg-gray-100 w-[340px] px-2 py-2 rounded-lg mb-6'>
//                 <div className='flex'>
//                     <button
//                         className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'requests'
//                             ? 'bg-white text-black'
//                             : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                             }`}
//                         onClick={() => setActiveButton('requests')}
//                     >
//                         Payout Requests
//                     </button>
//                     <button
//                         className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'payout'
//                             ? 'bg-white text-black'
//                             : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                             }`}
//                         onClick={() => setActiveButton('payout')}
//                     >
//                         Completed Payouts
//                     </button>



//                 </div>

//                 {/* Optional: Show which is selected */}
//                 {/* <div className="mt-4 text-sm text-gray-600">
//         Currently showing: {activeButton === 'recent' ? 'Recent Bookings' : "Today's Bookings"}
//       </div> */}

//             </div>


//             <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//                 <table className="min-w-full">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                                 Payout ID
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                                 Recipient
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                                 Bank
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                                 Amount
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                                 Withdrawal Schedule
//                             </th>
//                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                                 Request Date
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                                 Action
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {communities.map((booking) => (
//                             <tr key={booking.id} className="hover:bg-gray-50">
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                     {booking.payout}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                     {booking.recipient}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                     {booking.bank}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                     {booking.amount}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                     {booking.withdrawal}
//                                 </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                     {booking.requestDate}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF] cursor-pointer hover:underline">
//                                     View Community
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>


//         </div>
//     )
// }

// export default FinOversight







//pages/FinOversight.jsx - Mobile Responsive Version
import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../url';
import {
  TrendingUp
} from 'lucide-react';

const FinOversight = () => {
    const [activeButton, setActiveButton] = useState('requests'); // 'requests' or 'payout'

    const communities = [
        {
            id: 'BK001',
            payout: '#88837727',
            recipient: 'Daniel Anderson',
            bank: 'GTBank...7824',
            amount: 'N20,000',
            withdrawal: 'Weekly(Next Pay is Friday)',
            requestDate: 'Jun 25,2025 9:15AM',

        },
        {
            id: 'BK002',
            payout: '#88837727',
            recipient: 'Daniel Anderson',
            bank: 'GTBank...7824',
            amount: 'N20,000',
            withdrawal: 'Weekly(Next Pay is Friday)',
            requestDate: 'Jun 25,2025 9:15AM',
        },
        {
            id: 'BK003',
            payout: '#88837727',
            recipient: 'Daniel Anderson',
            bank: 'GTBank...7824',
            amount: 'N20,000',
            withdrawal: 'Weekly(Next Pay is Friday)',
            requestDate: 'Jun 25,2025 9:15AM',
        },
        {
            id: 'BK004',
            payout: '#88837727',
            recipient: 'Daniel Anderson',
            bank: 'GTBank...7824',
            amount: 'N20,000',
            withdrawal: 'Weekly(Next Pay is Friday)',
            requestDate: 'Jun 25,2025 9:15AM',
        },
        {
            id: 'BK005',
            payout: '#88837727',
            recipient: 'Daniel Anderson',
            bank: 'GTBank...7824',
            amount: 'N20,000',
            withdrawal: 'Weekly(Next Pay is Friday)',
            requestDate: 'Jun 25,2025 9:15AM',
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
                return 'bg-yellow-100 text-yellow-800';
            case 'Deactivated':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className='px-2 sm:px-4 lg:px-6 py-4 lg:py-6'>
            {/* Stats Cards - Mobile Responsive Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 pb-6'>
                <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl p-3 lg:p-4'>
                    <div className='flex gap-x-4 lg:gap-x-6 items-center'>
                        <div className="flex-1">
                            <p className='text-xs sm:text-sm'>Total Bookings</p>
                            <p className='font-semibold text-xl sm:text-2xl lg:text-3xl'>25</p>
                        </div>
                        <div className="text-right">
                            <p className='text-green-500'><TrendingUp size={16} /></p>
                            <p className='text-green-500 text-xs sm:text-sm'>50.6%</p>
                        </div>
                    </div>
                </div>

                <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl p-3 lg:p-4'>
                    <div className='flex gap-x-4 lg:gap-x-6 items-center'>
                        <div className="flex-1">
                            <p className='text-xs sm:text-sm'>Facility Booking</p>
                            <p className='font-semibold text-xl sm:text-2xl lg:text-3xl'>5</p>
                        </div>
                        <div className="text-right">
                            <p className='text-green-500'><TrendingUp size={16} /></p>
                            <p className='text-green-500 text-xs sm:text-sm'>50.6%</p>
                        </div>
                    </div>
                </div>

                <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl p-3 lg:p-4 sm:col-span-2 lg:col-span-1'>
                    <div className='flex gap-x-4 lg:gap-x-6 items-center'>
                        <div className="flex-1">
                            <p className='text-xs sm:text-sm'>Coach Booking</p>
                            <p className='font-semibold text-xl sm:text-2xl lg:text-3xl'>1</p>
                        </div>
                        <div className="text-right">
                            <p className='text-green-500'><TrendingUp size={16} /></p>
                            <p className='text-green-500 text-xs sm:text-sm'>50.6%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Buttons - Mobile Responsive */}
            <div className='bg-gray-100 w-full sm:w-[340px] px-2 py-2 rounded-lg mb-6'>
                <div className='flex flex-wrap gap-1'>
                    <button
                        className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${activeButton === 'requests'
                            ? 'bg-white text-black'
                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveButton('requests')}
                    >
                        Payout Requests
                    </button>
                    <button
                        className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${activeButton === 'payout'
                            ? 'bg-white text-black'
                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveButton('payout')}
                    >
                        Completed Payouts
                    </button>
                </div>
            </div>

            {/* Data Table - Mobile Responsive */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Payout ID
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden sm:table-cell">
                                Recipient
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
                                Bank
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Amount
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
                                Withdrawal Schedule
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
                                Request Date
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {communities.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <div>
                                        <div className="font-medium">{booking.payout}</div>
                                        <div className="sm:hidden text-xs text-gray-500 mt-1 space-y-1">
                                            <div className="truncate">{booking.recipient}</div>
                                            <div className="lg:hidden text-xs text-gray-400">
                                                {new Date(booking.requestDate).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                                    <div>
                                        <div>{booking.recipient}</div>
                                        <div className="lg:hidden text-xs text-gray-500 mt-1 space-y-1">
                                            <div>{booking.bank}</div>
                                            <div className="text-xs">{booking.withdrawal}</div>
                                            <div className="text-xs">
                                                {new Date(booking.requestDate).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric',
                                                    year: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                                    {booking.bank}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {booking.amount}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                                    <div className="max-w-[200px] truncate" title={booking.withdrawal}>
                                        {booking.withdrawal}
                                    </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                                    {booking.requestDate}
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-[#946BEF] cursor-pointer hover:underline">
                                    View
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FinOversight