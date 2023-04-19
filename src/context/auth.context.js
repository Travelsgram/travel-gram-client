import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const AuthContext = React.createContext();

function AuthProviderWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [storedToken, setStoredToken] = useState(null)

   const navigate = useNavigate()

    const storeToken = (token) => {
        localStorage.setItem("authToken", token);
    }

    const authenticateUser = () => {
        const storedToken = localStorage.getItem("authToken");
        setStoredToken(storedToken);
        if(storedToken){
            axios.get(
                `${process.env.REACT_APP_API_URL}/auth/verify`,
                { headers: {Authorization: `Bearer ${storedToken}`}}
            )
            .then( response => {
                const user = response.data;

                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(user);
            })
            .catch( error => {
                setIsLoggedIn(false);
                setIsLoading(true);
                setUser(null)
            });
        }else{
            setIsLoggedIn(false);
            setIsLoading(true);
            setUser(null);
            navigate("/register");
        }
    }

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOutUser = () => {
        
        removeToken();

        authenticateUser()
    }

    useEffect(() => {
        authenticateUser()
    }, []);

    return(
        <AuthContext.Provider 
            value={{
                isLoggedIn,
                isLoading,
                user,
                storeToken,
                authenticateUser,
                logOutUser,
                storedToken, 
                setUser
            }}>
            {props.children}
        </AuthContext.Provider >
    )
}

export { AuthProviderWrapper, AuthContext};