import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreatePost(props){
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [comment, setComment] = useState("");

    const navigate = useNavigate()

    const {user, storedToken} = useContext(AuthContext)
    const id = user._id
    const handleCreatePostSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            image: image,
            location: location,
            comment: comment,
            user: id
        }

        axios
            .post(  `${process.env.REACT_APP_API_URL}/api/posts`,
                    data,
                    { headers: {Authorization: `Bearer ${storedToken}`}})
            .then( response => {
                setImage("");
                setLocation("");
                setComment("");
                props.postCreate();
                props.getSiteUpdate();
                navigate("/userprofile")
            })
            .catch(error => console.log("error creating new post", error))

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

                <label>Comment:</label>
                    <input
                        type="text" 
                        name="comment"
                        value={comment}
                        onChange={(e)=>{setComment(e.target.value)}}
                    />

                <button type="submit">Create new Post</button>
            </form>

        </>
    )
}

export default CreatePost;