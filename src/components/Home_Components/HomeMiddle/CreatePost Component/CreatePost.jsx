import React, { useRef, useState } from 'react'
import { CircleCloseIcon } from '../../../../svg/CircleClose'
import EmojiPickers from './EmojiPickers'
import AddPostContent from './AddPostContent';
import FileViewer from './FileViewer';
import { useCreatePostMutation } from '../../../../services/postApi';
import toast from 'react-hot-toast';
import dataURItoFile from '../../../../utils/dataURIToFile';
import { useSelector } from 'react-redux';


const CreatePost = ({setOpenPost}) => {

  const statusArea = useRef(null);
  const [status, setStatus] = useState('');
  const [showFilesViewer, setShowFilesViewer] = useState(false);
  const [files, setFiles] = useState([]);
  const [bg, setbg] = useState('')

  const [createPost, {isLoading}] = useCreatePostMutation();

  const {userData} = useSelector(state => state.auth.user);


  const submitPost = async () => {
    try {
      if (files.length === 0) {
        const response = await createPost({
          text: status || "",
          background: bg || null,
        }).unwrap();
  
        setOpenPost(false);
        toast.success(response?.message);
        return;
      }
  
      const fileFiles = files.map((file) => dataURItoFile(file.src, file.name));
  
      const formData = new FormData();
      formData.append("contentType", 'mixed')
      formData.append("text", status || "");
      formData.append("background", bg || "");
      formData.append("path", `social/${userData.username}/posts/${Date.now()}`);

      fileFiles.forEach((file) => {
        formData.append('media', file);
      });
  
      const response = await createPost(formData).unwrap();
      setOpenPost(false);
      toast.success(response?.message);
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || "Something went wrong. Please try again.");
    }
  };
  


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
              !showFilesViewer ?  <EmojiPickers status={status} setStatus={setStatus} statusArea={statusArea} bg={bg} setbg={setbg}/>
                                : <FileViewer status={status} setStatus={setStatus} statusArea={statusArea} setShowFilesViewer={setShowFilesViewer} files={files} setFiles={setFiles}/>
            }
            <AddPostContent setShowFilesViewer={setShowFilesViewer} showFilesViewer={showFilesViewer}/>
            <button className='inline-block w-full py-3 mt-2 text-center bg-gray-300 rounded-md text-black font-gilroySemibold hover:bg-cyan-400 transition-all ease-linear duration-150 disabled:cursor-not-allowed'
            disabled={isLoading || (!status && files.length === 0)}
            onClick={submitPost}>
              {isLoading? 'Posting...' : 'Post'}
            </button>
        </div>
    </div>
  )
}

export default CreatePost