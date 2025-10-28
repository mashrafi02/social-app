import React, { useState, useEffect } from 'react';
import { useGetReverifyMailMutation } from '../../services/authApi';
import { useSelector } from 'react-redux';

const VerifyModal = () => {

  const {accessToken} = useSelector(state => state.auth.user);

  const [triggerReverify] = useGetReverifyMailMutation();
  const [timer, setTimer] = useState(0);
  const countdownDuration = 10 * 60; 

  const handleResend = async () => {
    try {
      await triggerReverify(accessToken).unwrap();
      setTimer(countdownDuration);
    } catch (err) {
      console.error("Failed to resend verification link:", err);
    }
  };


  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='w-[30%] h-[200px] rounded-md bg-white shadow-lg p-4 flex flex-col justify-center items-center'>
      <p className='font-gilroyMedium text-xl text-gray-600 mb-3 text-center'>
        Please verify your email to continue by clicking on the link we{' '}
        <span className='font-gilroyBold'>sent to your email</span>.
      </p>
      <p className='font-gilroyNormal text-base mb-3 text-center'>
        In case the link is expired or you didn’t get the mail, please{' '}
        <span className='font-gilroySemibold'>click below</span>
      </p>

      <button
        onClick={handleResend}
        disabled={timer > 0}
        className={`px-4 py-2 font-gilroySemibold text-lg rounded-md transition-all ease-linear duration-150 
          ${timer > 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-cyan-400'}`}
      >
        {timer > 0 ? `Resend in ${formatTime(timer)}` : 'Resend Verification Link'}
      </button>
    </div>
  );
};

export default VerifyModal;
