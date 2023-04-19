import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Heading, Image, Box, Stack, Text, Button } from "@chakra-ui/react";


export default function TravelGuidePage() {
    const [travelguide, setTravelGuide] = useState([]);
    
    const {storedToken} = useContext(AuthContext);
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/travelguide`,
          { headers: {Authorization: `Bearer ${storedToken}`}})
          .then((response) => {
            setTravelGuide(response.data);
            
          })
          .catch((err) => console.log("error getting travelguide from API", err));
      }, []);
    
      return (
        <Box my={10}>
          <h1>Travel Guide</h1>

        <Box display="flex" flexDirection="column" alignItems="center" >
        
          {travelguide ? (
            travelguide.map((travel) => {
              return (
                <Card
                  my={1}
                  key={travel._id}
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='outline'
                  width="80vw"
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '80vw' }}
                    src={travel.image}
                    alt='guideIMG'
                    borderRadius="15px"
                  />

                  <Stack width="70%">
                    <CardBody>
                      <Heading size='md'>{travel.title}</Heading>

                      <Text py='2'>
                        {travel.description}
                      </Text>
                    </CardBody>

                    <CardFooter>
                    <Link to={`/travelguide/${travel._id}`} >
                      <Button variant='solid' colorScheme='blue'>
                          More details
                      </Button>
                    </Link>
                    </CardFooter>
                  </Stack>
                  <Box display="flex" flexDir="column" alignItems="center">
                  <Link to={"/users/"+travel.user._id} >
                    <Image
                      boxSize='50px'
                      objectFit='cover'
                      src={travel.user.profileImg}
                      alt='User img'
                      borderRadius="50%"
                    />
                    <Text>
                      {travel.user.name}
                    </Text>
                    <Text as="em" fontSize='xs'>
                      {travel.user.location} 
                    </Text>
                  </Link>
                  </Box>
                  
             
                </Card>


                
               
              
                
              );
            })
          ) : (
            <p> Loading posts...</p>
          
          )}  
          </Box>


          
            
            
        </Box>
      );
    }






