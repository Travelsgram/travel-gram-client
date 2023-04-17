import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import UserDetails from "../components/UserDetails";


export default function UserProfile() {
const [users, setUsers] = useState(null);
const [getUpdate, setGetUpdate] = useState(true);
const [search, setSearch] = useState("");
const [userDetails, setUserDetails] = useState(false);
const [userDetId, setUserDetId] = useState("")

const {storedToken} = useContext(AuthContext);

useEffect(() => {
  
  //*******************search query
   /* axios
    .get(`${process.env.REACT_APP_API_URL}/api/users?user=${search}`,
    { headers: {Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
      setUsers(response.data);
    })
    .catch((err) => console.log("error getting user from API", err)); */
  
    axios
    .get(`${process.env.REACT_APP_API_URL}/api/users`,
    { headers: {Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
      setUsers(response.data);
    })
    .catch((err) => console.log("error getting user from API", err));
  

  }, [getUpdate]);

  const addFollow = (followId) => {

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/users/follow/${followId}`,
        { headers: {Authorization: `Bearer ${storedToken}`}}
        )
      .then(response =>{
        getSiteUpdate();
      })
      .catch((err) => console.log("error getting user from API", err))

  }
  const getSiteUpdate = () => {
    getUpdate ? setGetUpdate(false) : setGetUpdate(true)
  }
  const getSearch = (e) => {
    setSearch(e.target.value);
    getSiteUpdate();
  }
  const renderUserDetails = (id) => {
    if(userDetails){
      setUserDetails(false);
      setUserDetails(false);
    }else if(!userDetails){
      setUserDetId(id);
      setUserDetails(true);
    }
  }


  return (
    <div>
      {!userDetails && 
        <div>
      <h1>all Users</h1>

      <input
        type="text"
        placeholder="Search User"
        value={search}
        onChange={(e)=>{getSearch(e)}}
      />

      {users ? 
      
      <div>
        {users.map((thisUser) => {
          return (
            <div key={thisUser._id} className="User">
            <Link onClick={()=>{renderUserDetails(thisUser._id)}}>
            <p> Name: {thisUser.name}</p>
            <p> Email: {thisUser.email}</p>
            <img src={thisUser.profileImg} alt={thisUser.name} />
            <p> Birthday : {thisUser.birthdate} </p>
            <p> Location: {thisUser.location}</p>

            <button onClick={() => {addFollow(thisUser._id)}}>Follow</button>
            <hr></hr>
            </Link>
            </div>
          );
        })}
        </div>
      

       : 
        <p> Loading user information...</p>
      }
    </div>
      }

      {userDetails && <UserDetails userDetId={userDetId} renderUserDetails={renderUserDetails} />}
    </div>
    
  );
}