import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const EditModal = ({ editCar, setEditCar, setShowEditModal, showEditModal }) => {

    const { setLoading, fetchCars } = useContext(AppContext);

    const changeHandler = (e) => {
        setEditCar(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowEditModal(false);
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + '/editCar';
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
                "carId": editCar._id
            },
            body: JSON.stringify({...editCar})
        });

        const responseData = await response.json();
        if(responseData.success) {
            setLoading(false);
            await fetchCars();
            toast.success(responseData.message);
        } else {
            setLoading(false);
            toast.error(responseData.message);
        }
    };

  return (
    <div className={`absolute w-full h-screen flex items-center justify-center ${showEditModal ? 'left-0' : '-left-[10000px]'} transition-all duration-300 ease-linear top-0`}>
        <div className='w-[40%] max-xl:w-[50%] max-ipad:w-[60%] max-sm:w-[80%]  flex flex-col gap-y-5 p-5 bg-white shadow-lg rounded-lg max-phone:gap-y-3'>
        <h1 className='text-black text-2xl uppercase font-semibold text-center max-ipad:text-xl max-md:text-lg max-phone:text-[1rem]'>Edit Car Details</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-y-4 max-phone:gap-y-2'>
            <div className='flex flex-col gap-y-1'>
                <fieldset className='w-full border-2 border-black px-3 py-1 rounded max-ipad:py-0 max-phone:border'>
                    <legend className='text-lg font-semibold max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'>Car Name</legend>
                    <div className='w-full flex items-center justify-between'>
                        <input 
                            type="text" 
                            name='carName'
                            className='border-none outline-none w-full text-lg max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'
                            onChange={changeHandler}
                            value={editCar.carName}
                            required
                        />
                    </div>
                </fieldset>
            </div>

            <div className='flex flex-col gap-y-1'>
            <fieldset className='w-full border-2 border-black px-3 py-1 rounded max-ipad:py-0 max-phone:border'>
                    <legend className='text-lg font-semibold max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'>Manufacturing Year</legend>
                    <div className='w-full flex items-center justify-between'>
                        <input 
                            type="text" 
                            name='manufacturingYear'
                            className='border-none outline-none w-full text-lg max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'
                            onChange={changeHandler}
                            value={editCar.manufacturingYear}
                            required
                        />
                    </div>
                </fieldset>
            </div>
            <div className='flex flex-col gap-y-1'>
                <fieldset className='w-full border-2 border-black px-3 py-1 rounded max-ipad:py-0 max-phone:border'>
                    <legend className='text-lg font-semibold max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'>Price</legend>
                    <div className='w-full flex items-center justify-between'>
                        <input 
                            type="text" 
                            name='price'
                            className='border-none outline-none w-full text-lg max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'
                            onChange={changeHandler}
                            value={editCar.price}
                            required
                        />
                    </div>
                </fieldset>
            </div>

            <button type='submit' className='bg-black text-lg text-white py-2 rounded-lg font-semibold uppercase hover:bg-[#1f1f1f] transition-all duration-300 ease-in-out max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'>Edit</button>
        </form>
        <div onClick={() => {
            setShowEditModal(false);
        }} className='bg-[#797979] text-lg text-white py-2 rounded-lg font-semibold uppercase transition-all duration-300 ease-in-out cursor-pointer text-center max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'>Close</div>

        </div>
    </div>
  )
}

export default EditModal
