import React, { useEffect, useRef, useState } from 'react' 
import { Moon } from '../../../../svg/Moon';
import { Logout } from '../../../../svg/Logout';
import DisplayMode from './dispaly/DisplayMode';
import clickOutside from '../../../../utils/click';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../../../features/authentication/authSlice';


const Settings = ({show, setShow}) => { 

    const [maxHeight, setMaxHeight] = useState("0px"); 
    const dropdownSettingsRef = useRef(null);
    const [display, setDisplay] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    clickOutside(dropdownSettingsRef, () => setShow(false));
    
    useEffect(() => { 
        if (show && dropdownSettingsRef.current) { 
          setMaxHeight(`500px`); 
        } else { 
          setMaxHeight("0px"); 
        } 
      }, [show]); 

    function handleLogout() {
        localStorage.removeItem('currentLoggedUser');
        dispatch(clearUser());
        navigate('/login')
    }


    return ( 
      <div className='w-[250px] shadow-md flex justify-center items-center rounded-md absolute top-10 lg:top-8 2xl:top-14 right-[-50px] sm:right-[-106px] lg:left-0 overflow-hidden transition-[max-height] duration-300 ease-in-out' 
      ref={dropdownSettingsRef} style={{maxHeight}}> 
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
                <div className='flex items-center gap-x-3 cursor-pointer' onClick={handleLogout}>
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