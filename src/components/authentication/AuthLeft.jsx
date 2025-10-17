import React from 'react'

const AuthLeft = ({title, description, icon}) => {
  return (
    <div>
        <div className='hidden lg:block'>{icon}</div>
        <h1 className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl sm:px-8 lg:px-0 font-gilroyBold text-primary_color'>{title}</h1>
        <p className='text-sm lg:text-base xl:text-lg font-gilroyNormal text-text_color mt-3 hidden lg:block'>{description}</p>
    </div>
  )
}

export default AuthLeft