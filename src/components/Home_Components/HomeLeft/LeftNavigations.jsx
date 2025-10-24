import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Settings from './settings_components/Settings';


const LeftNavigations = ({data}) => {

    const NavIcon = data.icon;
    const [show, setShow] = useState(false);
    
  return (
        data.navigate === undefined? (
            <div className='relative'>
                <div className={
                    `block 2xl:px-6 2xl:py-4 2xl:mb-7 rounded-full group 2xl:hover:bg-cyan-100 transition-all ease-linear duration-100 cursor-pointer ${show ? '2xl:bg-cyan-100 2xl:text-gray-800 text-rose-500' : ''}`}
                    onClick={() => setShow(prev => !prev)}
                >
                    <div className='flex 2xl:gap-x-8 items-center lg:justify-center 2xl:justify-normal'>
                        <span className='hover:text-rose-500 2xl:group-hover:text-gray-800 transition-all ease-linear duration-100'>
                            <NavIcon />
                        </span>
                        <span className='hidden 2xl:inline-block font-gilroySemibold text-base group-hover:text-gray-800 transition-all ease-linear duration-100'>
                            {data.title}
                        </span>
                    </div>
                </div>
                <Settings show={show} setShow={setShow}/>
            </div>
        ) : (
            <NavLink
                to={data.navigate}
                className={({ isActive }) =>
                `block 2xl:px-6 2xl:py-4 lg:mb-8 2xl:mb-2 rounded-full group 2xl:hover:bg-cyan-100 transition-all ease-linear duration-100  
                ${isActive ? '2xl:bg-cyan-100 2xl:text-gray-800 text-cyan-500' : ''}`
                }
            >
                <div className='flex 2xl:gap-x-8 items-center lg:justify-center 2xl:justify-normal'>
                    <span className='hover:text-cyan-500 2xl:group-hover:text-gray-800 transition-all ease-linear duration-100'>
                        <NavIcon />
                    </span>
                    <span className='hidden 2xl:inline-block font-gilroySemibold text-base group-hover:text-gray-800 transition-all ease-linear duration-100'>
                        {data.title}
                    </span>
                </div>
            </NavLink>
        )
  )
}

export default LeftNavigations