import React, { useState } from 'react';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import NewCar from './NewCar';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const Admin = ({ cars }) => {

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCar, setEditCar] = useState({});
  const [id, setId] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className={`flex min-h-[70vh] flex-col gap-y-5 max-md:p-5 bg-white p-7 max-ipad:gap-y-5 max-phone:gap-y-3 max-phone:p-3 rounded-lg ${(showModal || showEditModal || showDelete) && 'opacity-[0.55]'}`}>
        <h2 className='text-xl font-semibold max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'>Admin Panel</h2>
        <button onClick={() => {
          setShowModal(true);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }} className='bg-black text-white rounded-md py-3 text-xl font-semibold flex items-center justify-center gap-x-3 w-fit px-5  max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs max-phone:gap-x-2 max-phone:px-3 max-phone:w-full'>
          <span>Enter New Car details</span>
          <IoMdAddCircle />
        </button>
        <div className='grid grid-cols-3 gap-7 max-ipad:grid-cols-2 max-sm:grid-cols-1 place-items-center w-full' >
            {
              cars.map((car) => (
                <div key={car._id} className='flex bg-[#c1c1c1] flex-col w-full gap-y-3 p-5 rounded-md max-md:gap-y-2 max-sm:p-3 max-md:p-4'>
                    <p className='text-2xl font-semibold max-ipad:text-xl max-md:text-lg max-phone:text-[1rem]'>{car.carName}</p>
                    <p className='max-md:text-sm max-phone:text-xs'><span>Manufacturing Year: </span><span className='font-semibold'>{car.manufacturingYear}</span></p>
                    <p className='flex items-center gap-x-3 max-phone:gap-x-1 max-md:gap-x-2 max-md:text-sm max-phone:text-xs'><span>Price: </span><span className='font-semibold text-xl max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs flex items-center gap-x-1'><span><FaIndianRupeeSign className='text-lg max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs' /></span>{car.price}</span></p>


                    <div className='flex items-center justify-between'>
                        <div onClick={() => {
                          setShowEditModal(true);
                          setEditCar(car);
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                          });
                        }} title='edit' className='flex items-center justify-center rounded-full text-white bg-black p-3 cursor-pointer'>
                          <AiFillEdit className='text-xl max-ipad:text-lg max-md:text-[1rem] max-phone:text-sm' />
                        </div>

                        <div onClick={() => {
                          setShowDelete(true);
                          setId(car._id);
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                          });
                        }} title='delete' className='flex items-center justify-center rounded-full text-white bg-black p-3 cursor-pointer'>
                          <MdDelete className='text-xl max-ipad:text-lg max-md:text-[1rem] max-phone:text-sm' />
                        </div>
                    </div>
                </div>
              ))
            }
        </div>

      </div>
      <NewCar showModal={showModal} setShowModal={setShowModal} />
      <EditModal editCar={editCar} setEditCar={setEditCar} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
      <DeleteModal showDelete={showDelete} setShowDelete={setShowDelete} id={id} />
    </>
  )
}

export default Admin
