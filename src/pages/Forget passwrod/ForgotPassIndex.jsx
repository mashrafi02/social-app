import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ForgotPass from '../../components/Forgot Pass components/ForgotPass'
import ProfileFound from '../../components/Forgot Pass components/ProfileFound';
import EnterCode from '../../components/Forgot Pass components/EnterCode';
import ResetPass from '../../components/Forgot Pass components/ResetPass';
import { Toaster } from 'react-hot-toast';



const ForgotPassIndex = () => {

    const [component, setComponent] = useState(0);
    const [user, setUser] = useState(null)

    function handleComponent(){
        switch (component) {
            case 0 : 
                return <ForgotPass setComponet={setComponent} setUser={setUser}/>
            case 1 : 
                if (user) return <ProfileFound user={user} setComponent={setComponent}/>;
                setComponent(0);
                return
            case 2 : 
                if (user) return <EnterCode user={user} setComponent={setComponent}/>;
                setComponent(0);
                return
            case 3 : 
                if (user) return <ResetPass user={user} setComponent={setComponent}/>;
                setComponent(0);
                return
            default : 
                return null
        }
    }
  return (
    <>
        <Helmet>
            <title>Forgot Password</title>
        </Helmet>
        <Toaster  position="top-center" reverseOrder={false} />
        <div className='w-full h-screen flex justify-center items-center bg-gradient-to-br from-purple-200 via-cyan-100 to-pink-100'>
            {handleComponent()}
        </div>
    </>
  )
}

export default ForgotPassIndex