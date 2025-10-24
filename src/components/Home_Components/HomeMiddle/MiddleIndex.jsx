import React from 'react'
import Header from '../../header/Header'
import { LiveIcon } from '../../../svg/Live'
import { Media } from '../../../svg/Media'
import Feeling from '../../../svg/Feeling'

const MiddleIndex = () => {
  return (
    <div className='px-5'>
      <Header heading={'Feeds'}/>
      <div className='p-4 bg-gray-100 rounded-md mt-10'>
          <div className='flex items-center gap-x-4 p-4 rounded-full mb-3'>
            <div className='w-14 h-14 rounded-full bg-gray-400 border-2 border-gray-300 cursor-pointer'></div>
            <input type="text" placeholder="What's up say something...." readOnly className='w-[92%] focus:outline-none p-4 rounded-full font-gilroyNormal text-base'/>
          </div>
          <div className='border-t-2 border-t-cyan-500 pt-6 flex items-center justify-around'>
              <div className='flex items-center gap-x-3 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-300 transition-all ease-linear duration-100'>
                  <span>
                    <LiveIcon />
                  </span>
                  <span className='font-gilroySemibold text-base mb-[-6px]'>
                    Go Live
                  </span>
              </div>
              <div className='flex items-center gap-x-3 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-300 transition-all ease-linear duration-100'>
                  <span>
                    <Media />
                  </span>
                  <span className='font-gilroySemibold text-base mb-[-6px]'>
                    Image
                  </span>
              </div>
              <div className='flex items-center gap-x-3 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-300 transition-all ease-linear duration-100'>
                  <span>
                    <Feeling />
                  </span>
                  <span className='font-gilroySemibold text-base mb-[-6px]'>
                    Feeling
                  </span>
              </div>
          </div>
      </div>
    </div>
  )
}

export default MiddleIndex