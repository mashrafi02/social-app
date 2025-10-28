import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { resetPassValidation } from '../../utils/loginFormValidation';
import { useFormik } from 'formik';
import { useResetPasswordMutation } from '../../services/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const ResetPass = ({user, setComponent}) => {

  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  const navigate = useNavigate();

  const initialValues = {password : "", confirmPassword: ""};

  const formik = useFormik({
      initialValues,
      validationSchema: resetPassValidation,
      onSubmit: () => {
          handleSubmit();
          formik.resetForm();
      }
  })

  const {errors, touched} = formik

  const handleSubmit = async () => {
    try {
        const response = await resetPassword({...formik.values, email:user.email}).unwrap();
        toast.success(response?.message);
        setTimeout(() => {
            navigate('/login');
        },2500)
    } catch (err) {
        toast.error(err?.data?.message)
    }
  }

  return (
    <div className='bg-gray-50 px-8 py-4 rounded-md shadow-md w-[30%]'>
        <h2 className='font-gilroySemibold text-2xl text-gray-800 mb-4 pb-2 border-b border-b-gray-200/70'>Update Your Password</h2>
        <p className='font-gilroyNormal text-base mb-6'>Make sure that you include letters, numbers and special characters in your new password</p>
        <form onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit()
        }} className='relative'>
            <div className='w-full flex flex-col gap-y-6 mb-8'>
                <div className='w-full relative'>
                    {errors.password && touched.password && 
                            <span className='absolute top-[50px] left-0 text-red font-gilroyNormal text-sm'>
                                {errors.password}*
                            </span>
                        }
                    <input type="password" placeholder='Enter the new password'
                            className='w-full px-6 py-3 focus:outline-none border border-gray-300 rounded-md font-gilroyNormal text-base bg-transparent'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete='off'/>
                </div>
                <div className='w-full relative'>
                    {errors.confirmPassword && touched.confirmPassword && 
                            <span className='absolute top-[54px] left-0 text-red font-gilroyNormal text-sm'>
                                {errors.confirmPassword}*
                            </span>
                        }
                    <input type="password" placeholder='Confirm your new password'
                            className='w-full px-6 py-3 focus:outline-none border border-gray-300 rounded-md font-gilroyNormal text-base bg-transparent'
                            name='confirmPassword'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete='off'/>
                </div>
            </div>
            <button type='submit'
                    disabled={isLoading}
                    className='px-6 py-2 rounded-md bg-sky-400 font-gilroyNormal text-lg text-white hover:bg-sky-500 transition-all ease-linear duration-150 disabled:cursor-not-allowed'>
                Submit
            </button>
            <Link to='/login'
                    className='inline-block px-6 py-2 ml-5 rounded-md bg-gray-200 font-gilroyNormal text-lg text-black hover:bg-gray-300 transition-all ease-linear duration-150'>
                Cancel
            </Link>
        </form>
    </div>
  )
}

export default ResetPass