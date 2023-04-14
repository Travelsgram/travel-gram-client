import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";

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
      <>
        <img src={oneTravel.image} alt="img" />
        <p>Activities: {oneTravel.activities}</p>
        <p>Tips: {oneTravel.tips}</p>
        <p>Location: {oneTravel.location}</p>
        <p>Description: {oneTravel.description}</p>
      </>
    )
  };

  return (
    <>
      {oneTravel ? renderDetails() : <p>Loading details...</p>}
    </>
  );
}
export default TravelGuideDetails;