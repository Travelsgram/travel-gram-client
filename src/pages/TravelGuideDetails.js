import { useParams } from "react-router";
import { useEffect, useState } from "react"
import axios from "axios";

export default function TravelGuideDetails () {
const [oneTravelGuide, setOneTravelGuide] = useState (null)
    const { travelguideId } = useParams();
    
console.log(travelguideId);

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/travelguide/:${travelguideId}`)
          .then((response) => {
            setOneTravelGuide(response.data);
          })
          .catch((err) => console.log("error getting beers from API", err));
      }, [travelguideId]);

const renderDetails = () => {

    return (
        <>
        <p> Activities : {oneTravelGuide.travel.activities} </p>
        <p>Tips : {oneTravelGuide.travel.tips} </p>
        <p>Location : {oneTravelGuide.travel.location}</p>
        <p>Description: {oneTravelGuide.travel.description}</p>
        </>
            )


}
return (
    <>
       {oneTravelGuide ? renderDetails() :<p>Loading details...</p> }
    </>
   )
    
}