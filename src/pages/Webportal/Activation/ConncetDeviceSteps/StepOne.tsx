import React from "react";

const StepOne = ({ handleNext }) => {
  return (
    <>
  <div className="">
      <div className="row step-box" 
      // style={{
      //           maxWidth: "960px",
      //           minHeight: "575px",
      //           borderRadius: "15px",
      //           boxShadow: "0px 0px 20px 0px #A2A2A24D"

      //         }}
              >
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

        <div className="col-12 col-md-6 p-5 text-start d-flex flex-column justify-content-between">
          <div>
            <h4 className="fw-bold">Connect your device</h4>
            <p className="title">
              Plug in your remote device via USB. Ensure the correct
              driver is installed so your system can detect the device.
            </p>
            <div className="mb-4">
              <button className="btn btn-success me-2" onClick={handleNext}>
                Connect to Device
              </button>
              <button className="btn btn-secondary">Help</button>
            </div>
          </div>
          <div className="mt-5">
            <p className="p-success fw-bold mb-2">Tips:</p>
            <ul className="ps-3">
              <li className="title"> Make sure the transmitter is powered ON.</li>
              <li className="title"> Use the USB cable provided with the device. </li>
            </ul>
          </div>
        </div>
      </div>
 </div>
    </>
  );
};

export default StepOne;
