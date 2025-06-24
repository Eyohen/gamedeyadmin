import React,{useState} from 'react'
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import {
    MessageSquareMore 
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';



const Sessions = () => {
     const [activeButton, setActiveButton] = useState('events'); // 'events' or 'AMA's'


  return (
    <div className='px-6 py-6'>
               <div className='bg-gray-100 w-[170px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex'>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'events'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('events')}
          >
            Events
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'ama'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('ama')}
          >
            AMA's
          </button>



        </div>

        {/* Optional: Show which is selected */}
        {/* <div className="mt-4 text-sm text-gray-600">
        Currently showing: {activeButton === 'recent' ? 'Recent Bookings' : "Today's Bookings"}
      </div> */}

      </div>


      <div className='flex'>
        <div className='grid grid-cols-3 gap-4'>

            <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-orange-500 rounded-t-md'>
                 <MessageSquareMore size={50} color='#C2410c' />
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                    <p className='font-semibold text-md'>Becoming a Good Coach</p>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>


          <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-green-400 rounded-t-md'>
                 <MessageSquareMore size={50} className='text-green-700'/>
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                    <p className='font-semibold text-md'>Becoming a Good Coach</p>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>


          <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-red-300 rounded-t-md'>
                 <MessageSquareMore size={50} className='text-red-600' />
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                    <p className='font-semibold text-md'>Becoming a Good Coach</p>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>


          <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-blue-300 rounded-t-md'>
                 <MessageSquareMore size={50} className='text-blue-600' />
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                    <p className='font-semibold text-md'>Becoming a Good Coach</p>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>



          <div className='border border-black rounded-md '>
                <div className='flex justify-center items-center py-5 bg-orange-500 rounded-t-md'>
                 <MessageSquareMore size={50} color='#C2410c' />
                 </div>
                 <div className='p-2 bg-white rounded-b-md'>
                    <p className='font-semibold text-md'>Becoming a Good Coach</p>
                    <p className='text-sm'>27th Apr 2025</p>
                    <p className='text-sm'>Darkan Pitch, Lagos Nigeria</p>
                    <p className='text-sm'>Total Registered</p>
                    <p className='text-sm'>200+</p>
                 </div>
            </div>



        </div>
      </div>
      


    </div>
  )
}

export default Sessions