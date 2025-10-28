import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetResetMailMutation } from '../../services/authApi'
import toast from 'react-hot-toast'



const ProfileFound = ({user, setComponent}) => {

    const [resetMail,{isLoading}] = useGetResetMailMutation();
    const [disabled, setDisabled] = useState(false)

    const handleSendToken = async () => {
        try {
            const response = await resetMail(user.email).unwrap();
            toast.success(response?.message);
            setDisabled(true);
            setTimeout(() => {
                setComponent(2)
            },2000)
        } catch (err) {
            toast.error('Opps, Something went wrong')
        }
    }

  return (
    <div className='bg-gray-50 px-8 py-4 rounded-md shadow-md w-[30%]'>
        <h2 className='font-gilroySemibold text-2xl text-gray-800 mb-4 pb-2 border-b border-b-gray-200/70'>Profile Found</h2>
        <div className='flex justify-center items-center flex-col mt-4'>
            <div className='w-16 h-16 bg-gray-500 rounded-full mb-4 overflow-hidden'>
                <img src={user.profilePic} alt="user-dp" className='w-full h-full object-cover' />
            </div>
            <span className='font-gilroyMedium text-lg text-black'>{user.email}</span>
            <div className='flex justify-center items-center mt-8 gap-x-4'>
                <Link to='/login'
                        className='inline-block px-6 py-2 ml-5 rounded-md bg-gray-200 font-gilroyNormal text-lg text-black hover:bg-gray-300 transition-all ease-linear duration-150'>
                    Not You?
                </Link>
                <button onClick={handleSendToken}
                        disabled={isLoading || disabled}
                        className='px-6 py-2 rounded-md bg-sky-400 font-gilroyNormal text-lg text-white hover:bg-sky-500 transition-all ease-linear duration-150 disabled:cursor-not-allowed'>
                    {isLoading? 'Sending...' : 'Send Token'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProfileFound