import React from 'react'
import LeftIndex from '../components/Home_Components/HomeLeft/LeftIndex'
import RightIndex from '../components/Home_Components/HomeRight/RightIndex'
import { Outlet } from 'react-router-dom'

const Rootlayout = () => {
  return (
    <div className='mt-4 lg:mt-6 lg:grid lg:grid-cols-[1fr,3fr,1fr] gap-x-3'>
        <div className='hidden lg:block'>
            <LeftIndex />
        </div>
        <div>
            <Outlet />
        </div>
        <div className='hidden lg:block'>
            <RightIndex />
        </div>
    </div>
  )
}

export default Rootlayout