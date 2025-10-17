import React from 'react'
import { Helmet } from 'react-helmet-async'
import toast, { Toaster } from 'react-hot-toast'
import AuthLeft from '../../components/authentication/AuthLeft'
import LoginForm from '../../components/authentication/LoginForm'
import LoginIcon from '../../svg/LoginIcon'

const Login = () => {
  return (
      <>
          <Helmet>
              <title>Login</title>
          </Helmet>
          <Toaster position="top-center" reverseOrder={false} />
          <div className='relative'>
              <div className='hidden lg:block w-[500px] h-[500px] bg-purple-100 rounded-full absolute top-[-240px] left-[-240px] z-[-1]'/>
              <div className='container h-screen flex sm:flex-col lg:flex-row justify-center items-center lg:gap-6'>
                  <div className='hidden sm:block sm:w-full lg:w-[40%] xl:w-[50%]'>
                      <AuthLeft
                            icon={<LoginIcon />} 
                            title='Log In to Access' 
                            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, qui. Natus eum minima quia, itaque impedit atque velit? Explicabo ducimus ut assumenda officiis pariatur voluptate tenetur quibusdam inventore ullam doloribus commodi'
                      />
                  </div>
                  <div className='w-full lg:w-[50%] xl:w-[40%]'>
                      <LoginForm toast={toast}/>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Login