import React, { useEffect, useRef } from 'react'
import { SearchIcon } from '../../svg/SearchIcon'

const SearchBox = () => {

  const inputBox = useRef(null);
  useEffect(() => {
    inputBox.current.focus();
  },[])

  return (
    <div className='w-full rounded-md min-h-[400px] max-h-[70vh] shadow-md px-4'>
        <div className='px-4 py-2 border border-secondary_color flex items-center gap-x-3 rounded-full mx-auto'>
            <span className='text-secondary_color' onClick={() => inputBox.current.focus()}>
                <SearchIcon />
            </span>
            <input type="text"
                   ref={inputBox} 
                   placeholder='Search' 
                   className='w-[420px] focus:outline-none font-gilroyNormal text-base' />
        </div>
        <div className='mx-auto'>
          <p className='font-gilroySemibold mt-4'>Recent Searches</p>
        </div>
    </div>
  )
}

export default SearchBox