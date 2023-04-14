import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";


export default function UserProfile() {
const [users, setUsers] = useState(null)

const {storedToken} = useContext(AuthContext);

useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users`,
      { headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log("error getting user from API", err));
  }, []);

  return (
    <div>
      <h1>User Profile Information</h1>

      {users ? (
        users.map((user) => {
          return (
            <div key={user._id} className="User">
            <p> Name: {user.name}</p>
            <p> Email: {user.email}</p>
            <img src={user.profileImg} alt={user.name} />
            <p> Birthday : {user.birthdate} </p>
            <p> Location: {user.location}</p>
    
            </div>
          );
        })
      ) : (
        <p> Loading user information...</p>
      )}
    </div>
  );
}