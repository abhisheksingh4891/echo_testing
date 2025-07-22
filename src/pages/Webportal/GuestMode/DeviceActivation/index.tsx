import React from 'react';
import StepOne from '../../Activation/ConncetDeviceSteps/StepOne';
import LayoutWrapper from '@/container/LayoutWrapper';
import { useRouter } from 'next/router';

const DeviceActivation = () => {
    const router= useRouter();
    const handleNext =()=>{
      router.replace("/Webportal/Dashboard/XXX1110");
    }

  return (
    <LayoutWrapper>
      <div className='d-flex justify-content-center'>
        <StepOne handleNext={handleNext} />
        </div>
    </LayoutWrapper>
  )
}

export default DeviceActivation