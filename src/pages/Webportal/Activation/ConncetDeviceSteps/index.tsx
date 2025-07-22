import React, { useEffect, useState } from "react";
import LayoutWrapper from "@/container/LayoutWrapper";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useDispatch, useSelector } from "react-redux";
import { devicePageStep } from "@/store/appSlice";
import Webportal from "@/container/Webportal";

const ConnectDeviceSteps = () => {
  const dispatch= useDispatch();
  const devicePageCount= useSelector((state:any)=>state?.appState?.pageStep)
  const [step, setStep] = useState(devicePageCount);

  const handleNext = () =>{ goToStep(step + 1)};

  const goToStep = (nextIndex: number) => {
        setStep(nextIndex);
        dispatch(devicePageStep(nextIndex));
  };


console.log(step)
  return (
    <LayoutWrapper>
      <div className="row">
        <div className="col-12">
          <div id="msform">
            <ul id="progressbar">
              <li className={`${step === 0 ? "active p-success" :step > 0 ? "done p-success":""} heading`}>
                Connect Device
              </li>
              <li className={`${step === 1 ? "active p-success" :step > 1 ? "done p-success":""} heading`}>
                Submit Activation Key
              </li>
              <li className={`${step === 2 ? "active p-success" :step > 2 ? "done p-success":""} heading`}>
                Activate Device
              </li>
            </ul>
            <div className="justify-content-center d-flex w-100">
            <fieldset style={{ display: step === 0 ? "block" : "none" }}>
             <StepOne handleNext={handleNext}/>
            </fieldset>
            <fieldset style={{ display: step === 1 ? "block" : "none" }}>
              <StepTwo handleNext={handleNext}/>
            </fieldset>
            <fieldset style={{ display: step === 2 ? "block" : "none" }}>
             <StepThree handleNext={handleNext}/>
            </fieldset>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default ConnectDeviceSteps;
