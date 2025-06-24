import React from 'react'
import profilepic from "../assets/profilepic.jpg"

const Profile = () => {
  return (
    <div className='px-6'>
      <div className='flex gap-3 items-center'>
        <img src={profilepic} className='rounded-full w-24 h-24 object-cover' />
        <div>
          <p className='font-semibold'>Abiodun Ayobami</p>
          <p className='font-thin'>Role: User</p>
        </div>
      </div>

      <div className='border-b pt-9'></div>

      <div className='flex gap-32 py-9'>


        <div>
          <p className='font-semibold text-lg'>Name</p>
          <p className='font-normal max-w-[250px]'>Make changes to your name</p>
        </div>

        <div>
          <div>
            <p className='py-1'>First Name</p>
            <input placeholder='Austin' className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]' />
          </div>
          <div>
            <p className='py-1 pt-3'>Last Name</p>
            <input placeholder='David' className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]' />
          </div>
        </div>



      </div>


      <div className='border-b '></div>


      <div className='flex gap-32 py-9'>
        <div>
          <p className='font-semibold text-lg'>Email Address</p>
          <p className='font-normal max-w-[250px]'>Make changes to your email</p>
        </div>

        <div>
          <div>
            <p className='py-1'>Email</p>
            <input placeholder='abiodunobami@gmail.com' className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]' />
          </div>

        </div>

      </div>


  <div className='border-b '></div>


<div className='flex gap-24 py-9'>
        <div>
          <p className='font-semibold text-lg'>Password</p>
          <p className='font-normal max-w-[250px]'>Make changes to your password</p>
        </div>

        <div>
          <div>
            <p className='py-1'>Password</p>
            <input placeholder='*********' className='px-2 rounded-2xl py-2 border border-gray-500 w-[320px]' />
          </div>
         
        </div>


</div>

<div className='flex gap-x-6'>
  <button className='border-2 border-[#946BEF] text-[#946BEF] px-12 py-2 rounded-lg'>Edit</button>
    <button className='bg-[#946BEF] text-white px-12 py-2 rounded-lg'>Save</button>

</div>

    </div>
  )
}

export default Profile