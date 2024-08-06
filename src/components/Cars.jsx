import React from 'react'
import Car from './Car'
import { FaIndianRupeeSign } from "react-icons/fa6";

const Cars = ({ cars }) => {
  return (
    <div className='bg-white min-h-[70vh] h-fit rounded-lg p-7 max-md:p-5 flex flex-col gap-y-7 max-ipad:gap-y-5 max-phone:gap-y-3 max-phone:p-3'>
      <h2 className='text-3xl font-semibold text-center max-lg:text-2xl max-ipad:text-xl max-md:text-lg max-phone:text-[1rem]'>Available Cars</h2>

      <div className='grid grid-cols-1 rounded-lg max-phone:rounded gap-y-2 bg-[#c1c1c1]'>
        <div className='w-full flex items-center text-xl justify-between rounded-t-lg bg-black text-white p-2 font-[500] max-ipad:text-lg max-md:text-sm max-phone:text-xs'>
          <p className='text-center w-[20%] max-md:w-[30%]'>S No.</p>
          <p className='w-full text-center'>Car Name</p>
          <p className='w-full text-center'>Manufacturing Year</p>
          <p className='w-full text-center flex items-center gap-x-2 justify-center'>Price<span className='flex items-center'>(<FaIndianRupeeSign className='text-lg max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs' />)</span></p>
        </div>
        {
          cars.map((car, idx) => (
            <Car key={car._id} car={car} idx={idx+1} />
          ))
        }
      </div>
    </div>
  )
}

export default Cars
