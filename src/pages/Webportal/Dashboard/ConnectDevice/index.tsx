import Webportal from '@/container/Webportal'
import React from 'react'
import StepOne from '../../Activation/ConncetDeviceSteps/StepOne'
import Swal from 'sweetalert2'

const ConnectDevice = () => {
    const handleNext=()=>{
        Swal.fire({title:"Device not found!", icon:"error",showConfirmButton:false})
    }
  return (
    <Webportal>
        <StepOne handleNext={handleNext} />
    </Webportal>
  )
}

export default ConnectDevice