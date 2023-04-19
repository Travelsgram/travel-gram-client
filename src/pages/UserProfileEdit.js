import { useContext, useState } from "react";
import UserEdit from "../components/UserEdit";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../api/service";

function UserProfileEdit(props){
    const {storedToken, user} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(undefined);

   
    
    const def = {
        name:props.curUser.name,
        email: props.curUser.email,
        profileImg: props.curUser.profileImg,
        location: props.curUser.location
    }
    
    const [name, setName] = useState(def.name);
    const [email, setEmail] = useState(def.email);
    const [image, setImage] = useState("");
    const [location, setLocation] = useState(def.location);

    const naviate = useNavigate()

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        const uploadData = new FormData();
        uploadData.append("image", image);

        service
            .uploadImage(uploadData)
            .then( (response) => {
                const data ={ name, email, profileImg:response.fileUrl, location }

                axios
                    .put(
                        `${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
                        data,
                        { headers: {Authorization: `Bearer ${storedToken}`}})
                    .then( response => {
                        naviate("/userprofile");
                        props.profileUpdate();
                        props.getSiteUpdate();
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
    }

    const handleFileUpload = (e) => {
        setImage(e.target.files[0]);
    };


    return(
        <>
            <UserEdit 
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                image={image}
                setImage={setImage}
                location={location}
                setLocation={setLocation}
                handleUpdateSubmit={handleUpdateSubmit}
                errorMessage={errorMessage}
                handleFileUpload={handleFileUpload}
            />
        </>
    )

} 

export default UserProfileEdit;