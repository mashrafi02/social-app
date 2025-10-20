import React from 'react'
import storyData from './storyData'
import { Swiper, SwiperSlide } from 'swiper/react';


const Stories = () => {
  return (
    <div>
        <div className='flex justify-between items-center mb-4'>
            <h4 className='font-gilroySemibold text-lg'>Stories</h4>
        </div>
        <div className='w-[331px]'>
            <Swiper
                spaceBetween={5}
                slidesPerView={3}
                >
                    {
                        storyData.map((data,index) => {
                            return (
                                <SwiperSlide 
                                    className='rounded-md bg-gray-400 bg-cover bg-no-repeat bg-center            overflow-hidden cursor-pointer'
                                    style={{background: `url(${data.bgPicture})`}}>

                                    <div className='w-10 h-10 overflow-hidden mt-2 ml-2 border-2 border-gray-500 rounded-full object-cover'>
                                        <img src={data.profPicture} alt="profilepic" />
                                    </div>
                                    
                                </SwiperSlide>
                            )
                        })
                    }
            </Swiper>

        </div>
    </div>
  )
}

export default Stories