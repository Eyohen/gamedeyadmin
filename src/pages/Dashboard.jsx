import React, { useState } from 'react'
import {
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {

  const bookings = [
    {
      id: 'BK001',
      user: 'John Smith',
      email: 'john@gmail.com',
      type:'Player',
      reference: '29894784323242',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-08',
      payment: 'N50000.00',
      status: 'Confirmed'
    },
    {
      id: 'BK002',
      user: 'Sarah Johnson',
      email: 'john@gmail.com',
      type:'Coach',
      reference: '29894784323242',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-08',
      payment: 'N35000.00',
      status: 'Pending'
    },
    {
      id: 'BK003',
      user: 'Mike Wilson',
      email: 'john@gmail.com',
      type:'Facility Owner',
      reference: '29894784323242',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-09',
      payment: 'N25000.00',
      status: 'Confirmed'
    },
    {
      id: 'BK004',
      user: 'Emily Davis',
      email: 'john@gmail.com',
      type:'Player',
      reference: '29894784323242',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-09',
      payment: 'N80000.00',
      status: 'Cancelled'
    },
    {
      id: 'BK005',
      user: 'David Brown',
      email: 'john@gmail.com',
      type:'Coach',
      reference: '29894784323242',
      description: 'uyereyeurywueyiu',
      paymentMethod: 'Debit Card',
      date: '2025-06-10',
      payment: 'N20000.00',
      status: 'Confirmed'
    }
  ];

  const payout = [
    {
      id: 'BK001',
      user: 'John Smith',
      bank: 'First bank...3242',
      amount: 'N50000.00',

    },
    {
      id: 'BK002',
      user: 'Sarah Johnson',
      bank: 'First bank...3242',
      amount: 'N50000.00',
    },
    {
      id: 'BK003',
      user: 'Mike Wilson',
      bank: 'First bank...3242',
      amount: 'N50000.00',
    },
    {
      id: 'BK004',
      user: 'Emily Davis',
      bank: 'First bank...3242',
      amount: 'N50000.00',
    },
    {
      id: 'BK005',
      user: 'David Brown',
      bank: 'First bank...3242',
      amount: 'N50000.00',
    }
  ];

  const dispute = [
    {
      id: 'BK001',
      user: 'John Smith',
      type: 'No Show',

    },
    {
      id: 'BK002',
      user: 'Sarah Johnson',
      type: 'Failed Payout',

    },
    {
      id: 'BK003',
      user: 'Mike Wilson',
      type: 'Facility Condition',

    },
    {
      id: 'BK004',
      user: 'Emily Davis',
      type: 'Aggressive',
    },
    {
      id: 'BK005',
      user: 'David Brown',
      type: 'No Show',

    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className='px-6 py-6'>
      <div className='max-w-[1000px]'>

      <div className='flex gap-x-6 pb-6'>
        <div className='grid grid-cols-3 gap-4'>

          <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

            <div className='flex gap-x-6 items-center'>
              <div>
                <p className='text-sm'>Total Revenue</p>
                <p className='font-semibold text-3xl'>N300M</p>
              </div>

              <div>
                <p className='text-green-500'><TrendingUp size={16} /></p>
                <p className='text-green-500'>50.6%</p>
              </div>

            </div>
          </div>

          <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

            <div className='flex gap-x-6 items-center'>
              <div>
                <p className='text-sm'>Total Facilities</p>
                <p className='font-semibold text-3xl'>500,000</p>
              </div>

              <div>
                <p className='text-green-500'><TrendingUp size={16} /></p>
                <p className='text-green-500'>50.6%</p>
              </div>

            </div>
          </div>

          <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
            <div className='flex gap-x-6 items-center'>
              <div>
                <p className='text-sm'>Total Coaches</p>
                <p className='font-semibold text-3xl'>1</p>
              </div>

              <div>
                <p className='text-green-500'><TrendingUp size={16} /></p>
                <p className='text-green-500'>50.6%</p>
              </div>

            </div>
          </div>


          <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
            <div className='flex gap-x-6 items-center'>
              <div>
                <p className='text-sm'>Total Users</p>
                <p className='font-semibold text-3xl'>200,000</p>
              </div>

              <div>
                <p className='text-green-500'><TrendingUp size={16} /></p>
                <p className='text-green-500'>50.6%</p>
              </div>

            </div>
          </div>


          <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
            <div className='flex gap-x-6 items-center'>
              <div>
                <p className='text-sm'>Total Communities</p>
                <p className='font-semibold text-3xl'>100,000</p>
              </div>

              <div>
                <p className='text-green-500'><TrendingUp size={16} /></p>
                <p className='text-green-500'>50.6%</p>
              </div>

            </div>
          </div>


          <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>
            <div className='flex gap-x-6 items-center'>
              <div>
                <p className='text-sm'>Total Sessions</p>
                <p className='font-semibold text-3xl'>50,000</p>
              </div>

              <div>
                <p className='text-green-500'><TrendingUp size={16} /></p>
                <p className='text-green-500'>50.6%</p>
              </div>

            </div>
          </div>



        </div>
      </div>

   <div className='flex justify-between py-1'>
            <p className='font-semibold'>New Users</p>
            <p className='text-[#946BEF]'>View All</p>
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
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.date}
                </td>
            
              </tr>
            ))}
          </tbody>
        </table>
      </div>




      <div className='flex justify-center gap-x-4 mt-6'>

        <div>
          <div className='flex justify-between py-1'>
            <p className='font-semibold'>Payout Requests</p>
            <p className='text-[#946BEF]'>View All</p>
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
                {payout.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.bank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF]">
                      View Request
                    </td>


                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
                      onClick={() => alert(`Viewing details for booking ${booking.id}`)}
                    >
                      View Details
                    </button>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        <div>
          <div className='flex justify-between py-1'>
            <p className='font-semibold'>Dispute Resolution</p>
            <p className='text-[#946BEF]'>View All</p>
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
                {dispute.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF]">
                      View Dispute
                    </td>

                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
                      onClick={() => alert(`Viewing details for booking ${booking.id}`)}
                    >
                      View Details
                    </button>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

</div>

    </div>
  )
}

export default Dashboard