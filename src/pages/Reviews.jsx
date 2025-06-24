import React,{useState} from 'react'
import {
  TrendingUp,
  Star,
  Trash
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import stadium1 from '../assets/stadium1.png'
import stadium2 from '../assets/stadium2.png'

const Reviews = () => {
    const [activeButton, setActiveButton] = useState('given'); // 

  return (
    <div>
  <div className='bg-gray-100 w-[350px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex'>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'given'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('given')}
          >
            Given Reviews
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'completed'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveButton('completed')}
          >
            Completed Sessions
          </button>

        </div>

        {/* Optional: Show which is selected */}
        {/* <div className="mt-4 text-sm text-gray-600">
        Currently showing: {activeButton === 'recent' ? 'Recent Bookings' : "Today's Bookings"}
      </div> */}

      </div>


      <div className='pt-2'>
        <p className='font-medium '>Facility</p>

         <div className='flex gap-x-2 pt-2'>
        <img src={stadium1} className='w-8 h-8 object-cover' />
        <p className='font-thin'>Don Sport Facility</p>
        </div>

        <div className='flex gap-x-2 items-center pt-2'>
        <Star color={'orange'} size={20}/>
          <Star color={'orange'} size={20}/>
            <Star color={'orange'} size={20}/>
              <Star color={'orange'} size={20}/> 
        <p>15 - 01 - 2025</p>
        </div>

        <p className='text-sm pt-2 max-w-[1000px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet consectetur nisl vel ultricies. Nulla sit amet quam ultrices, suscipit nibh eget, ornare ipsum. Integer ac leo eu tortor consectetur tempus. Quisque sem lorem, varius id tortor at, ultrices tristique quam. Vestibulum id felis accumsan, placerat arcu vitae, egestas risus. Aliquam erat purus, interdum sed varius eu, placerat id elit. Sed a nibh imperdiet mauris vestibulum efficitur. </p>

<div className='flex gap-x-6 pt-2'>
  <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg'>Edit</button>
    <button className='bg-red-800 text-white px-4 py-2 rounded-lg'><Trash /></button>

</div>


      </div>

      <div className='border-b pt-6'></div>


         <div className='pt-6'>
        <p className='font-medium '>Facility</p>

         <div className='flex gap-x-2 pt-2'>
        <img src={stadium1} className='w-8 h-8 object-cover' />
        <p className='font-thin'>Don Sport Facility</p>
        </div>

        <div className='flex gap-x-2 items-center pt-2'>
        <Star color={'orange'} size={20}/>
          <Star color={'orange'} size={20}/>
            <Star color={'orange'} size={20}/>
              <Star color={'orange'} size={20}/> 
        <p>15 - 01 - 2025</p>
        </div>

        <p className='text-sm pt-2 max-w-[1000px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet consectetur nisl vel ultricies. Nulla sit amet quam ultrices, suscipit nibh eget, ornare ipsum. Integer ac leo eu tortor consectetur tempus. Quisque sem lorem, varius id tortor at, ultrices tristique quam. Vestibulum id felis accumsan, placerat arcu vitae, egestas risus. Aliquam erat purus, interdum sed varius eu, placerat id elit. Sed a nibh imperdiet mauris vestibulum efficitur. </p>

<div className='flex gap-x-6 pt-2'>
  <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg'>Edit</button>
    <button className='bg-red-800 text-white px-4 py-2 rounded-lg'><Trash /></button>

</div>


      </div>

      <div className='border-b pt-6'></div>

    </div>
  )
}

export default Reviews