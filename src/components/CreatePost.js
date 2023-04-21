import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../api/service";
import { Box, Button, Heading, Input } from "@chakra-ui/react";


function CreatePost(props){
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
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
              description: description,
              tags: tagsArr,
              user: id,
            };
    
            axios
              .post(`${process.env.REACT_APP_API_URL}/api/posts`,
               data, 
               { headers: { Authorization: `Bearer ${storedToken}` }})
              .then((response) => {
                setImage("");
                setLocation("");
                setDescription("");
                setTags("");
                props.postCreate();
                props.getSiteUpdate();
                navigate("/userprofile");
              })
              .catch(error => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
          })
          .catch(error => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        });
      };
    
      const handleFileUpload = (e) => {
        setImage(e.target.files[0]);
      };
    
      return (
        <Box py={5} display="flex" flexDirection="column" alignItems="center">
        <Box minH="70vh" width="80vw" boxShadow="dark-lg" borderRadius={10} display="flex" flexDirection="column" alignItems="center" >
          <Heading my={3}>Create a new Post</Heading>
          <Box width="60%" my={5} >
          <form onSubmit={handleCreatePostSubmit}>
            <label>Image:</label>
            <Input
              my={1}
              errorBorderColor='red.300'
              variant='filled'
              type="file"
              name="image"
              onChange={(e) => handleFileUpload(e)}
            />
    
            <label>Location:</label>
            <Input
              my={1}
              errorBorderColor='red.300'
              variant='filled'            
              type="text"
              name="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
    
            <label>description:</label>
            <Input
              my={1}
              errorBorderColor='red.300'
              variant='filled'
              type="text"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
    
            <label>Add Tags:</label>
            <Input
              my={1}
              errorBorderColor='red.300'
              variant='filled'
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
              }}
            />

            { errorMessage && <p className="error-message">{errorMessage}</p> }

            <Box display="flex" flexDirection="column" alignItems="center" >
              <Button my={3} type="submit" colorScheme='teal' size='sm'>
                Create new Post
              </Button>

              
            </Box>
          </form>
          <Button my={3} colorScheme='red' size='xs' onClick={props.postCreate}>
                back to profile
          </Button>
          </Box>
        </Box>
        </Box>
      );
    }
    
    export default CreatePost;