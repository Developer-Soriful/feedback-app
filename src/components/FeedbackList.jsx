"use client"
import React, { useState } from 'react'
import FeedbackForm from './FeedbackForm'
import FeedbackCard from './FeedbackCard'

const FeedbackList = ({ initialFeedback }) => {
  console.log(initialFeedback);

  // this is for feedback list state 
  const [feedbackList, setFeedbackList] = useState(initialFeedback || [])

  const handleNewFeedback = (newFeedback) => {
    setFeedbackList(prev => [newFeedback, ...prev])
  }
  return (
    <div className='flex flex-col lg:flex-row gap-10'>
      {/* this part is for feedback form */}
      <div className='w-full lg:flex-2 h-[75vh]'>
        <FeedbackForm onFeedbackSubmitted={handleNewFeedback} />
      </div>
      {/* this is feedback card here */}
      <div className='lg:flex-1'>
        <h1 className='text-3xl font-bold'>Submitted Feedback</h1>
        {/* this is card data mapping */}
        <div className='flex flex-col gap-4'>
          {
            feedbackList.length === 0 ? (
              <p>Feedback Data Not yet....!</p>
            ) : (
              feedbackList.map((feedbackItem) => (
                <FeedbackCard key={feedbackItem.name} feedbackItem={feedbackItem} />
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default FeedbackList