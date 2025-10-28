import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { forgotPassCode } from '../../utils/loginFormValidation'
import { useVerifyResetPassTokenMutation } from '../../services/authApi'
import toast from 'react-hot-toast'


const EnterCode = ({user, setComponent}) => {

  const [verifyResetPassToken, {isLoading}] = useVerifyResetPassTokenMutation();

  const initialValues = {code : ""};

  const formik = useFormik({
      initialValues,
      validationSchema: forgotPassCode,
      onSubmit: () => {
          handleSubmit();
          formik.resetForm();
      }
  })

  const {errors, touched} = formik

  const handleSubmit = async () => {
    try {
        const response = await verifyResetPassToken({email:user.email, token:formik.values.code}).unwrap();
        toast.success(response?.message);
        setTimeout(() => {
            setComponent(3);
        }, 2000)
    } catch (err) {
        toast.error(err?.data?.message);
    }
  }

  return (
    <div className='bg-gray-50 px-8 py-4 rounded-md shadow-md w-[30%]'>
            <h2 className='font-gilroySemibold text-2xl text-gray-800 mb-4 pb-2 border-b border-b-gray-200/70'>Enter Verification Code</h2>
            <p className='font-gilroyNormal text-base mb-6'>Please enter the code in the next 5 minutes that we just sent to your email</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit()
            }} className='relative'>
                    {errors.code && touched.code && 
                        <span className='absolute top-[54px] left-0 text-red font-gilroyNormal text-sm'>
                            {errors.code}*
                        </span>
                    }
                <input type="text" placeholder='Enter the code'
                        className='w-full px-6 py-3 focus:outline-none border border-gray-300 rounded-md font-gilroyNormal text-base bg-transparent mb-8'
                        name='code'
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='off'/>
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

export default EnterCode