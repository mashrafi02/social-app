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
        <div className='pl-8'>
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