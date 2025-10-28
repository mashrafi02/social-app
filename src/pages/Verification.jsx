import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import AuthLeft from '../components/authentication/AuthLeft'
import LoginIcon from '../svg/LoginIcon'
import { useParams } from 'react-router-dom'
import { useVerifyUserMutation } from '../services/authApi'
import { FadeLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/authentication/authSlice'


const Verification = () => {

    const {token} = useParams();
    const [verifyUser, {isLoading}] = useVerifyUserMutation();
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user)


    useEffect(() => {
        verifyFunc()
    },[])

    const verifyFunc = async () => {
        try {
          const response = await verifyUser(token).unwrap();
          setError(null);
      
          if (!user) {
            setSuccessMsg(`${response?.message} Redirecting to Login Page...`);
            setTimeout(() => navigate('/login', { replace: true }), 2500);
            return;
          }
      
          if (response?.userId === user?.userData?._id) {
            const updatedUser = {
              ...user,
              userData: { ...user.userData, emailVerified: true },
            };
      
            localStorage.setItem('currentLoggedUser', JSON.stringify(updatedUser));
            dispatch(setUser(updatedUser));
      
            setSuccessMsg(`${response?.message} Redirecting to Home...`);
            setTimeout(() => navigate('/', { replace: true }), 2500);
          } else {
            setSuccessMsg(`${response?.message} Log in to this account to experience our app`);
          }
        } catch (err) {
          setError(err?.data?.message);
          if (!user) {
            setTimeout(() => navigate('/login', { replace: true }), 2500);
          }
        }
      };
      

  return (
    <>
        <Helmet>
            <title>Verification</title>
        </Helmet>
        <div className='relative'>
            <div className='hidden lg:block w-[500px] h-[500px] bg-purple-100 rounded-full absolute top-[-240px] left-[-240px] z-[-1]'/>
            <div className='container h-screen flex sm:flex-col lg:flex-row justify-center items-center lg:gap-6'>
                <div className='hidden sm:block sm:w-full lg:w-[40%] xl:w-[50%]'>
                    <AuthLeft
                        icon={<LoginIcon />} 
                        title='Verification' 
                        description='Your security is most Important to us. Thank you for your patience'
                    />
                </div>
                <div className='w-full lg:w-[50%] xl:w-[40%]'>
                    <div className='flex justify-center items-center gap-x-4'>
                        <FadeLoader loading={isLoading} color='3bd0de'/>
                        <p className='text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-gilroyBold text-primary_color capitalize'>
                            {isLoading && 'Verifying...'}
                            {error || successMsg}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Verification