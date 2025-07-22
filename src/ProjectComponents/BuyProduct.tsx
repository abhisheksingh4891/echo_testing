import React from 'react'

const BuyProduct = () => {
  return (
    <>
     <div className=" fixed-bottom position-relative mt-5" style={{background: "#FFF9E4",
        width: 410,
        height: 179,
        gap: '10px',
        borderRadius: '8px',
        padding: '20px',
        textAlign:"center"
    }}>
        <div>
        <h6 style={{fontSize:"20px"}}>Ready to keep using your device long-term?</h6>
        <p className='pargp'>Purchase the full product for uninterrupted access.</p>
        <button className='btn btn-warning'>Buy Product</button>
        </div>
    </div> 
    </>
  )
}

export default BuyProduct