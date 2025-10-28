import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { forgotPassValidation } from '../../utils/loginFormValidation'
import { useFindMatchMailMutation } from '../../services/authApi'



const ForgotPass = ({setComponet, setUser}) => {

    const [ findMatchMail, {isLoading} ] = useFindMatchMailMutation();
    const [error, setError] = useState(null);

    const initialValues = {email : ""};

    const formik = useFormik({
        initialValues,
        validationSchema: forgotPassValidation,
        onSubmit: () => {
            findMatch();
            formik.resetForm()
        }
    })

    const {errors, touched} = formik

    const findMatch = async () => {
        try {
            const response = await findMatchMail(formik.values.email).unwrap();
            setUser(response?.data)
            setError(null)
            setComponet(1)
        } catch (err) {
            setError(err?.data?.message)
        }
    }
    
  return (
    
        <div className='bg-gray-50 px-8 py-4 rounded-md shadow-md w-[30%]'>
            <h2 className='font-gilroySemibold text-2xl text-gray-800 mb-4 pb-2 border-b border-b-gray-200/70'>Find Your Account</h2>
            <p className='font-gilroyNormal text-base mb-6'>Please enter your email address to find your social account</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit()
            }} className='relative'>
                    {errors.email && touched.email && 
                        <span className='absolute top-[54px] left-0 text-red font-gilroyNormal text-sm'>
                            {errors.email}*
                        </span>
                    }
                    {error && !errors.email &&
                        <span className='absolute top-[54px] left-0 text-red font-gilroyNormal text-sm'>
                            {error}*
                        </span>
                    }
                <input type="email" placeholder='email address'
                        className='w-full px-6 py-3 focus:outline-none border border-gray-300 rounded-md font-gilroyNormal text-base bg-transparent mb-8'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='off'/>
                <button type='submit'
                        disabled={isLoading}
                        className='px-6 py-2 rounded-md bg-sky-400 font-gilroyNormal text-lg text-white hover:bg-sky-500 transition-all ease-linear duration-150 disabled:cursor-not-allowed'>
                    {isLoading? 'Searching...' : 'Search'}
                </button>
                <Link to='/login'
                        className='inline-block px-6 py-2 ml-5 rounded-md bg-gray-200 font-gilroyNormal text-lg text-black hover:bg-gray-300 transition-all ease-linear duration-150'>
                    Cancel
                </Link>
            </form>
        </div>
  )
}

export default ForgotPass