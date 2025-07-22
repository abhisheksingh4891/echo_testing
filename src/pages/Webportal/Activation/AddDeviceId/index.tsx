import LayoutWrapper from "@/container/LayoutWrapper";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface Inputs {
  device_id: string;
}

const AddDeviceId = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  const guestMode = useSelector((state:any)=>state.appState?.userData.isGuestMode);
  const router = useRouter();
  const [showErrorMsg, setShowErrorMsg] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    // return
    let resp = "";
    if(data.device_id==='123456') {
      setIsLoading(true);
      setTimeout(() => {
        if(guestMode){
         router.replace("/Webportal/GuestMode/DeviceActivation");
        }else{
         router.replace("/Webportal/Activation/ConncetDeviceSteps");
        }
        setIsLoading(false);
      }, 2000);
    }else{
      if (resp === "1") {
        setShowErrorMsg(1);
      } else {
        setShowErrorMsg(2);
      } 
    }
  };
  return (
    <>
      <LayoutWrapper>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center mt-5">
            <div className="col-md-8 col-lg-8 d-flex flex-column flex-md-row p-5  mt-5">
              <div className="text-center mb-2 mb-md-0 bg-white py-4 px-3 device-box">
                <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M79.6068 37.8701C75.5475 37.8701 72.245 41.1726 72.245 45.2319C72.245 48.934 74.9925 52.0053 78.5551 52.5173V61.0071H56.4698C55.8891 61.0071 55.4181 61.4781 55.4181 62.0588V73.6273H34.4543C32.0962 73.6273 30.1777 75.5456 30.1777 77.9039V115.625C30.1777 117.983 32.0962 119.901 34.4543 119.901H124.759C127.117 119.901 129.035 117.983 129.035 115.625V77.9039C129.036 75.5456 127.118 73.6273 124.759 73.6273H103.796V62.0588C103.796 61.4781 103.325 61.0071 102.744 61.0071H80.6585V52.5173C84.2212 52.0051 86.9686 48.934 86.9686 45.2319C86.9686 41.1726 83.6661 37.8701 79.6068 37.8701ZM47.9754 84.1442H58.6541C59.2348 84.1442 59.7058 84.6149 59.7058 85.1958V90.3733H64.8833C65.464 90.3733 65.9349 90.8441 65.9349 91.425V102.104C65.9349 102.685 65.464 103.155 64.8833 103.155H59.7058V108.333C59.7058 108.914 59.2348 109.385 58.6541 109.385H47.9754C47.3947 109.385 46.9237 108.914 46.9237 108.333V103.155H41.7462C41.1655 103.155 40.6946 102.685 40.6946 102.104V91.425C40.6946 90.8441 41.1655 90.3733 41.7462 90.3733H46.9237V85.1958C46.9237 84.6149 47.3947 84.1442 47.9754 84.1442ZM100.56 84.1442H111.238C111.819 84.1442 112.29 84.6149 112.29 85.1958V90.3733H117.467C118.048 90.3733 118.519 90.8441 118.519 91.425V102.104C118.519 102.685 118.048 103.155 117.467 103.155H112.29V108.333C112.29 108.914 111.819 109.385 111.238 109.385H100.56C99.9786 109.385 99.5079 108.914 99.5079 108.333V103.155H94.3304C93.7494 103.155 93.2787 102.685 93.2787 102.104V91.425C93.2787 90.8441 93.7494 90.3733 94.3304 90.3733H99.5079V85.1958C99.5079 84.6149 99.9786 84.1442 100.56 84.1442ZM49.0271 86.2475V91.425C49.0271 92.006 48.5561 92.4767 47.9754 92.4767H42.7979V101.052H47.9754C48.5561 101.052 49.0271 101.523 49.0271 102.104V107.281H57.6024V102.104C57.6024 101.523 58.0734 101.052 58.6541 101.052H63.8316V92.4767H58.6541C58.0734 92.4767 57.6024 92.006 57.6024 91.425V86.2475H49.0271ZM101.611 86.2475V91.425C101.611 92.006 101.14 92.4767 100.56 92.4767H95.3821V101.052H100.56C101.14 101.052 101.611 101.523 101.611 102.104V107.281H110.187V102.104C110.187 101.523 110.657 101.052 111.238 101.052H116.416V92.4767H111.238C110.657 92.4767 110.187 92.006 110.187 91.425V86.2475H101.611Z"
                    fill="#10052F" />
                  <path
                    d="M80 0C35.8894 0 0 35.8894 0 80C0 124.111 35.8894 160 80 160C124.111 160 160 124.111 160 80C160 35.8894 124.111 0 80 0ZM80 12.3077C96.4904 12.3077 111.538 18.125 123.269 27.8846L27.8846 123.269C18.125 111.538 12.3077 96.4904 12.3077 80C12.3077 42.5481 42.5481 12.3077 80 12.3077ZM132.115 36.7308C141.875 48.4615 147.692 63.5096 147.692 80C147.692 117.452 117.452 147.692 80 147.692C63.5096 147.692 48.4615 141.875 36.7308 132.115L132.115 36.7308Z"
                    fill="#FF0000" />
                </svg>
              </div>
              <div className="col-6 device-content">
                  <div className="ms-md-4">
                    <h2 className=" ">Enter Your Device ID</h2>
                      <input type="text" className={`form-control mt-4  ${errors.device_id ? "is-invalid" : "" }`}
                        {...register("device_id", {
                        required: "This field is required",
                        maxLength: {value: 50, message: "This input exceed maxLength.", },
                        onChange:(e)=> {
                        let value = e.target.value;
                        if (value) {
                        setShowErrorMsg(0);
                        } else {}
                        setShowErrorMsg(0);
                        }
                        })}
                        autoFocus
                        // style={{ maxWidth: "300px" }}
                        placeholder="Device ID {1-6}"
                      />
                    {errors?.device_id?.message && (
                      <div className="mt-3 alert-danger ">
                        {errors?.device_id?.message}
                    </div>
                    )}
                    {showErrorMsg === 1 ? (
                    <>
                      <div className="alert-danger mt-3" >
                        Device ID not found.
                      </div>
                      <div className="d-flex gap-2 mt-3">
                        <button className=" btn btn-success" onClick={handleSubmit(onSubmit)}>
                          Add Device
                        </button>
                      </div>
                    </>
                    ) : showErrorMsg === 2 ? (
                    <>
                      <div className=" alert-text alert-warning mt-2">
                        This device is linked to another account ending with{" "}
                        <strong> j******n@g***l.com</strong>
                      </div>
                      <div className="d-flex gap-2 mt-2">
                        <button className="btn contact-support">
                          Contact Support
                        </button>
                        <button className="btn btn-success">
                          Go to Settings
                        </button>
                      </div>
                    </>
                    ) : (
                    <div className="col-sm-12 mt-3">
                      <button className="bottom-fixed btn btn-success" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
                        {!isLoading ? (
                        "Add Device"
                        ) : (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        )}
                      </button>
                    </div>
                    )}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </>
  );
};

export default AddDeviceId;
