import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const NewCar = ({ showModal, setShowModal }) => {

    const { setLoading, fetchCars } = useContext(AppContext);

    const [data, setData] = useState({
        carName: "",
        manufacturingYear: "",
        price: "",
    });

    const changeHandler = (e) => {
        setData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowModal(false);
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + '/createCar';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({...data})
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
    <div className={`absolute w-full h-screen flex items-center justify-center ${showModal ? 'top-0' : '-top-[1000px]'} transition-all duration-300 ease-linear left-0`}>
      <div className='w-[40%] max-xl:w-[50%] max-ipad:w-[60%] max-sm:w-[80%] flex flex-col gap-y-5 p-5 bg-white shadow-lg rounded-lg max-phone:gap-y-2'>
        <h1 className='text-black text-2xl uppercase font-semibold text-center max-ipad:text-xl max-md:text-lg max-phone:text-[1rem]'>New Car Details</h1>
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
                            value={data.carName}
                            required
                        />
                    </div>
                </fieldset>
            </div>

            <div className='flex flex-col gap-y-1'>
                <fieldset className='w-full border-2 border-black px-3 py-1 rounded max-ipad:py-0 max-phone:border'>
                    <legend className='text-lg font-semibold max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'>Manufacturing Year</legend>
                    <div className='w-full flex items-center justify-between '>
                        <input 
                            type='number'
                            name='manufacturingYear'
                            className='border-none bg-transparent outline-none w-full text-lg max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'
                            value={data.manufacturingYear}
                            onChange={changeHandler}
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
                            type='number'
                            name='price'
                            className='border-none bg-transparent outline-none w-full text-lg max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'
                            value={data.price}
                            onChange={changeHandler}
                            required
                        />
                    </div>
                </fieldset>
            </div>

            <button className='bg-black text-lg text-white py-2 rounded-lg font-semibold uppercase hover:bg-[#1f1f1f] transition-all duration-300 ease-in-out max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'>Create</button>
        </form>
        <div onClick={() => {
            setShowModal(false);
        }} className='bg-[#797979] text-lg text-white py-2 rounded-lg font-semibold uppercase transition-all duration-300 ease-in-out cursor-pointer text-center max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs'>Close</div>

      </div>
    </div>
  )
}

export default NewCar
