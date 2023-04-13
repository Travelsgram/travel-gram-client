import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context";
import axios from "axios";

 function TravelGuideDetails () {
  const [oneTravel, setOneTravel] = useState([]);
  const { travelguideId } = useParams();
  const { storedToken } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/travelguide/${travelguideId}`, { headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        if (response.data) {
            console.log(response);
          setOneTravel(response.data);
          console.log(response.data);
          console.log(response.data.activities);
          console.log(oneTravel.activities);
        } else {
          console.log("No travel guide data found.");
        }
      })
      .catch((err) => console.log("Error getting travel guide from API", err));
  }, [travelguideId]); 

  const renderDetails = () => {
    if (!oneTravel) {
      return <p>Loading details...</p>;
    }

    return (
      <>
        <p>Activities: {oneTravel.activities}</p>
        <p>Tips: {oneTravel.tips}</p>
        <p>Location: {oneTravel.location}</p>
        <p>Description: {oneTravel.description}</p>
      </>
    );
  };

  return (
    <>
      {renderDetails()}
    </>
  );
}
export default TravelGuideDetails;