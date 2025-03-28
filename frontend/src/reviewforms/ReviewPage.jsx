import React, { useEffect, useState } from 'react'

import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

import ReviewPic from "../assets/customerReview1.jpeg"

const ReviewPage = () => {
    const [reviewforms, setReviewforms] = useState([]);

    useEffect( () =>{
        fetch("http://localhost:5000/all-reviewforms").then(res => res.json()).then(data => setReviewforms(data));
      }, [])
  return (
    <div className='mt-28 px-4 lg:px-24'>
        <h2 className='text-5xl font-bold text-center mb-12' style={{ color: '#024b17' }}>Customer Reviews Section</h2>

    <div className='mt-16 py-12 bg-teal-100 px-4 lg:px-24'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
            <div className='md:w-1/2'>
            <h2 className='text-4xl font-bold mb-6 leading-snug' style={{ color: '#b5911d' }}>Tell Us About Our Service</h2>
                <p>Welcome to our Reviews page! Share your experiences and read feedback about homemade items 
                    bought or sold on our platform. Your honest reviews help build trust and guide others in making 
                    informed decisions. Let’s create a supportive community together!</p>
                <Link to="/uploadreview" className='mt-5 block'>
                <button className='font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300' style={{ backgroundColor: '#024b17', color: '#eebe26' }}>Add A Review</button>
                </Link>
            </div>
            <div>
                <img src={ReviewPic} alt="w-96 " />
            </div>
        </div>
    </div>

    <br/>
    <br/>

    <div className='grid gap-8 lg:grid-cols-2 sm:grid-cols-1'>
      {
        reviewforms.map(reviewform => (
          <Card key={reviewform._id}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {reviewform.full_name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <p className='text-semibold'>Title: {reviewform.review_title}</p>
              <br/><hr/><br/>
              <p className='text-semibold'>Category: {reviewform.category}</p>
              <br/><hr/><br/>
              <p className='text-semibold'>Description:<br/>{reviewform.content}</p>
              <br/><hr/><br/>
              <p className='text-semibold'>Service Rating: {reviewform.service_rate}</p>
            </p>
          </Card>
        ))
      }
      <br/>
    </div>
  </div>
  )
}


export default ReviewPage