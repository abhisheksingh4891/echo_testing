import React, { useState } from 'react'

const AddRating = ({onRatingSubmit, setRating, rating}) => {
  const [showErr, setShowErr] = useState(false);

 const handleChange=(e)=>{
     setRating((prev)=>({...prev,description:e}))
  }


  const handleStarClick = (index) => {
    if(index===0 && rating?.count===1){
     setRating((prev)=>({...prev,count:null}));
    }else{
     setRating((prev)=>({...prev,count:index+1}));
     setShowErr(false);
    }
  };
  const onSubmit=()=>{
    if((rating?.count===null && rating?.description===null)||rating?.count===null){
      setShowErr(true)
    }else{
     onRatingSubmit()
    }
  }
  return (
    <div className='mb-0'>
         <h6 className=''>We’d love your feedback!</h6>
            <p className="title text-small ">How was your onboarding experience so far? Your feedback helps us improve.</p>
            <div id="rating" className="star-rating">
          {[1,2,3,4,5].map((_stars, index) => (
              <span
                key={index}
                className={`star ${index < rating.count ? 'filled' : ''}`}
                onClick={() => handleStarClick(index)}
              >
                &#9733;
              </span>
            ))}
            </div>
            <textarea className='col-12 mt-2 form-control' placeholder='Any suggestions or comments?' onChange={(e)=>handleChange(e.target.value)}></textarea>
            {showErr &&
             <div className="alert-danger mt-1" >
               Star rating is required before submitting.
             </div>}
            <button className="btn btn-secondary mt-3" type='submit' onClick={onSubmit}>Submit Feedback</button>
    </div>
  )
}

export default AddRating