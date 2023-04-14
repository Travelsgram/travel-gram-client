import { useContext, useState } from "react";
import UserEdit from "../components/UserEdit";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function UserProfileEdit(props){
    const {storedToken, user} = useContext(AuthContext);

   
    
    const def = {
        name:props.curUser.name,
        email: props.curUser.email,
        profileImg: props.curUser.profileImg,
        location: props.curUser.location
    }
    
    const [name, setName] = useState(def.name);
    const [email, setEmail] = useState(def.email);
    const [profileImg, setProfileImg] = useState(def.profileImg);
    const [location, setLocation] = useState(def.location);

    const naviate = useNavigate()

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        const data ={ name, email, profileImg, location }

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