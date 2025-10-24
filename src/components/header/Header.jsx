import React, { useRef, useState } from 'react'
import { SearchIcon } from '../../svg/SearchIcon'
import SearchBox from './SearchBox'
import clickOutside from '../../utils/click'
import { leftNavs } from '../Home_Components/HomeLeft/data'
import { NavLink, Link } from 'react-router-dom'
import LeftNavigations from '../Home_Components/HomeLeft/LeftNavigations'

const Header = ({heading}) => {

    const [show, setShow] = useState(false);
    const searchBox = useRef(null);

    clickOutside(searchBox, () => setShow(false))

  return (
    <div className='flex justify-between lg:gap-x-10 items-center'>
        <h2 className='hidden lg:block text-xl font-gilroyBold'>{heading}</h2>
        <div className='lg:hidden w-14 h-14 rounded-full bg-cyan-100'></div>
        <div className='lg:hidden flex items-center gap-x-[10px] sm:gap-x-[50px] md:gap-x-[100px]'>
            {
                leftNavs.map((data, index) => (
                    <LeftNavigations key={index} data={data}/>
                ))
            }
        </div>
        <div className='relative'>
            <div onClick={() => setShow(true)}
                className='w-10 h-10 lg:h-auto lg:w-full lg:px-4 lg:py-2 border border-secondary_color flex justify-center lg:justify-start items-center gap-x-3 rounded-full'>
                <span className='text-secondary_color cursor-pointer'>
                    <SearchIcon />
                </span>
                <input type="text" placeholder='Search' className='w-[420px] hidden lg:block focus:outline-none font-gilroyNormal text-base' />
            </div>
            {
                show && (
                    <div className='w-[280px] sm:w-[350px] md:w-[450px] lg:w-[522px] absolute top-0 right-0 lg:left-[-16px] bg-white' ref={searchBox}>
                        <SearchBox />
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Header