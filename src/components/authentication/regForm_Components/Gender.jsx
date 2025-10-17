import React from 'react'

const Gender = ({errors, touched, formik}) => {
  return (
    <>
        <div className='relative'>
            {errors.gender && touched.gender && 
                <span className='absolute top-[-24px] left-0 text-red font-gilroyNormal text-sm'>
                    {errors.gender}*
                </span>
            }
            <div className='flex items-center'>
                <input type="radio" name='gender' id='male' value='male' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete='off'
                    className='cursor-pointer'/>
                <label htmlFor="male" 
                    className='cursor-pointer font-gilroyBold ml-2'>Male</label>
                <input type="radio" name='gender' id='female' value='female' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete='off'
                    className='cursor-pointer ml-7'/>
                <label htmlFor="female" 
                    className='cursor-pointer font-gilroyBold ml-2'>Female</label>
            </div>
        </div>
    </>
  )
}

export default Gender