import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../api/service";


function CreatePost(props){
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [comment, setComment] = useState("");
    const [tags, setTags] = useState("");

    const navigate = useNavigate()

    const {user, storedToken} = useContext(AuthContext)
    const id = user._id

    const handleCreatePostSubmit = (e) => {
        e.preventDefault();
        const tagsArr = tags.split(" ");
    
        const uploadData = new FormData();
        uploadData.append("image", image);
    
        service
          .uploadImage(uploadData)
          .then((response) => {
            const data = {
              image: response.fileUrl,
              location: location,
              comment: comment,
              tags: tagsArr,
              user: id,
            };
    
            axios
              .post(`${process.env.REACT_APP_API_URL}/api/posts`, data, {
                headers: { Authorization: `Bearer ${storedToken}` },
              })
              .then((response) => {
                setImage("");
                setLocation("");
                setComment("");
                setTags("");
                props.postCreate();
                props.getSiteUpdate();
                navigate("/userprofile");
              })
              .catch((error) => console.log("error creating new post", error));
          })
          .catch((err) => console.log("Error while uploading the file: ", err));
      };
    
      const handleFileUpload = (e) => {
        setImage(e.target.files[0]);
      };
    
      return (
        <>
          <form onSubmit={handleCreatePostSubmit}>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={(e) => handleFileUpload(e)}
            />
    
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
    
            <label>Comment:</label>
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
    
            <label>Add Tags:</label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
              }}
            />
    
            <button type="submit">Create new Post</button>
          </form>
        </>
      );
    }
    
    export default CreatePost;