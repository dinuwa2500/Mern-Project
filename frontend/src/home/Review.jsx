import React, { useEffect, useState } from 'react'
import ReviewCards from '../components/ReviewCards';

const Review = () => {
    const [reviewforms, setReviewforms] = useState([]);

    useEffect( () => {
        fetch("http://localhost:5000/all-reviewforms").then(res => res.json()).then(data => setReviewforms(data.slice(0,8)))
    }, [])

  return (
    <div>
        <ReviewCards reviewforms={reviewforms} headline="Our Customer Reviews"/> 
        
    </div>
  )
}

export default Review