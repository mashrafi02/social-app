import React from 'react'
import { BackIcon } from '../../../../../svg/backIcon'
import { Moon } from '../../../../../svg/Moon'

const DisplayMode = ({setDisplay}) => {
  return (
        <div className='p-4'>
            <div className='flex items-center gap-x-3 mb-4 cursor-pointer'>
                <div className='rounded-full p-2 bg-gray-300 text-gray-800 hover:text-secondary_color'
                     onClick={() => setDisplay(false)}>
                    <BackIcon />
                </div>
                <p className='font-gilroySemibold text-base'>Display & Accessibility</p>
            </div>
            <div className='flex gap-x-4 cursor-pointer'>
                <div className='rounded-full p-2 bg-gray-300 text-gray-800 self-start'>
                    <Moon />
                </div>
                <div>
                    <h4 className='font-gilroySemibold'>Dark Mode</h4>
                    <p className='font-gilroyNormal text-secondary_color text-sm mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing eli</p>
                    <div>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="dark" className='cursor-pointer font-gilroySemibold text-sm'>On</label>
                            <input type="radio" name="mode" id="dark" className='mr-10 cursor-pointer'/>
                        </div>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="white" className='cursor-pointer font-gilroySemibold text-sm'>Off</label>
                            <input type="radio" name="mode" id="white" className='mr-10 cursor-pointer'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default DisplayMode