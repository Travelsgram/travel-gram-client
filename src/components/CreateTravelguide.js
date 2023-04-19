import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import service from "../api/service";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Input, Textarea } from "@chakra-ui/react";


function CreateTravelguide(props){
    const [errorMessage, setErrorMessage] = useState(undefined);
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

        const uploadData = new FormData();
        uploadData.append("image", image);

        service
            .uploadImage(uploadData)
            .then( (response) => {
                const data = {
                    image: response.fileUrl,
                    location: location,
                    title: title,
                    activities: activities,
                    tips: tips,
                    description: description,
                    user: id
                }

                axios
                    .post(  
                        `${process.env.REACT_APP_API_URL}/api/travelguide`,
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
                    .catch( error => {
                        const errorDescription = error.response.data.message;
                        setErrorMessage(errorDescription);
                    })
            })
            .catch(error => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    const handleFileUpload = (e) => {
        setImage(e.target.files[0]);
    };

    return(
        <Box my={5} display="flex" flexDirection="column" alignItems="center">
            <Box minH="70vh" width="80vw" boxShadow="dark-lg" borderRadius={10} display="flex" flexDirection="column" alignItems="center" >
                <Heading my={3}>Create a new Travelguide</Heading>
                <Box width="60%" my={5} >
                    <form onSubmit={handleCreatePostSubmit}>
                        
                        <label>Image:</label>
                        <Input 
                            my={1}
                            errorBorderColor='red.300'
                            variant='filled'
                            type="file"
                            name="image"
                            onChange={(e)=>{handleFileUpload(e)}}
                        />

                        <label>Location:</label>
                        <Input 
                            my={1}
                            errorBorderColor='red.300'
                            variant='filled' 
                            type="text"
                            name="location"
                            value={location}
                            onChange={(e)=>{setLocation(e.target.value)}}
                        />

                        <label>Title:</label>
                        <Input
                            my={1}
                            errorBorderColor='red.300'
                            variant='filled' 
                            type="text" 
                            name="title"
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                        />
                            <Textarea 
                            placeholder="Explain your travel"
                            my={1}
                            errorBorderColor="rew.300"
                            name="description"
                            cols="30"
                            rows="5"
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                        />

                        <Textarea 
                            placeholder="Add your activities that you made"
                            my={1}
                            errorBorderColor="rew.300"
                            name="activities"
                            cols="30"
                            rows="5"
                            value={activities}
                            onChange={(e)=>{setActivities(e.target.value)}}
                        />

                        <Textarea 
                            placeholder="Add some tips for your friends"
                            my={1}
                            errorBorderColor="rew.300"
                            name="tips"
                            cols="30"
                            rows="5"
                            value={tips}
                            onChange={(e)=>{setTips(e.target.value)}}
                        />

                        
                        { errorMessage && <p className="error-message">{errorMessage}</p> }
                        
                        <Box type="submit" display="flex" flexDirection="column" alignItems="center" >
                            <Button my={3} type="submit" colorScheme='teal' size='sm'>
                                Create new Travelguide
                            </Button>
                    
                        </Box>
                    </form>
                    <Button my={3} colorScheme='red' size='xs' onClick={props.travelguideCreate}>
                        back to profile
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CreateTravelguide;