import React, { useRef, useState } from 'react'
import { SearchIcon } from '../../svg/SearchIcon'
import SearchBox from './SearchBox'
import clickOutside from '../../utils/click'

const Header = ({heading}) => {

    const [show, setShow] = useState(false);
    const searchBox = useRef(null);

    clickOutside(searchBox, () => setShow(false))

  return (
    <div className='flex justify-between items-center'>
        <h2 className='hidden lg:block text-xl font-gilroyBold'>{heading}</h2>
        <div className='lg:hidden w-16 h-16 rounded-full bg-cyan-100'></div>
        <div className='w-[44%] relative flex justify-end lg:block'>
            <div onClick={() => setShow(true)}
                className='w-10 h-10 lg:h-auto lg:w-full lg:px-4 lg:py-2 border border-secondary_color flex justify-center lg:justify-start items-center gap-x-3 rounded-full'>
                <span className='text-secondary_color cursor-pointer'>
                    <SearchIcon />
                </span>
                <input type="text" placeholder='Search' className='w-full hidden lg:block focus:outline-none font-gilroyNormal text-base mb-[-6px]' />
            </div>
            {
                show && (
                    <div className='w-[170%] md:w-[110.8%] absolute top-0 lg:left-[-25.7px] bg-white' ref={searchBox}>
                        <SearchBox />
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Header