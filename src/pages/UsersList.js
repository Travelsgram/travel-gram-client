import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";


export default function UserProfile() {
const [users, setUsers] = useState(null)

const {storedToken, user} = useContext(AuthContext);

useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users`,
      { headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log("error getting user from API", err));
  }, []);

  const addFollow = (followId) => {

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/users/follow/${followId}`,
        { headers: {Authorization: `Bearer ${storedToken}`}}
        )
      .then(response =>{
        console.log(response);
      })
      .catch((err) => console.log("error getting user from API", err))

  }

  return (
    <div>
      <h1>User Profile Information</h1>

      {users ? (
        users.map((thisUser) => {
          return (
            <div key={thisUser._id} className="User">
            <p> Name: {thisUser.name}</p>
            <p> Email: {thisUser.email}</p>
            <img src={thisUser.profileImg} alt={thisUser.name} />
            <p> Birthday : {thisUser.birthdate} </p>
            <p> Location: {thisUser.location}</p>

            <button onClick={() => {addFollow(thisUser._id)}}>Follow</button>
    
            </div>
          );
        })
      ) : (
        <p> Loading user information...</p>
      )}
    </div>
  );
}