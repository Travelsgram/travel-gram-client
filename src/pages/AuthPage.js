import { useContext, useState } from "react";

import axios from "axios";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";

import imageOne from "../images/imageOne.jpeg";
import imageTwo from "../images/imagesTwo.jpeg";
import imageThree from "../images/imageThree.jpeg";
import { ThemeContext } from "../context/theme.context";
import { Box } from "@chakra-ui/react";


function AuthPage(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("")
    const [birthdate, setBirthdate] = useState("");
    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [form, setForm] = useState("Signup")



    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const { bodyTheme } = useContext(ThemeContext)
    
    const handleSignupSubmit = (e) => {
        e.preventDefault();

        if(!image){
            const num = Math.floor(Math.random() * (3 - 1 + 1) + 1);
            if(num === 1){
                setImage({imageOne});
            }else if(num === 2){
                setImage({imageTwo});
            }else if(num === 3){
                setImage({imageThree})
            }
        }

    if(image){
        const uploadData = new FormData();
        uploadData.append("image", image);

        service
            .uploadImage(uploadData)
            .then( (response) => {
                const req = { email, password, name, profileImg:response.fileUrl, birthdate, location }

                axios
                    .post(`${process.env.REACT_APP_API_URL}/auth/signup`, req)
                    .then( response => {
                        setName("");
                        setImage("");
                        setBirthdate("");
                        setLocation("");
                        setForm("Login")
                    })
                    .catch( error => {
                        const errorDescription = error.response.data.message;
                        setErrorMessage(errorDescription);
                    })
            })
            .catch(error => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })  
        }else{
            const req = { email, password, name, birthdate, location }

            axios
                .post(`${process.env.REACT_APP_API_URL}/auth/signup`, req)
                .then( response => {
                    setName("");
                    setImage("");
                    setBirthdate("");
                    setLocation("");
                    setForm("Login")
                })
                .catch( error => {
                    const errorDescription = error.response.data.message;
                    setErrorMessage(errorDescription);
                })
            }    
    }
    const handleFileUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const req = { email, password};

        axios
            .post(`${process.env.REACT_APP_API_URL}/auth/login`, req)
            .then( response => {
                storeToken(response.data.authToken);

                authenticateUser()
                navigate("/")
            })
            .catch( error => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
              })
    };

    const toggleForm = () => {
        if(form === "Signup"){
            setForm("Login")
        }else{
            setForm("Signup")
        }
    }

    return(
        <Box className={bodyTheme}>
        {form === "Signup" && 
        <Signup 
            handleSignupSubmit={handleSignupSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
            profileImg={image}
            setImage={setImage}
            birthdate={birthdate}
            setBirthdate={setBirthdate}
            location={location}
            setLocation={setLocation}
            errorMessage={errorMessage}
            toggleForm={toggleForm}
            handleFileUpload={handleFileUpload}
            />
        }
        {form === "Login" &&
        <Login 
            handleLoginSubmit={handleLoginSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errorMessage={errorMessage}
            toggleForm={toggleForm}
        />

        }



        </Box>
    )
}
export default AuthPage;