import React from 'react'

const Car = ({ car, idx }) => {
  return (
    <div className='w-full flex items-center text-xl justify-between max-ipad:text-lg max-md:text-sm max-phone:text-xs'>
        <p className='text-center w-[20%] max-md:w-[30%]'>{idx}</p>
        <p className='w-full text-center'>{car.carName}</p>
        <p className='w-full text-center'>{car.manufacturingYear}</p>
        <p className='w-full text-center'>{car.price}</p>
    </div>
  )
}

export default Car
