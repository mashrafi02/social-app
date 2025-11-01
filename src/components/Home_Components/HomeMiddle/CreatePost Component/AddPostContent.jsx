import React from 'react'
import { Media } from '../../../../svg/Media'
import { Friends } from '../../../../svg/Friends'


const AddPostContent = ({setShowFilesViewer, showFilesViewer}) => {
  return (
    <div className='flex justify-between items-center px-2 py-3 border border-line_color rounded-md'>
        <p className='font-gilroyMedium text-base mb-[-5px]'>Add to your post</p>
        <div className='flex items-center gap-x-8'>
            <div className={`cursor-pointer w-8 h-8 rounded-full hover:bg-gray-200 flex justify-center items-center transition-all ease-linear duration-100 ${showFilesViewer && 'bg-gray-400'}`}
            onClick={() => setShowFilesViewer(true)}>
                <Media />
            </div>
            <div className='cursor-pointer w-8 h-8 rounded-full hover:bg-gray-200 flex justify-center items-center transition-all ease-linear duration-100'>
                <Friends />
            </div>
        </div>
    </div>
  )
}

export default AddPostContent