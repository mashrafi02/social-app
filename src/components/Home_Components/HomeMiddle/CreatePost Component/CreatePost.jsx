import React, { useRef, useState } from 'react'
import { CircleCloseIcon } from '../../../../svg/CircleClose'
import EmojiPickers from './EmojiPickers'
import AddPostContent from './AddPostContent';
import ImageViewer from './ImageViewer';


const CreatePost = ({setOpenPost}) => {

  const statusArea = useRef(null);
  const [status, setStatus] = useState('');
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [images, setImages] = useState([]);

  return (
    <div className='w-full fixed top-0 left-0 h-screen bg-blur z-20 flex justify-center items-center'>
        <div className='bg-white w-[35%] p-3 rounded-md shadow-md relative'>
            <h1 className='font-gilroyBold text-center border-b border-gray-50'>Create Post</h1>
            <span className='absolute top-2 right-2 cursor-pointer' onClick={() => setOpenPost(false)}>
                <CircleCloseIcon />
            </span>
            <div className='flex items-center gap-x-3 my-4'>
                <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
                <h4 className='font-gilroySemibold text-base mb-[-5px]'>Izuku Midoriya</h4>
            </div>
            {
              !showImageViewer ?  <EmojiPickers status={status} setStatus={setStatus} statusArea={statusArea}/>
                                : <ImageViewer status={status} setStatus={setStatus} statusArea={statusArea} setShowImageViewer={setShowImageViewer} images={images} setImages={setImages}/>
            }
            <AddPostContent setShowImageViewer={setShowImageViewer} showImageViewer={showImageViewer}/>
            <button className='inline-block w-full py-3 mt-2 text-center bg-gray-300 rounded-md text-black font-gilroySemibold hover:bg-cyan-400 transition-all ease-linear duration-150 disabled:cursor-not-allowed'>Post</button>
        </div>
    </div>
  )
}

export default CreatePost