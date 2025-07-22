import AddRating from '@/ProjectComponents/AddRating'
import React from 'react'

const GuestDashboard = ({isEditing,errors, setDeviceName, register,deviceName, onSubmit,handleSubmit,setIsEditing, id, handleDisconnect, setRating, rating,onRatingSubmit, isRating, reviewData}) => {
  
  return (
         <div className="justify-content-center d-flex">
        <div
          className="row step-box">
          <div className="row g-0 ">
            <div
              className="col-md-6"
              style={{
                width: 480,
                height: 575,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
              }}
            >
              <img
                src="/assets/images/connectdevice.png"
                alt="Device Image"
                className="img-fluid rounded "
              />
            </div>
            <div className="col-md-6 text-start p-4">
              <div className="d-flex gap-2">
                {isEditing ? (
                  <>
                 <div className="col-lg-8">
                     <input type="text" 
                     className={`form-control title ${errors.device_name ? "is-invalid" : "" }`}
                      {...register("device_name", {
                      required: true,
                      maxLength: {
                      value: 32,
                      message: "This input exceed maxLength.", },
                      onChange:(e)=> setDeviceName(e.target.value)
                      })}
                      autoFocus
                      // style={{ maxWidth: "300px" }}
                      placeholder="Device Id"
                      defaultValue={deviceName}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-outline-success"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="fw-bold mb-0">{deviceName}</h4>
                       <button className="edit">
                          <span className="bi bi-pencil" style={{fontSize:'16px'}} onClick={() => setIsEditing(true)}>
                          </span>
                        </button>
                  </>
                )}
              </div>
            <div className='d-flex flex-column'>
             <ul className="list-unstyled "
                    style={{ fontWeight: 500 }}
                  >
                    <li className="mt-1">
                      <span className="me-2 text">Device ID: </span>{" "}
                      <span className="title">{id}</span>
                    </li>
                    <li className="mb-2 d-flex mt-1 text">
                      <span className="me-2">Connection Status:</span>
                      <span className="devicetab"><span className="circular-dot"></span>Connected</span>
                    </li>
                    <li className="mb-2 d-flex mt-1 text">
                      <span className="me-2">Activation Status:</span>
                      <span className="devicetab">  <span className="circular-dot"></span> Trial Activated</span>
                    </li>
                  </ul>
                <div className="mb-2">
                  <button className="btn btn-outline-danger me-2" onClick={handleDisconnect}>
                    Disconnect
                  </button>
                  <button className="btn btn-success me-2">Settings</button>
                </div>
                {isRating ?  <AddRating setRating={setRating} onRatingSubmit={onRatingSubmit} rating={rating}/>
                  :
                  <div className='submit-review mt-5'>
                  <span className='emoti-review fs-1'> {reviewData?.icon} </span>
                  <span className='pargp'>{reviewData?.text}</span>
                  </div>
                  }
                  </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default GuestDashboard