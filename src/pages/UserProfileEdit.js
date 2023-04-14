import { useContext, useState } from "react";
import UserEdit from "../components/UserEdit";
import axios from "axios";
import AuthPage from "./AuthPage";
import { useNavigate } from "react-router-dom";

function UserProfileEdit(){
    const {storedToken, user} = useContext(AuthPage);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [profileImg, setProfileImg] = useState(user.profileImg);
    const [location, setLocation] = useState(user.location);

    

    const navigate = useNavigate()

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        const data ={ name, email, profileImg, location}

        axios
            .put(
                `${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
                data,
                { headers: {Authorization: `Bearer ${storedToken}`}})
            .then( response => {
                
                navigate("/userprofile");
            })
            .catch( error => console.log("error updating user profile", error))
    }

    return(
        <>
            <UserEdit 
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                profileImg={profileImg}
                setProfileImg={setProfileImg}
                location={location}
                setLocation={setLocation}
                handleUpdateSubmit={handleUpdateSubmit}
            />
        </>
    )

} 

export default UserProfileEdit;