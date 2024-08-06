import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [cars, setCars] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    const fetchUserDetails = async () => {
        const url = process.env.REACT_APP_BASE_URL + '/auth/getUser';
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });

        const responseData = await response.json();
        
        if(responseData.success) {
            setUserData(responseData.user);
        } else {
            toast.error("Error fetching details");
        }
    }

    const fetchCars = async () => {
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + '/getAllCars';
        const response =  await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        const responseData = await response.json();
        
        if(responseData.success) {
            setCars(responseData.data);
        } else if(responseData.message === "Invalid token") {
            toast.error(responseData.message);
            navigate('/login');
        } else {
            toast.error(responseData.message);
        }
        setLoading(false);
    }

    const value = {
        loading,
        setLoading,
        userData,
        setUserData,
        cars,
        setCars,
        fetchUserDetails,
        fetchCars,
        loggedIn,
        setLoggedIn
    };

    return <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
};

export default AppContextProvider;