import React from 'react'

const PostOption = ({icon, title}) => {

  const Icon = icon;

  return (
    <div className='flex items-center gap-x-2'>
        <div className='text-secondary_color'>
          <Icon />
        </div>
        <p className='font-gilroyNormal text-lg mb-[-3.5px] text-secondary_color'>{title}</p>
    </div>
  )
}

export default PostOption