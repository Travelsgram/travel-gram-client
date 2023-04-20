import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Heading, Image, Box, Stack, Text, Button } from "@chakra-ui/react";
import { PacmanLoader } from "react-spinners";
import { ThemeContext } from "../context/theme.context";


export default function TravelGuidePage() {
    const [travelguide, setTravelGuide] = useState(null);
    
    const {storedToken} = useContext(AuthContext);
    const { bodyTheme } = useContext(ThemeContext)

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
        <Box className={bodyTheme}>
        <Heading py={4}>Travel Guide </Heading>
        

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
                    <CardBody m={15}>
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

                  <Link to={"/users/"+travel.user._id} >
                  <Box display="flex" flexDir="column" alignItems="center" m={5}>
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
                  </Box>
                  </Link>
                  
             
                </Card>


                
               
              
                
              );
            })
          ) : 
          <Box minH="70vh" display="flex" justifyContent="center" alignItems="center" >
            <PacmanLoader
              color="#f9e700"
              size={60}
            />
          </Box>
          }  
          </Box>


          
            
            
        </Box>
      );
    }






