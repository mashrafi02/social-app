import React from 'react'
import LeftProfile from './LeftProfile'
import LeftNavigations from './LeftNavigations'
import { leftNavs } from './data'

const LeftIndex = () => {
  return (
    <>
        <div>
            <LeftProfile />
        </div>
        <div className='2xl:pl-8 mt-14 2xl:mt-0'>
            {
                leftNavs.map((data, index) => (
                    <LeftNavigations key={index} data={data}/>
                ))
            }
        </div>
    </>
  )
}

export default LeftIndex