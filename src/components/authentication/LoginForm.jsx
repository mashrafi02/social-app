import React from 'react'
import { useFormik } from 'formik';
import { loginValidation } from '../../utils/loginFormValidation';
import { Link, useNavigate } from 'react-router-dom';
import { useLogUserMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authentication/authSlice';


const initialValues = {
    email:'',
    password:'',
}

const LoginForm = ({toast}) => {

    const [logUser, {isLoading, isSuccess}] = useLogUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (body) => {
        const response = await logUser(body);
        if(response?.data) {
            toast.success('Logged In Successfully')
            localStorage.setItem('currentLoggedUser', JSON.stringify(response?.data?.data));
            dispatch(setUser(response?.data?.data))
            navigate('/', {replace:true})
        }else if(response?.error){
            toast.error(response?.error?.data?.message)
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: loginValidation,
        onSubmit: () => {
            const body = {...formik.values};
            login(body);
            formik.resetForm()
        }
    })

    const {errors, touched} = formik;

  return (
    <div className='w-full lg:shadow-md rounded-md px-4 sm:px-8 py-3 sm:py-6'>
            <div>
                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    formik.handleSubmit()
                                }}
                      className='flex flex-wrap justify-between gap-y-5 sm:gap-y-7'>
                    <div className='w-full relative'>
                        {errors.email && touched.email && 
                            <span className='absolute top-[-24px] left-0 text-red font-gilroyNormal text-sm'>
                                {errors.email}*
                            </span>
                        }
                        <input type="email" 
                            placeholder='example@mail.com'
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete='off'
                            value={formik.values.email}
                            className='w-full font-gilroyNormal px-4 py-2 focus:outline-none border border-line_color rounded-md' />
                    </div>
                    <div className='w-full relative'>
                        {errors.password && touched.password && 
                            <span className='absolute top-[-24px] left-0 text-red font-gilroyNormal text-sm'>
                                {errors.password}*
                            </span>
                        }
                        <input type="password" 
                           placeholder='Password'
                           name='password'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           autoComplete='off'
                           value={formik.values.password}
                           className='w-full font-gilroyNormal px-4 py-2 focus:outline-none border border-line_color rounded-md' />
                    </div>
                    <div className='w-full flex flex-col md:flex-row justify-between items-center'>
                        <button type='submit' disabled={isLoading} className='inline-block px-6 py-2 rounded-full bg-secondary_bg text-white font-gilroyBold tracking-widest cursor-pointer hover:bg-gray-500 duration-200'>
                            {isLoading? 'Logging In...' : "Log In"}
                        </button>
                        <p className='font-gilroyNormal text-base mt-4 md:mt-0'>Don't remember password? <Link to='/forgot-password' className='text-primary_color font-gilroyBold cursor-pointer'>forgot password</Link></p>
                    </div>
                    <p className='font-gilroyNormal text-base mt-4 md:mt-0'>Don't have an Account? <Link to='/registration' className='text-primary_color font-gilroyBold cursor-pointer'>Register</Link></p>
                </form>
            </div>
        </div>
  )
}

export default LoginForm