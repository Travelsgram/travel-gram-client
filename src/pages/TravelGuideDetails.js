import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Box, Image, Text, Divider, Stack, Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendarCheck, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

 function TravelGuideDetails () {
  const [oneTravel, setOneTravel] = useState(null);
  const { travelguideId } = useParams();
  const { storedToken } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/travelguide/${travelguideId}`,
        { headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {  
          setOneTravel(response.data);
      })
      .catch((err) => console.log("Error getting travel guide from API", err));
  }, [travelguideId]); 

  const renderDetails = () => {

    return (
      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      my={10}
    
    >
<Divider />
     <Heading my={5}>{oneTravel.title} Details </Heading>
     <Divider />
      <Image
        src={oneTravel.image}
        alt="Travel image"
        borderRadius="md"
        objectFit="cover"
      />
      <Stack
        p="4"
        spacing="3"
        textAlign="center"
        width="100%"
        alignItems="center"
      >

        <Stack direction="row" alignItems="center">
        <Text fontSize="lg">
          {oneTravel.description}
        </Text>
        </Stack>
        
        <Stack direction="row" alignItems="center">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <Text fontSize="lg"> Location : {oneTravel.location}
          </Text>
        </Stack>

       <Stack direction="row" alignItems="center"> 
        <FontAwesomeIcon icon={faCalendarCheck} />
        <Text fontSize="lg">
          Activities: {oneTravel.activities}
        </Text>
        </Stack>
       

         <Stack direction="row" alignItems="center">
         <FontAwesomeIcon icon={faBell} />
         <Text fontSize="lg" >
          Tips: {oneTravel.tips}
        </Text>
      
         </Stack>
        
      </Stack>
    </Box>
    )
  };

  return (
    <>
      {oneTravel ? renderDetails() : <p>Loading details...</p>}
    </>
  );
  
}
export default TravelGuideDetails;