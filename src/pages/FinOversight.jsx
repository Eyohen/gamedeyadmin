//pages/FinOversight.jsx - Mobile Responsive Version
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { URL } from '../url';
import {
  TrendingUp
} from 'lucide-react';

const FinOversight = () => {
    const [activeButton, setActiveButton] = useState('all'); // 'all', 'confirmed', 'completed'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [overview, setOverview] = useState({
        totalBookings: 0,
        facilityBookings: 0,
        coachBookings: 0,
        totalRevenue: 0,
        growthPercentage: 0
    });

    const token = localStorage.getItem('adminToken');

    // Fetch financial overview
    const fetchFinancialOverview = async () => {
        try {
            console.log('🔵 [FRONTEND] Fetching financial overview...');
            console.log('URL:', `${URL}/admin/financial-overview`);
            console.log('Token:', token ? 'Present' : 'Missing');

            const response = await axios.get(`${URL}/admin/financial-overview`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('🟢 [FRONTEND] Financial overview response:', response.data);

            if (response.data.success) {
                setOverview(response.data.data);
                console.log('✅ [FRONTEND] Overview set:', response.data.data);
            }
        } catch (err) {
            console.error('🔴 [FRONTEND] Error fetching financial overview:', err);
            console.error('Error response:', err.response?.data);
        }
    };

    // Fetch bookings
    const fetchBookings = async (status = 'all') => {
        try {
            console.log('🔵 [FRONTEND] Fetching bookings with status:', status);
            console.log('URL:', `${URL}/admin/bookings`);
            console.log('Token:', token ? 'Present' : 'Missing');

            setLoading(true);
            setError(null);
            const response = await axios.get(`${URL}/api/admin/bookings`, {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { status, limit: 50 }
            });

            console.log('🟢 [FRONTEND] Bookings response:', response.data);

            if (response.data.success) {
                setBookings(response.data.data.bookings);
                setTotalRevenue(response.data.data.totalRevenueValue || 0);
                console.log('✅ [FRONTEND] Bookings set:', response.data.data.bookings.length, 'items');
                console.log('✅ [FRONTEND] Total revenue:', response.data.data.totalRevenueValue);
            }
        } catch (err) {
            console.error('🔴 [FRONTEND] Error fetching bookings:', err);
            console.error('Error response:', err.response?.data);
            setError('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on mount and when active button changes
    useEffect(() => {
        fetchFinancialOverview();
    }, []);

    useEffect(() => {
        fetchBookings(activeButton);
    }, [activeButton]);

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
                            <p className='font-semibold text-xl sm:text-2xl lg:text-3xl'>
                                {overview.totalBookings}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className={overview.growthPercentage >= 0 ? 'text-green-500' : 'text-red-500'}>
                                <TrendingUp size={16} />
                            </p>
                            <p className={overview.growthPercentage >= 0 ? 'text-green-500 text-xs sm:text-sm' : 'text-red-500 text-xs sm:text-sm'}>
                                {overview.growthPercentage.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl p-3 lg:p-4'>
                    <div className='flex gap-x-4 lg:gap-x-6 items-center'>
                        <div className="flex-1">
                            <p className='text-xs sm:text-sm'>Facility Booking</p>
                            <p className='font-semibold text-xl sm:text-2xl lg:text-3xl'>
                                {overview.facilityBookings}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className={overview.growthPercentage >= 0 ? 'text-green-500' : 'text-red-500'}>
                                <TrendingUp size={16} />
                            </p>
                            <p className={overview.growthPercentage >= 0 ? 'text-green-500 text-xs sm:text-sm' : 'text-red-500 text-xs sm:text-sm'}>
                                {overview.growthPercentage.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl p-3 lg:p-4 sm:col-span-2 lg:col-span-1'>
                    <div className='flex gap-x-4 lg:gap-x-6 items-center'>
                        <div className="flex-1">
                            <p className='text-xs sm:text-sm'>Coach Booking</p>
                            <p className='font-semibold text-xl sm:text-2xl lg:text-3xl'>
                                {overview.coachBookings}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className={overview.growthPercentage >= 0 ? 'text-green-500' : 'text-red-500'}>
                                <TrendingUp size={16} />
                            </p>
                            <p className={overview.growthPercentage >= 0 ? 'text-green-500 text-xs sm:text-sm' : 'text-red-500 text-xs sm:text-sm'}>
                                {overview.growthPercentage.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Total Revenue Display */}
            <div className='bg-gradient-to-r from-purple-500 to-purple-600 border border-black border-r-[6px] border-b-[4px] rounded-2xl p-4 lg:p-6 mb-6 text-white'>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-sm opacity-90'>Total Platform Revenue</p>
                        <p className='font-bold text-3xl lg:text-4xl mt-1'>
                            ₦{(overview.totalRevenue || 0).toLocaleString()}
                        </p>
                        <p className='text-xs opacity-80 mt-1'>From confirmed & completed bookings</p>
                    </div>
                </div>
            </div>

            {/* Filter Buttons - Mobile Responsive */}
            <div className='bg-gray-100 w-full sm:w-[420px] px-2 py-2 rounded-lg mb-6'>
                <div className='flex flex-wrap gap-1'>
                    <button
                        className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${activeButton === 'all'
                            ? 'bg-white text-black'
                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveButton('all')}
                    >
                        All Bookings
                    </button>
                    <button
                        className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${activeButton === 'confirmed'
                            ? 'bg-white text-black'
                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveButton('confirmed')}
                    >
                        Confirmed
                    </button>
                    <button
                        className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${activeButton === 'completed'
                            ? 'bg-white text-black'
                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveButton('completed')}
                    >
                        Completed
                    </button>
                </div>
            </div>

            {/* Data Table - Mobile Responsive */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Booking ID
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden sm:table-cell">
                                User
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
                                Service
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Amount
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden md:table-cell">
                                Sport
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
                                Booking Date
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                    Loading booking data...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-red-500">
                                    {error}
                                </td>
                            </tr>
                        ) : bookings.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <div>
                                            <div className="font-medium">{booking.bookingId}</div>
                                            <div className="sm:hidden text-xs text-gray-500 mt-1">
                                                <div className="truncate">{booking.userName}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">
                                                    {new Date(booking.bookingDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                                        <div>
                                            <div>{booking.userName}</div>
                                            <div className="text-xs text-gray-500">{booking.userEmail}</div>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                                        <div>
                                            <div>{booking.serviceName}</div>
                                            <div className="text-xs text-gray-500 capitalize">{booking.bookingType}</div>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        {booking.amount}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                                        {booking.sport}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                                        {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                            booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FinOversight