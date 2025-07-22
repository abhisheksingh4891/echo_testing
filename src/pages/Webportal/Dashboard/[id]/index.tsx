"use client";
import React, { useState } from "react";
import Webportal from "@/container/Webportal";
import { useForm } from "react-hook-form";
import AddRating from "@/ProjectComponents/AddRating";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import BuyProduct from "@/ProjectComponents/BuyProduct";
import GuestDashboard from "../GuestDashboard";
import LayoutWrapper from "@/container/LayoutWrapper";
import { useSelector } from "react-redux";

interface Inputs {
  device_name: string;
}

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  const guestMode = useSelector((state:any)=>state.appState?.userData.isGuestMode);
  const router = useRouter();
  const { id } = router.query;
  const [isEditing, setIsEditing] = useState(false);
  const [deviceName, setDeviceName] = useState("My Device Name");
  const [isRating, setIsRating]= useState(true);
  const [reviewData, setReviewData] = useState({
          icon:null,
          text:null
        });
  
  const [rating, setRating] = useState({
    count: null,
    description: null,
  });

  const onSubmit = (data) => {
    setIsEditing(!isEditing);
  };

  const onRatingSubmit = () => {
    setIsRating(false);
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
  };

  const handleRemoveDevice = () => {
    Swal.fire({
      customClass: "rounded-4",
      title:
        '<strong style="font-weight:600; font-size:22px; text-align:start !important; display:flex;">Are you sure you want to remove<br>this device?</strong>',
       html: `
            <div class='title' style="text-align:start;">
            Removing My Device Name (Device ID: XYZ123) will disconnect it from your account.
            You’ll need the Device ID to reconnect it later.
            <br><br><span class='me-4' id="countdown" style="color: red; font-weight: bold;bottom:0">5s</span>
            <button class='btn btn-danger me-4' id="remove">Yes, Remove</button>
            <button class='btn btn-outline-success' id="cancel">Cancel</button>
            </div>
        `,
      showConfirmButton: false,
      didOpen: () => {
        let timeLeft = 5;
        const countdownEl = document.getElementById("countdown");
        const removeBtn = document.getElementById("remove");
        const cancelBtn = document.getElementById("cancel");

        removeBtn.ariaDisabled = "true";

        const timerInterval = setInterval(() => {
          timeLeft--;
          if (countdownEl) countdownEl.innerText = `${timeLeft}s`;
          if (timeLeft === 0) {
            removeBtn.ariaDisabled = "false";
            clearInterval(timerInterval);
            // Swal.clickConfirm(); // auto-confirm if needed
          }
        }, 1000);

        // Handle "Yes, Remove"
        removeBtn.addEventListener("click", () => {
          Swal.close(); // or Swal.fire(...) again if you want a new popup
          console.log("Device removed");
        });

        // Handle "Cancel"
        cancelBtn.addEventListener("click", () => {
          Swal.close();
          console.log("Cancelled");
        });
      },
    });
    return;
  };

  const handleDisconnect = () => {};
  
  return (
    <>
      {guestMode ? (
        <LayoutWrapper>
          <GuestDashboard
            isEditing={isEditing}
            errors={errors}
            setDeviceName={setDeviceName}
            register={register}
            deviceName={deviceName}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            setIsEditing={setIsEditing}
            id={id}
            handleDisconnect={handleDisconnect}
            setRating={setRating}
            rating={rating}
            onRatingSubmit={onRatingSubmit}
            reviewData={reviewData}
            isRating={isRating}
          />
        </LayoutWrapper>
      ) : (
        <Webportal>
          <div className="justify-content-center">
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
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-6 text-start p-4">
                  <div className="d-flex gap-2">
                    {isEditing ? (
                      <>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className={`form-control title ${
                              errors.device_name ? "is-invalid" : ""
                            }`}
                            {...register("device_name", {
                              required: true,
                              maxLength: {
                                value: 32,
                                message: "This input exceed maxLength.",
                              },
                              onChange: (e) => setDeviceName(e.target.value),
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
                  <ul
                    className="list-unstyled"
                    style={{ fontWeight: 500 }}
                  >
                    <li className="mt-1">
                      <span className="me-2 text">Device ID: </span>{" "}
                      <span className="title">{id}</span>
                    </li>
                    <li className="mb-2 d-flex mt-1 text">
                      <span className="me-2 mt-1">Connection Status:</span>
                      <span className="devicetab"><span className="circular-dot"></span>Connected</span>
                    </li>
                    <li className="mb-2 d-flex mt-1 text">
                      <span className="me-2 mt-1">Activation Status:</span>
                      <span className="devicetab">  <span className="circular-dot"></span> Trial Activated</span>
                    </li>
                  </ul>

                  <div className="mt-3 mb-2">
                    <button
                      className="btn btn-outline-danger me-2"
                      onClick={handleDisconnect}
                    >
                      Disconnect
                    </button>
                    <button className="btn btn-success me-2">Settings</button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleRemoveDevice}
                    >
                      Remove Device
                    </button>
                  </div>
                  {id &&<>
                  {id === "xxx123" ? (
                    <BuyProduct />
                     ) : (
                    <>
                    {isRating ?  <AddRating setRating={setRating} onRatingSubmit={onRatingSubmit} rating={rating}/>
                         :
                         <div className='submit-review mt-5'>
                         <span className='emoti-review fs-1'> {reviewData?.icon} </span>
                          <span className='pargp'>{reviewData?.text}</span>
                         </div>
                         }
                    </>
                  )}</>}
                </div>
              </div>
            </div>
          </div>
        </Webportal>
      )}
    </>
  );
};

export default Dashboard;
