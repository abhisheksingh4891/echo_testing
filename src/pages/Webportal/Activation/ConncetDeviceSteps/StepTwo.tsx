import React, { useState } from "react";
import { useForm } from "react-hook-form";
interface Inputs {
  activationkey: string;
}
const StepTwo = ({ handleNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const onSubmit = (e) => {
    // let resp = 'err';
    let resp = "";

    if (resp === "err") {
      setShowErrorMsg(true);
    } else {
      handleNext();
    }
  };
console.log(errors?.activationkey?.message)
  return (
    <>
      {/* <div className="container-fluid px-2 px-md-4 py-3"> */}
      <div className="">
        <div className="row step-box">
          <div className="col-12 col-md-6 justify-content-center p-0"
            style={{
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",
              overflow: "hidden",
            }}
          >
            <div className="w-100 h-100"
              style={{
                height: "100%",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                overflow: "hidden",
              }}
            >
              <img src="/assets/images/connectdevice.png" alt="Device" className="w-100 h-100" style={{
                  maxHeight: 575,
                  maxWidth: 480,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 p-5 text-start d-flex flex-column justify-content-between">
            <div className="">
              <h4 className="fw-bold">Activate Your Device</h4>
              <p className="title">
                This key links your device with our system and enables secure
                communication with your transmitter.
              </p>

              <div className="row">
                <div className="col-lg-7 col-sm-12 mt-1 mb-1">
                  <input
                    type="text"
                    className={`form-control rounded-3 title ${
                      errors.activationkey ? "is-invalid" : ""
                    }`}
                    {...register("activationkey", {
                      required: true,
                      maxLength: {
                        value: 50,
                        message: "This input exceed maxLength.",
                      },
                      onChange: (e) => {
                        let val = e.target.value;
                        console.log(val);
                        if (val) {
                          setShowErrorMsg(false);
                        }
                        setShowErrorMsg(false);
                      },
                    })}
                    autoFocus
                    style={{ maxWidth: "300px" }}
                    placeholder="Enter activation key"
                  />
                </div>
                <button className="btn btn-success col-lg-4 col-sm-12"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit Key{" "}
                </button>
              </div>
              {errors?.activationkey?.message && (
                <div className="col-7 alert-text alert-danger py-2 px-3 mb-2 small mt-2">
                  {errors?.activationkey?.message}
                </div>
              )}
              {showErrorMsg && (
                <div className="alert-text alert-danger py-2 px-3 mb-2 mt-3"
                  style={{ maxWidth: "400px" }}
                >
                  Show the error message here upon submit a key
                  <keygen />
                </div>
              )}
            </div>
            <div className="mt-2">
              <p className="p-success">Don’t have your key?</p>
              <p className="pargp">
                Check your email or device packaging for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
