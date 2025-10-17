import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { regValidation } from '../../utils/regFormValidation'
import BirthDate from './regForm_Components/BirthDate'
import Gender from './regForm_Components/Gender'
import { useCreateUserMutation } from '../../services/authApi'
import { useNavigate } from 'react-router-dom'


const initialValues = {
    fName:'',
    lName:'',
    email:'',
    password:'',
    confirmPassword:'',
    gender:'',
    age:'',
    bDay: new Date().getDate(),
    bMonth: new Date().getMonth() + 1,
    bYear: new Date().getFullYear()
}

const RegistrationForm = ({toast}) => {

    const [ageError, setAgeError] = useState(null);
    const [createUser, {isLoading, isSuccess}] = useCreateUserMutation();
    const navigate = useNavigate();

    const registration = async (body) => {
        const response = await createUser(body)
        if(response?.data) {
            toast.success('Account created Successfully')
            navigate('/login', {replace:true})
        }else if(response?.error){
            toast.error(response?.error?.data?.message)
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: regValidation,
        onSubmit: () => {
            const currentDate = new Date();
            const selectedDate = new Date(formik.values.bYear, formik.values.bMonth -1, formik.values.bDay);
            const adult = new Date(1970 + 16,0,1);
            const tooOld = new Date(1970 + 70,0,1)

            if(currentDate - selectedDate < adult) return setAgeError('You are under 16');
            if(currentDate - selectedDate > tooOld) return setAgeError('You are over 70');

            setAgeError(null);

            let age = currentDate.getFullYear() - selectedDate.getFullYear();
            const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())) age--;

            const body = {...formik.values, age};
            registration(body);
            formik.resetForm();
        }
    })

    const {errors, touched} = formik

    const years = Array.from(new Array(105), (val, index) => new Date().getFullYear() - index);
    const getDays = () => {
        return new Date(formik.values.bYear, formik.values.bMonth, 0).getDate()
    };
    const days = Array.from(new Array(getDays()), (day, index) => index + 1);
    

  return (
    <div className='w-full lg:shadow-md rounded-md px-4 sm:px-8 py-3 sm:py-6'>
        <div>
            <form onSubmit={(e) => {
                                e.preventDefault();
                                formik.handleSubmit()
                            }}
                  className='flex flex-wrap justify-between gap-y-5 sm:gap-y-7'>
                <div className='w-full sm:w-[49%] relative'>
                    {errors.fName && touched.fName && 
                        <span className='absolute top-[-24px] left-0 text-red font-gilroyNormal text-sm'>
                            {errors.fName}*
                        </span>
                    }
                    <input type="text" 
                        placeholder='First Name' 
                        name='fName' 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='off'
                        value={formik.values.fName}
                        className='w-full font-gilroyNormal px-4 py-2 focus:outline-none border border-line_color rounded-md' />
                </div>
                <div className='w-full sm:w-[49%] relative'>
                    {errors.lName && touched.lName && 
                        <span className='absolute top-[-24px] left-0 text-red font-gilroyNormal text-sm'>
                            {errors.lName}*
                        </span>
                    }
                    <input type="text" 
                        placeholder='Last Name'
                        name='lName'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='off'
                        value={formik.values.lName}
                        className='w-full font-gilroyNormal px-4 py-2 focus:outline-none border border-line_color rounded-md' />
                </div>
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
                <div className='w-full sm:w-[49%] relative'>
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
                <div className='w-full sm:w-[49%] relative'>
                    {errors.confirmPassword && touched.confirmPassword && 
                        <span className='absolute top-[-24px] left-0 text-red font-gilroyNormal text-sm'>
                            {errors.confirmPassword}*
                        </span>
                    }
                    <input type="password" 
                       placeholder='Confirm Password'
                       name='confirmPassword'
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       autoComplete='off'
                       value={formik.values.confirmPassword}
                       className='w-full font-gilroyNormal px-4 py-2 focus:outline-none border border-line_color rounded-md' />
                </div>
                <BirthDate formik={formik} days={days} years={years} ageError={ageError}/>
                <Gender errors={errors} touched={touched} formik={formik}/>
                <div className='w-full flex flex-col md:flex-row gap-x-8 items-center'>
                    <button type='submit' disabled={isLoading} className='inline-block px-6 py-2 rounded-full bg-secondary_bg text-white font-gilroyBold tracking-widest cursor-pointer hover:bg-gray-500 duration-200'>
                        {isLoading? "Registering..." : "Register"}
                    </button>
                    <p className='font-gilroyNormal text-base mt-4 md:mt-0'>Already have an account? <Link to='/login' className='text-primary_color font-gilroyBold cursor-pointer'>Log In</Link></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegistrationForm