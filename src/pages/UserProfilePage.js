import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

import CreatePost from "../components/CreatePost";
import UserProfileEdit from "./UserProfileEdit";
import UserInfo from "../components/UserInfo";
import CreateTravelguide from "../components/CreateTravelguide";
import { Grid, GridItem, Box, Button, Card, CardBody, CardFooter, Image, Text, Avatar, Tag, SimpleGrid, Heading } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';

function UserProfilePage(){
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [curUser, setCurUser] = useState(null);
    const [updateForm, setUpdateForm] = useState(false);
    const [profileInfo, setProfileInfo] = useState(true);
    const [createPostForm, setCreatePostForm] = useState(false);
    const [createTravelguideForm, setTravelguideForm] = useState(false)
    const [getUpdate, setGetUpdate] = useState(true);
    const [showPosts, setShowPosts] = useState(true)
    
    const { storedToken, user, logOutUser } = useContext(AuthContext);
    

    useEffect( () => {
      user &&
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
        .then( response => {
            setCurUser(response.data)
        })
        .catch( error => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
      })
    }, [getUpdate])

    const deleteProfile = () => {
      user &&
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
        .then( response => {
          logOutUser()
        })
        .catch( error => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
      })

    }
    const profileUpdate = () => {
      if(updateForm){
        setUpdateForm(false)
        setProfileInfo(true)
      }else{
        setUpdateForm(true)
        setProfileInfo(false)
      }
    }
    const postCreate = () => {
      if(createPostForm){
        setCreatePostForm(false)
        setProfileInfo(true)
      }else{
        setCreatePostForm(true)
        setProfileInfo(false)
      }
    }
    const deletePost = (id) => {

      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
          { headers: {Authorization: `Bearer ${storedToken}`}}
          )
          .then( response => {
            getSiteUpdate()
          })
          .catch( error => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })
    }
    const travelguideCreate = () => {
      if(createTravelguideForm){
        setTravelguideForm(false)
        setProfileInfo(true)
      }else{
        setTravelguideForm(true)
        setProfileInfo(false)
      }
    }
    const deleteTravelguide = (id) => {

      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/api/travelguide/${id}`,
          { headers: {Authorization: `Bearer ${storedToken}`}}
        )
        .then( response => {
          getSiteUpdate()
        })
        .catch( error => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
      })
    }
    const getSiteUpdate = () => {
      getUpdate ? setGetUpdate(false) : setGetUpdate(true)
    }
   
    const infoRender = () => {
      if(!updateForm){
        if(profileInfo){
          const {name, profileImg, location, birthdate, email} = curUser;
          const postsLength = curUser.posts.length
          const travelguideLength = curUser.travelguides.length
          const followersLength = curUser.followers.length
          return(
                  <>
                    <UserInfo 
                      deleteProfile={deleteProfile}
                      profileUpdate={profileUpdate}
                      name={name}
                      image={profileImg}
                      location={location} 
                      birthdate={birthdate}
                      email={email}
                      postsLength={postsLength}
                      travelguideLength={travelguideLength}
                      followersLength={followersLength}
                      postCreate={postCreate}
                      travelguideCreate={travelguideCreate}
                    />
                    
                  </>
          )
        } 
    }}
    const unfollowUser = (id) => {

      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/users/follow/${id}`,
          { headers: {Authorization: `Bearer ${storedToken}`}}
        )
        .then( response => {
          getSiteUpdate();
        })
        .catch( error => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
      })
    }
    const renderPosts = () => {
      setShowPosts(true)
    }
    const renderTravelguides = () => {
      setShowPosts(false)
    }


    return(
      <> {profileInfo &&

        <Grid templateColumns="repeat(6, 1fr)" >

          <GridItem
            as="aside"
            colSpan={{base: 6,  xl: 1}}
            minHeight="80vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            my={{base:"15px", lg:"3px"}}
          >

          {curUser && infoRender()}

          </GridItem>

          <GridItem
            as="main"
            colSpan={{base: 6, xl: 4}}
            minHeight="80vh"
            width="100%"
          >
          
            <Box display="flex" flexDirection="row" justifyContent="space-between" >
                <Button onClick={renderPosts}>Posts</Button>
                <Button onClick={renderTravelguides}>Travelguides</Button>
            </Box>

          {showPosts && 
            <Box boxShadow="lg" minHeight="80vh" my={5}>
            <SimpleGrid spacing={2} columns={[2, null, 3]}>
              {curUser &&
                
                  curUser.posts.map(post => {
                    return(
                      <Card key={post._id} maxW='xs' >
                        <CardBody textAlign='left'>
                          <Box display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
                            <Text as='em' fontSize='xs'>{post.location}</Text>
                            <button onClick={()=>{deletePost(post._id)}}>🗑</button>
                          </Box>
                          
                          <Box className="card-image">
                            <Image
                              objectFit='cover'
                              src={post.image}
                              alt="postIMG"
                            />
                          </Box>
                          <Box py={2} overflow="scroll" h={{ base: "7vh", md: "14vh", lg: "12vh" }}>
                            <Text as='samp' lineHeight="1.5" fontSize="md">
                              {post.description}
                            </Text>
                          </Box>

                          <Box display="flex" justifyContent="space-between" flexDirection="row" alignItems="center">
                            <Text flex='1' variant='ghost' >
                              ❤️ {post.likes.length}
                            </Text>

                            </Box>

                          <Box overflow="scroll" height="20vh" >
                            {post.comments && 
                                post.comments.map( comment => {
                                  return(
                                    <Card
                                      key={comment._id}
                                    >
                          
                          
                                      <Box display="flex" direction="row"  alignItems="center">
                                        <Avatar name={comment.user.name} src={comment.user.profileImg}  />

                                        <CardBody>
                                          <Text fontSize="sm" py='2'>
                                            "{comment.text}"
                                          </Text>
                                        </CardBody>
                                        <Box  display="flex" direction="column" justifyContent="space-between" >
                                          <Text>
                                            ❤️ {comment.likes.length}
                                          </Text>
                                        </Box>  
                                      </Box>
                                    </Card>
                                  )
                                })
                            }
                          </Box>

                          <Text fontSize="xs"  flex='1' variant='ghost' >
                              {post.comments.length} comments
                          </Text >
                        </CardBody>


                        <CardFooter>
                          <Box overflow="scroll" display="flex" justify="flex-start" 
                            >{post.tags.map( tag => {
                              return (
                                <Box mx="1">
                                  <Tag>#{tag}</Tag>
                                </Box>
                              )
                            })}
                          </Box>
                        </CardFooter>
                    </Card>
                 
                  )
                })
              
              } 
              </SimpleGrid>
              </Box>
          }
           

      
        
        
        

          {!showPosts && 
            <Box boxShadow="lg" minHeight="80vh" my={5}>
            <SimpleGrid spacing={2} columns={[2, null, 3]}>
              {curUser && 
       
                curUser.travelguides.map(travelguide => {
                  return(
                    <Box boxShadow="base" display="flex" flexDirection="column"
                    justifyContent="center" alignItems="center" key={travelguide._id}>

                    <Image
                      boxSize='200px'
                      objectFit='cover'
                      src={travelguide.image}
                      alt="img"
                      borderRadius="12px"
                    />

                    <Text as="b" >
                      {travelguide.title}
                    </Text>

                    <Text fontSize='xs' as="em">
                      {travelguide.location}
                    </Text>
                    
              
                    <Button
                      leftIcon={<DeleteIcon />} 
                      onClick={()=>{deleteTravelguide(travelguide._id)}}
                      colorScheme='red' 
                      size={{base:"lg", lg:"xs"}}>delete
                    </Button>

              
            
                    </Box>
           
          )
        })
        }
        </SimpleGrid>
        </Box>
          }


          </GridItem>

          <GridItem
            as="aside"
            colSpan={{base: 6, xl: 1}}
            minHeight="40vh"
            maxH="90vh"
            display="flex"
            flexDirection={{base:"row", xl:"column"}}
            alignItems="center"
            overflow="scroll"

          >
            
            {curUser && 
              
                
                curUser.followers.map(follower => {
                  return(
                    <Box   borderRadius="10px" my={2} boxShadow='base' key={follower._id} display="flex" flexDirection="column" alignItems="center" >
                      <Image
                        borderRadius='full'
                        boxSize='70px'
                        src={follower.profileImg}
                        alt={follower.name}
                      />

                      <Text as='b'>
                        {follower.name}
                      </Text>
                      <Text fontSize='xs' as='em'>
                        {follower.location}
                      </Text>

                      <Box my={2} fontSize="10px" display="flex" flexDirection="row">
                        <Box mx={1} display="flex" flexDirection="column">
                            <Text>{follower.posts.length}</Text>
                            <Text>Posts:</Text>
                        </Box>
                        <Box mx={1} display="flex" flexDirection="column">
                            <Text>{follower.followers.length}</Text>
                            <Text>Follows:</Text>
                        </Box>
                        <Box mx={1} display="flex" flexDirection="column">
                            <Text>{follower.travelguides.length}</Text>
                            <Text>Guides:</Text>
                        </Box>
                      </Box>
                     
                     <Box boxShadow='lg'>
                      <button  as="kbd" onClick={()=>{unfollowUser(follower._id)}}>Unfollow</button>
                     </Box>
                    </Box>
                   
                  )
                })
              
            }

          </GridItem>

          
        </Grid>
      }


        


        {updateForm && <UserProfileEdit  profileUpdate={profileUpdate} curUser={curUser} getSiteUpdate={getSiteUpdate}  />}

        {createPostForm && <CreatePost postCreate={postCreate} getSiteUpdate={getSiteUpdate} />}

        {createTravelguideForm && <CreateTravelguide travelguideCreate={travelguideCreate} getSiteUpdate={getSiteUpdate} />}
      </>
    )
}

export default UserProfilePage;