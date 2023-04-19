import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Button, Card, Image, Input, Flex, CardBody, CardFooter, Heading, Text, SimpleGrid } from "@chakra-ui/react";


export default function UserProfile() {
const [users, setUsers] = useState(null);
const [getUpdate, setGetUpdate] = useState(true);
const [search, setSearch] = useState("");
const [userDetails, setUserDetails] = useState(false);
const [userDetId, setUserDetId] = useState("");
const [followingUsers, setFollowingUsers] = useState([]);

const {storedToken} = useContext(AuthContext);



function getDate(dateString) {
  var birthDate = new Date();
  var formattedDate = birthDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
  return formattedDate;
}

useEffect(() => {
  
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
        setFollowingUsers([...followingUsers, followId]);
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
    const isFollowing = followingUsers.includes(id);

    if(userDetails){
      setUserDetails(false);
      setUserDetails(false);
    }else if(!userDetails){
      setUserDetId(id);
      setUserDetails(true);
    }
    setFollowingUsers(isFollowing ? "Following" : "Follow");
  }


  return (
    <div>

      {!userDetails && 
        <div>
      

      <Input  
       my="5vh"
        width="50vw"
        type="text"
        placeholder="Search User"
        value={search}
        onChange={(e)=>{getSearch(e)}} />


      
 
      {users ? 
      
        <SimpleGrid p={5} spacing={4} minChildWidth="200px">
        {users.map((thisUser) => {
          return (

            <Card key={thisUser._id} className="User"  maxWidth='250px'  > 
            <Flex spacing='10' >  
            <Flex flex='1' gap='10' alignItems='center' flexWrap='wrap' justify="space-between" flexDirection='row'>

            
            <Link onClick={()=>{renderUserDetails(thisUser._id)}}>

          
            <CardBody display='relative' > 
            <Image borderRadius='full' objectFit='cover' fallbackSrc='https://via.placeholder.com/200' src={thisUser.profileImg} alt={thisUser.name}  />
            <Heading size="sm" p={5}> User name: {thisUser.name}</Heading>
    
            
            <Text> Birthday : {getDate(thisUser.birthdate)} </Text>
            <Text> Location: {thisUser.location}</Text>
            </CardBody>
            </Link>
            </Flex>
            </Flex>
            <CardFooter>  
            <Button onClick={() => {addFollow(thisUser._id)}} flex='1'  >{followingUsers.includes(thisUser._id) ? "Following" : "Follow"}</Button>
            </CardFooter>
            
            </Card>
          );
        })}
        </SimpleGrid> 
        
       
      

       : 
        <p> Loading user information...</p>
      }
    </div>
      }

     
    
      
    </div>
    
);
}
