import React from 'react'
import { FadeLoader } from 'react-spinners'

const Message = ({Message, loading}) => {
  return (
    <div className='w-full h-screen flex justify-center items-center gap-x-4 bg-gradient-to-r from-cyan-100 to-purple-100'>
        <FadeLoader loading={loading}/>
        <p className='text-5xl font-gilroySemibold text-gray-600'>{Message}</p>
    </div>
  )
}

export default Message