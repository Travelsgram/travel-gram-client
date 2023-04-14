import { useContext, useState } from "react";
import UserEdit from "../components/UserEdit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function UserProfileEdit(){
    const {storedToken, user} = useContext(AuthContext);
    
    const def = {
        name:user.name,
        email: user.email,
        profileImg: user.profileImg,
        location: user.location
    }
    
    const [name, setName] = useState(def.name);
    const [email, setEmail] = useState(def.email);
    const [profileImg, setProfileImg] = useState(def.profileImg);
    const [location, setLocation] = useState(def.location);

    

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