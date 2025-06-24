import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../url';
import {
  TrendingUp
} from 'lucide-react';

const DisputeResolution = () => {
    const [activeButton, setActiveButton] = useState('bookings'); // 'transaction history' or 'payout history' or 'non pitch'

    const communities = [
        {
            id: 'BK001',
            payout: '#88837727',
            recipient: 'No-show',
            bank: 'Player:Sarah K Vs Coach:David L.',
            amount: '#BK-0625-4891',
            withdrawal: 'Jun 26, 2024 10:30AM',
            requestDate: 'Pending',

        },
        {
            id: 'BK002',
            payout: '#88837727',
            recipient: 'No-show',
            bank: 'Player:Sarah K Vs Coach:David L.',
            amount: '#BK-0625-4891',
            withdrawal: 'Jun 26, 2024 10:30AM',
            requestDate: 'Pending',
        },
        {
            id: 'BK003',
            payout: '#88837727',
            recipient: 'No-show',
            bank: 'Player:Sarah K Vs Coach:David L.',
            amount: '#BK-0625-4891',
            withdrawal: 'Jun 26, 2024 10:30AM',
            requestDate: 'Pending',
        },
        {
            id: 'BK004',
            payout: '#88837727',
            recipient: 'No-show',
            bank: 'Player:Sarah K Vs Coach:David L.',
            amount: '#BK-0625-4891',
            withdrawal: 'Jun 26, 2024 10:30AM',
            requestDate: 'Pending',
        },
        {
            id: 'BK005',
            payout: '#88837727',
            recipient: 'No-show',
            bank: 'Player:Sarah K Vs Coach:David L.',
            amount: '#BK-0625-4891',
            withdrawal: 'Jun 26, 2024 10:30AM',
            requestDate: 'Pending',
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
        <div className='px-6 py-6'>

            <div className='bg-gray-100 w-[200px] px-2 py-2 rounded-lg mb-6'>
                <div className='flex'>
                    <button
                        className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'bookings'
                            ? 'bg-white text-black'
                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveButton('bookings')}
                    >
                        Bookings
                    </button>
                    <button
                        className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'payouts'
                            ? 'bg-white text-black'
                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveButton('payouts')}
                    >
                       Payouts
                    </button>



                </div>

                {/* Optional: Show which is selected */}
                {/* <div className="mt-4 text-sm text-gray-600">
        Currently showing: {activeButton === 'recent' ? 'Recent Bookings' : "Today's Bookings"}
      </div> */}

            </div>


            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Case ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Dispute Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Parties Involved
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Booking Reference
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Submitted Date
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
                        {communities.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {booking.payout}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {booking.recipient}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {booking.bank}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {booking.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {booking.withdrawal}
                                </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {booking.requestDate}
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
    )
}

export default DisputeResolution