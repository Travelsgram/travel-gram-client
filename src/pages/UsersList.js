import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Button, Card, Image, Input, Flex, CardBody, CardFooter, Heading, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";

function UserList() {
const [users, setUsers] = useState(null);
const [getUpdate, setGetUpdate] = useState(true);
const [curUser, setCurUser] = useState(null);
const [getCurUser, setGetCurUser] = useState(true)
const [errorMessage, setErrorMessage] = useState(undefined);

const {storedToken, user} = useContext(AuthContext);
const { bodyTheme } = useContext(ThemeContext);

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

useEffect(() => {
  
    axios
    .get(`${process.env.REACT_APP_API_URL}/api/users`,
    { headers: {Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
      setUsers(response.data);
    })
    .catch(error => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
  });
  

  }, [getUpdate]);

useEffect(() => {
  if(user){
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
      .then( response => {
        setCurUser(response.data)
        getSiteUpdate()
      })
      .catch( error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  }

},[getCurUser])

  const addFollow = (followId) => {

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/users/follow/${followId}`,
        { headers: {Authorization: `Bearer ${storedToken}`}}
        )
      .then(response =>{
        getSiteUpdate();
        updateUserData();
      })
      .catch((err) => console.log("error getting user from API", err))

  }
  const getSiteUpdate = () => {
    getUpdate ? setGetUpdate(false) : setGetUpdate(true)
  }
  const updateUserData = () => {
    getCurUser ? setGetCurUser(false) : setGetCurUser(true) 
  }

  const renderButton = (id) => {
    if(user){
      let str = "follow";
      curUser.followers.forEach( element => {
        if(id === element._id){
          str = "following"
        }
      })
      return str;
    }

  }

  return (
    <Box className={bodyTheme} minH="70vh">

      {users && curUser ?
      
        <SimpleGrid p={5} spacing={4} minChildWidth="200px">
          {users.map((thisUser) => {
            return (

              <Card key={thisUser._id} className="User"  maxWidth='250px'  > 
                <Flex spacing='10' >  
                  <Flex flex='1' gap='10' alignItems='center' flexWrap='wrap' justify="space-between" flexDirection='column'>
                    <Link to={"/users/" + thisUser._id}>
                    <CardBody> 
                      <Image borderRadius='50%' boxSize={{base: "250px", md: "250px", xl:"150px"}} objectFit='cover' src={thisUser.profileImg} alt={thisUser.name}  />
                      <Heading size="sm" p={5}>{thisUser.name}</Heading>
                      
                      <Text>{getAge(thisUser.birthdate)} </Text>
                      <Text>{thisUser.location}</Text>
                    </CardBody>
                    </Link>
                  </Flex>
                </Flex>
                <CardFooter>  
                
                  <Button onClick={() => {addFollow(thisUser._id)}} flex='1' >{curUser && renderButton(thisUser._id)}</Button>
                </CardFooter>
            
              </Card>
            );
          })}
        </SimpleGrid> 
        
       
      

       : 

       <Box minH="70vh" display="flex" justifyContent="center" alignItems="center" >
       {bodyTheme === "lightBody" ?
        <PacmanLoader
          color="black"
          size={60}
        />
       :
       <PacmanLoader
          color="yellow"
          size={60}
        />
      }
      </Box>
      }
     </Box>
    
);
}

export default UserList;
