import { useState } from "react";

import axios from "axios";
import Signup from "../components/Signup";

function AuthPage(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [form, setForm] = useState("Signup")

    

    const handleSignupSubmit = (e) => {
        e.preventDefault()

        const req = { email, password, name, profileImg, birthdate, location };

        axios
            .post(`${process.env.REACT_APP_API_URL}/auth/signup`, req)
            .then( response => {
                toggleForm();
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })

    }

    const handleLoginSubmit = (e) => {

    };

    const toggleForm = () => {
        if(form === "Signup"){
            setForm("Login")
        }else{
            setForm("Signup")
        }
    }

    return(
        <>
        {form === "Signup" && 
        <Signup 
            handleSignupSubmit={handleSignupSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
            profileImg={profileImg}
            setProfileImg={setProfileImg}
            birthdate={birthdate}
            setBirthdate={setBirthdate}
            location={location}
            setLocation={setLocation}
            errorMessage={errorMessage}
            toggleForm={toggleForm}
            />
        }



        </>
    )
}
export default AuthPage;