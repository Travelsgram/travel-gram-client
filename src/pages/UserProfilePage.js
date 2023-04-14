import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import UserInfo from "../components/UserInfo";

function UserProfilePage(){
    const [curUser, setCurUser] = useState();
    
    const { storedToken, user, logOutUser } = useContext(AuthContext)

    useEffect( () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
        .then( response => {
            setCurUser(response.data)
        })
        .catch( error => console.log("error getting usersDetails", error))
    },[])

    const deleteProfile = () => {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
        .then( response => {
          logOutUser()
        })
        .catch( error => console.log("error deleting userprofile", error))

    }
  return(
    <>
    {curUser && <UserInfo curUser={curUser} deleteProfile={deleteProfile} />}

    </>
  )
}

export default UserProfilePage;