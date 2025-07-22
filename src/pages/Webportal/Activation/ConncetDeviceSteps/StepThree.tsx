import AddRating from '@/ProjectComponents/AddRating';
import { devicePageStep } from '@/store/appSlice';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const StepThree = ({handleNext}) => {
    const dispatch= useDispatch();
    const router= useRouter();
    const [isRating, setIsRating]= useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState({
        count:null,
        description:null
    });
    const [reviewData, setReviewData] = useState({
      icon:null,
      text:null
    });


  const onRatingSubmit=()=>{
      setIsRating(false);
      // dispatch(devicePageStep(0));
      
       if(rating.count===1){
            setReviewData({
              icon:'😡',
              text:"We’re sorry your experience wasn’t great. Thank you for letting us know — we’ll work hard to improve."
            })
          }else if(rating.count===2){
            setReviewData({
              icon:'😕',
              text:"Thanks for your feedback. We’re sorry things weren’t ideal, and we’ll use your input to make it better."
            });
          }else if(rating.count===3){
            setReviewData({
              icon:'😳',
              text:"Thanks for your feedback! We’ll keep working to improve your experience."
            });
          }else if(rating.count===4){
            setReviewData({
              icon:'😊',
              text:"Thanks for your positive feedback! We’re glad you’re having a good experience."
            });
          }else if(rating.count===5){
             setReviewData({
              icon:'😄',
              text:"Thanks so much! We’re thrilled you’re loving your experience!"
            });
          }
  }
const showDeviceDetails =()=>{
  setTimeout(() => {
      router.replace("/Webportal/Dashboard/XXX123");
      dispatch(devicePageStep(0));
      setIsLoading(false);
      }, 2000);
  
}
  return (
    <>
          <div className="row row row step-box">
                    <div className="col-12 col-md-6 justify-content-center p-0" style={{
                              borderTopLeftRadius: "15px",
                              borderBottomLeftRadius: "15px",
                              overflow: "hidden",
                            }}>
                      <div className="w-100 h-100" style={{
                                height: "100%",
                                borderTopLeftRadius: "15px",
                                borderBottomLeftRadius: "15px",
                                overflow: "hidden",
                              }}>
                        <img src="/assets/images/connectdevice.png" alt="Device" className="w-100 h-100" style={{
                                  maxHeight: 575,
                                  maxWidth: 480,
                                  objectFit: "cover",
                                  display: "block",
                                }} />
                      </div>
                    </div>
                       <div className="col-12 col-md-6 p-4 text-start d-flex flex-column justify-content-between">
                        <div className="p-1">
                          <h4 className="fw-bold">Trial Activated</h4>
                          <p className="title">
                           Congratulations! Your device trial is now fully activated. Enjoy seamless operation and secure connectivity.
                          </p>

                          <div className="">
                            <button className="btn btn-success me-2" onClick={showDeviceDetails} disabled={isLoading}>
                              {!isLoading ? ("Show me device details") : (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                )}
                            </button>
                            
                          </div>
                        </div>
                        <div className="p-1 mt-2">
                        {isRating ?  <AddRating setRating={setRating} onRatingSubmit={onRatingSubmit} rating={rating}/>
                         :
                         <div className='submit-review mb-5'>
                         <span className='emoti-review fs-1'> {reviewData?.icon} </span>
                          <span className='pargp'>{reviewData?.text}</span>
                         </div>
                         }
                        </div>
                      </div>
                    </div>
    </>
  )
}

export default StepThree