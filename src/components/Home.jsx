import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Cars from '../components/Cars';
import Admin from '../components/Admin';

const Home = () => {

    const { userData, loading, fetchUserDetails, fetchCars, setLoggedIn, cars } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login');
            return;
        } else {
            const fetchData = async () => {
                await fetchUserDetails();
                await fetchCars();
            }
            setLoggedIn(true);
            fetchData();
        }
        // eslint-disable-next-line
    }, []);

  return (
    <>
        {
            loading ? (<Loader />) : (
                <div className='py-[12vh] min-h-screen flex flex-col gap-y-7 w-10/12 max-ipad:w-11/12 max-phone:w-[95%] mx-auto'>
                    <h1 className='text-3xl font-semibold text-center max-lg:text-2xl max-ipad:text-xl max-md:text-lg max-phone:text-[1rem]'>Assignment for Quadiro Technologies</h1>
                    {
                        userData.role === "User" && <Cars cars={cars} />
                    }
                    {
                        userData.role === "Admin" && <Admin cars={cars} />
                    }
                </div>
            )
        }
    </>
  )
}

export default Home
