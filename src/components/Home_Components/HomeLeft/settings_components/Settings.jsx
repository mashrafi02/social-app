import React, { useEffect, useRef, useState } from 'react' 
import { Moon } from '../../../../svg/Moon';
import { Logout } from '../../../../svg/Logout';
import DisplayMode from './dispaly/DisplayMode';

const Settings = ({show}) => { 

    const [maxHeight, setMaxHeight] = useState("0px"); 
    const dropdownBrandRef = useRef(null);
    const [display, setDisplay] = useState(false);
    
    useEffect(() => { 
        if (show && dropdownBrandRef.current) { 
          setMaxHeight(`500px`); 
        } else { 
          setMaxHeight("0px"); 
        } 
      }, [show]); 


    return ( 
      <div className='w-full shadow-md flex justify-center items-center rounded-md absolute top-14 left-0 overflow-hidden transition-[max-height] duration-300 ease-in-out' 
      ref={dropdownBrandRef} style={{maxHeight}}> 
        {
          display? (
            <DisplayMode setDisplay={setDisplay}/>
          )
          :
          (
            <div className='p-2'>
                <div className='flex items-center gap-x-3 mb-4 cursor-pointer'
                    onClick={() => setDisplay(true)}>
                  <div className='rounded-full p-2 bg-gray-300 text-gray-800'>
                    <Moon />
                  </div>
                  <p className='font-gilroySemibold text-base hover:text-secondary_color transition-all ease-linear duration-75'>Display & Accessibility</p>
                </div>
                <div className='flex items-center gap-x-3 cursor-pointer'>
                  <div className='rounded-full p-2 bg-gray-300 text-gray-800'>
                    <Logout />
                  </div>
                  <p className='font-gilroySemibold text-base hover:text-secondary_color transition-all ease-linear duration-75'>Log out</p>
                </div>
            </div>
          )
        }
      </div> 
    ) } 
    export default Settings