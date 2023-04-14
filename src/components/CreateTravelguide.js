import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateTravelguide(props){
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [activities, setActivities] = useState("");
    const [tips, setTips] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate()

    const {user, storedToken} = useContext(AuthContext)
    const id = user._id
    const handleCreatePostSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            image: image,
            location: location,
            title: title,
            activities: activities,
            tips: tips,
            description: description,
            user: id
        }

        axios
            .post(  `${process.env.REACT_APP_API_URL}/api/travelguide`,
                    data,
                    { headers: {Authorization: `Bearer ${storedToken}`}})
            .then( response => {
                setImage("");
                setLocation("");
                setTitle("");
                setActivities("");
                setTips("");
                setDescription("");

                props.travelguideCreate();
                props.getSiteUpdate();
                
                navigate("/userprofile")
            })
            .catch(error => console.log("error creating travelguide", error))

    }


    return(
        <>
            <form onSubmit={handleCreatePostSubmit}>
                <label>Image:</label>
                    <input 
                        type="text"
                        name="image"
                        value={image}
                        onChange={(e)=>{setImage(e.target.value)}}
                    />

                <label>Location:</label>
                    <input 
                        type="text"
                        name="location"
                        value={location}
                        onChange={(e)=>{setLocation(e.target.value)}}
                    />

                <label>Title:</label>
                    <input
                        type="text" 
                        name="title"
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                    />


                <label></label>
                <textarea 
                    name="activities"
                    cols="30"
                    rows="10"
                    value={activities}
                    onChange={(e)=>{setActivities(e.target.value)}}
                ></textarea>

                <label></label>
                <textarea 
                    name="tips"
                    cols="30"
                    rows="10"
                    value={tips}
                    onChange={(e)=>{setTips(e.target.value)}}
                ></textarea>

                <label></label>
                <textarea 
                    name=""
                    cols="30"
                    rows="10"
                    value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                ></textarea>

                <button type="submit">Create new Travelguide</button>
            </form>

        </>
    )
}

export default CreateTravelguide;