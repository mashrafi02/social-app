import React from 'react'
import { reacts } from '../data';


const Reacts = ({setShowReacts, reactTimeout, showReacts}) => {
  return (
        <div
            className={`flex items-center gap-x-2 absolute top-[-50px] left-0 px-4 py-2 rounded-full shadow-md bg-white transition-all ease-linear duration-200 origin-bottom
                ${showReacts ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            onMouseOver={() => {
                setShowReacts(true)
                reactTimeout && clearTimeout(reactTimeout)
            }}
            onMouseLeave={() => setShowReacts(false)}
            >
            {reacts?.map((react,index) => (
                <img
                key={index}
                src={react.image}
                alt={react.name}
                className='w-10 h-10 scale-[1.5] hover:scale-[1.9] cursor-pointer transition-all ease-linear duration-150'
                />
            ))}
        </div>

  )
}

export default Reacts