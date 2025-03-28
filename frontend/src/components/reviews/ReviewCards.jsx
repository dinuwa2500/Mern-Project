import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const ReviewCards = ({headline, reviewforms}) => {
  return (
    <div className='my-12 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center mb-10 leading-snug' style={{ color: '#024b17' }}>Our Customer Reviews</h2>

      <div className='text-center mb-8'>
          <button className='bg-white px-6 py-2 font-medium mr-4'>Visit Reviews Page</button>
        <Link to={`/reviewpage`}>
        <button 
  className='px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded' 
  style={{ backgroundColor: '#eebe26' }}
>
  Browse
</button>
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {reviewforms.map(reviewform => (
          <SwiperSlide key={reviewform._id}>
            
              <div className='p-6 rounded-lg shadow-lg text-gray-800' style={{ backgroundColor: '#FFFFE0' }}>
                <h5 className='text-lg font-bold'>{reviewform.full_name}</h5>
                <p className='mt-2 font-semibold'>Category: {reviewform.category}</p>
                <p className='mt-2 font-semibold'>Title: {reviewform.review_title}</p>
                <p className='mt-2 font-semibold'>Description: <br/>{reviewform.content}</p>
                <p className='mt-2 font-semibold'>Service Rating: {reviewform.service_rate}</p>
              </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  )
}

export default ReviewCards