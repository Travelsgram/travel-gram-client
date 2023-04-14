import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

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
    {curUser &&
        <>
          <img src={curUser.image} alt="profilepic" />
          <h2>{curUser.name}</h2>
          <p>{curUser.location}</p>
          <p>{curUser.posts}</p>
          <p>{curUser.travelguides}</p>

          <button onClick={()=>{deleteProfile()}}>delete my profile</button>
          <Link to="/user-update">update my profile</Link>
        </>
      }

    </>
  )
}

export default UserProfilePage;