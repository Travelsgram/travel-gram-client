import { useState, useEffect } from "react";
import axios from "axios";


export default function TravelGuidePage() {
    const [travelguide, setTravelGuide] = useState([]);

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/travelguide`)
          .then((response) => {
            setTravelGuide(response.data);
            console.log(response.data);
          })
          .catch((err) => console.log("error getting travelguide from API", err));
      }, []);
    
      return (
        <div>
          <h1>Travel Guide</h1>
    
          {travelguide ? (
            travelguide.map((travel) => {
              return (
                <div key={travel._id} className="Travel">
                <h2>Title : {travel.title} </h2>
                  <img src={travel.image} alt={travel.image.name} />
               <p> Activities : {travel.activities} </p>
               <p>Tips : {travel.tips} </p>
               <p>Location : {travel.location}</p>
               <p>Description: {travel.description}</p>
              
                </div>
              );
            })
          ) : (
            <p> Loading posts...</p>
          )}
        </div>
      );
    }






