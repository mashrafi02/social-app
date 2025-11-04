import React, { useEffect } from 'react'
import MiddleIndex from '../../components/Home_Components/HomeMiddle/MiddleIndex'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import VerifyModal from '../../components/Home_Components/VerifyModal'
import { Toaster } from 'react-hot-toast'
import { useGetPostsQuery } from '../../services/postApi'
import { useDispatch } from 'react-redux';
import { setPosts } from '../../features/publicPosts/postSlice'


const Home = () => {

  const {userData} = useSelector(state => state.auth.user)
  const {data, isLoading, isError, error} = useGetPostsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPosts(data?.data?.allPosts))
  }, [data?.data])

  if(isError && error) console.error(error)

  return ( 
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      {
        !userData.emailVerified && (
          <div className='w-full fixed top-0 left-0 h-screen bg-blur z-30 flex justify-center items-center'>
            <VerifyModal />
          </div>
        )
      }
      <MiddleIndex isLoading={isLoading}/> 
    </>
  )
}

export default Home