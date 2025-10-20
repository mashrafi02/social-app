import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Settings from './settings_components/Settings';
import { IoChevronDown } from "react-icons/io5";

const LeftNavigations = ({data}) => {

    const NavIcon = data.icon;
    const [show, setShow] = useState(false);
    
  return (
        data.navigate === undefined? (
            <div className='relative'>
                <div className={
                    `block px-6 py-4 mb-7 rounded-full group hover:bg-cyan-100 transition-all ease-linear duration-100 cursor-pointer ${show ? 'bg-cyan-100 text-gray-800' : ''}`}
                    onClick={() => setShow(prev => !prev)}
                >
                    <div className='flex gap-x-6 items-center'>
                        <span className='group-hover:text-gray-800 transition-all ease-linear duration-100'>
                            <NavIcon />
                        </span>
                        <span className='font-gilroySemibold text-base group-hover:text-gray-800 transition-all ease-linear duration-100'>
                            {data.title}
                        </span>
                        <IoChevronDown 
                            className='duration-300 text-base text-[#303030]'
                            style={{
                                transform: show? "rotate(180deg)" : "rotate(0deg)"
                        }}/>
                    </div>
                </div>
                <Settings show={show}/>
            </div>
        ) : (
            <NavLink
                to={data.navigate}
                className={({ isActive }) =>
                `block px-6 py-4 mb-2 rounded-full group hover:bg-cyan-100 transition-all ease-linear duration-100  
                ${isActive ? 'bg-cyan-100 text-gray-800' : ''}`
                }
            >
                <div className='flex gap-x-6 items-center'>
                    <span className='group-hover:text-gray-800 transition-all ease-linear duration-100'>
                        <NavIcon />
                    </span>
                    <span className='font-gilroySemibold text-base group-hover:text-gray-800 transition-all ease-linear duration-100'>
                        {data.title}
                    </span>
                </div>
            </NavLink>
        )
  )
}

export default LeftNavigations