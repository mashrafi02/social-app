import React from 'react';
import { useSelector } from 'react-redux';


const LeftProfile = () => {
  const {userData} = useSelector(state => state.auth.user);

  return (
    <div className='mb-6'>
        <div className='w-20 xl:w-28 h-20 xl:h-28 rounded-full bg-cyan-100 mx-auto'></div>
        <div className='hidden 2xl:block text-center mt-4'>
            <h4 className='font-gilroyBold capitalize'>{userData?.fName} {userData?.lName}</h4>
            <p className='text-base font-gilroyNormal'>{userData?.email}</p>
        </div>
    </div>
  )
}

export default LeftProfile