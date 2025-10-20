import React from 'react'
import { Link } from 'react-router-dom';
import reduceText from '../../../utils/reduceText';

const FriendRequests = () => {
  return (
    <>
        <div className='flex justify-between items-center mb-4'>
            <h4 className='font-gilroySemibold text-lg'>Friend Requests</h4>
            <Link to='/friends' className='font-gilroyBold text-base text-cyan-500 px-4 py-2 rounded-full border border-cyan-100 hover:bg-cyan-100 hover:text-gray-800 transition-all ease-linear duration-200'>See All</Link>
        </div>
        <div className='flex flex-col gap-y-4 mb-8'>
            <div className='flex justify-between items-center'>
                <div className='inline-block w-10 h-10 rounded-full bg-secondary_bg'></div>
                <div className='inline-block mb-[-7px]'>
                    <h6 className='font-gilroyBold text-sm leading-none'>{reduceText('Ochako Uraraka', 14)}</h6>
                    <span className='font-gilroyNormal text-xs text-secondary_color leading-none'>2 hours ago</span>
                </div>
                <div className='inline-block'>
                    <button className='px-3 py-2 rounded-full font-gilroyBold text-sm bg-cyan-400 text-gray-800 mr-2'>Accept</button>
                    <button className='px-3 py-2 rounded-full font-gilroyBold text-sm bg-rose-600 text-white'>Reject</button>
                </div>
            </div>

            {/* demo user  */}
            <div className='flex justify-between items-center'>
                <div className='inline-block w-10 h-10 rounded-full bg-secondary_bg'></div>
                <div className='inline-block mb-[-7px]'>
                    <h6 className='font-gilroyBold text-sm leading-none'>{reduceText('Ochako Uraraka', 14)}</h6>
                    <span className='font-gilroyNormal text-xs text-secondary_color leading-none'>2 hours ago</span>
                </div>
                <div className='inline-block'>
                    <button className='px-3 py-2 rounded-full font-gilroyBold text-sm bg-cyan-400 text-gray-800 mr-2'>Accept</button>
                    <button className='px-3 py-2 rounded-full font-gilroyBold text-sm bg-rose-600 text-white'>Reject</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default FriendRequests