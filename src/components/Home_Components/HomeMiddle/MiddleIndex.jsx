import React, { useState } from 'react'
import Header from '../../header/Header'
import { LiveIcon } from '../../../svg/Live'
import { Media } from '../../../svg/Media'
import Feeling from '../../../svg/Feeling'
import CreatePost from './CreatePost Component/CreatePost'
import PublicPosts from './Show Posts/PublicPosts'
import { useSelector } from 'react-redux'


const MiddleIndex = ({isLoading}) => {

    const [openPost, setOpenPost] = useState(false);
    const {posts} = useSelector(state => state.posts)
    const {userData} = useSelector(state => state.auth.user);

  return (
    <div className='px-5'>
      <Header heading={'Feeds'}/>
      <div className='p-4 bg-gray-100 rounded-md'>
          <div className='flex items-center gap-x-4 p-4 rounded-full mb-3'>
            <div className='w-14 h-14 rounded-full bg-gray-400 border-2 border-gray-300 cursor-pointer'></div>
            <input type="text" placeholder="What's up say something...." readOnly className='w-[92%] focus:outline-none p-4 rounded-full font-gilroyNormal text-base' onClick={() => setOpenPost(true)}/>
          </div>
          <div className='border-t-2 border-t-cyan-500 pt-6 flex items-center justify-around'>
              <div className='flex items-center gap-x-3 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-300 transition-all ease-linear duration-100'>
                  <span>
                    <LiveIcon />
                  </span>
                  <span className='font-gilroySemibold text-base mb-[-6px]'>
                    Go Live
                  </span>
              </div>
              <div className='flex items-center gap-x-3 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-300 transition-all ease-linear duration-100'>
                  <span>
                    <Media />
                  </span>
                  <span className='font-gilroySemibold text-base mb-[-6px]'>
                    Image
                  </span>
              </div>
              <div className='flex items-center gap-x-3 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-300 transition-all ease-linear duration-100'>
                  <span>
                    <Feeling />
                  </span>
                  <span className='font-gilroySemibold text-base mb-[-6px]'>
                    Feeling
                  </span>
              </div>
          </div>
      </div>

      {
        openPost && <CreatePost setOpenPost={setOpenPost}/>
      }

      <div className='mt-10'>
        {
          isLoading && <p className='text-center font-gilroyNormal text-lg text-gray-400'>Loading Posts...</p>
        }
        {
          posts && posts.map((post) => <PublicPosts key={post._id} post={post} userData={userData}/>)
        }
      </div>
    </div>
  )
}

export default MiddleIndex