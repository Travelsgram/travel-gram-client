import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";


export default function TravelGuidePage() {
    const [travelguide, setTravelGuide] = useState([]);
    
    const {storedToken} = useContext(AuthContext);
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/travelguide`,
          { headers: {Authorization: `Bearer ${storedToken}`}})
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
                <h2>{travel.title} </h2>
                  <img src={travel.image} alt={travel.image.name} />
                  
                  <Link to={`/travelguide/${travel._id}`} >
                  <button>More details</button>
                   </Link>
              
                </div>
              );
            })
          ) : (
            <p> Loading posts...</p>
          
          )}

          
            
            
        </div>
      );
    }






