import React from 'react'

const BirthDate = ({formik, days, years, ageError}) => {
  return (
    <>
        <div className='w-full flex justify-between relative'>
            <div className='w-[33%] sm:w-[30%]'>
                <label htmlFor="bDay" className='font-gilroySemibold mt-1'>Birth Day</label>
                <select name='bDay' id='bDay'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='off'
                        value={formik.values.bDay}
                        className='w-full border border-line_color px-4 py-2 font-gilroyNormal rounded-md focus:outline-none text-sm sm:text-base'>
                    {
                        days.map((day, index) => (
                            <option key={index} value={day}>{day}</option>
                        ))
                    }
                </select>
            </div>
            <div className='w-[33%] sm:w-[30%]'>
                <label htmlFor="bMonth" className='font-gilroySemibold mt-1'>Birth Month</label>
                <select name='bMonth' id='bMonth'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='off'
                        value={formik.values.bMonth}
                        className='w-full border border-line_color px-4 py-2 font-gilroyNormal rounded-md focus:outline-none text-sm sm:text-base'>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
            <div className='w-[33%] sm:w-[30%]'>
                <label htmlFor="bYear" className='font-gilroySemibold mt-1'>Birth Year</label>
                <select name='bYear' id='bYear'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='off'
                        value={formik.values.bYear}
                        className='w-full border border-line_color px-4 py-2 font-gilroyNormal rounded-md focus:outline-none text-sm sm:text-base'>
                    {
                        years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))
                    }
                </select>
            </div>
            {ageError && 
                <span className='absolute top-[64px] left-0 text-red font-gilroyNormal text-sm'>
                    {ageError}*
                </span>
            }
        </div>
    </>
  )
}

export default BirthDate