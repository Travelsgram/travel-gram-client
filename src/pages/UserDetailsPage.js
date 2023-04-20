import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useParams } from "react-router-dom";
import { Avatar, Box, Button, Card, CardBody, CardFooter, Heading, Image, SimpleGrid, Tag, Text } from "@chakra-ui/react";



function UserDetailsPage() {
    const [curUser, setCurUser] = useState(null);
    const [showPosts, setShowPosts] = useState(true)

    const {storedToken} = useContext(AuthContext);

    const {id} = useParams();

    useEffect( () => {
        axios
        .get(
            `${process.env.REACT_APP_API_URL}/api/users/${id}`,
            { headers: {Authorization: `Bearer ${storedToken}`}}
            )
        .then( response => {
            setCurUser(response.data)
        })
        .catch((err) => console.log("error getting user from API", err))
    },[])

    const renderPosts = () => {
        setShowPosts(true)
      }
      const renderTravelguides = () => {
        setShowPosts(false)
      }

      const getNewUser = (id) => {
        axios
        .get(
            `${process.env.REACT_APP_API_URL}/api/users/${id}`,
            { headers: {Authorization: `Bearer ${storedToken}`}}
            )
        .then( response => {
            setCurUser(response.data)
        })
        .catch((err) => console.log("error getting user from API", err))
      }

    return(
        <>
       
            {curUser &&
            <Box display="flex" flexDirection="column" alignItems="center">

                <Box my={4} width="80vw" display="flex" flexDirection="column" justifyContent="center" boxShadow="dark-lg" p={10}>

                    <Box display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center">

                    <Image  boxSize={{base:"60px", lg:"180px"}} borderRadius="50%" src={curUser.profileImg} alt='user IMG' />
                    <Box width={{base:"60px", lg:"180px"}}  my={2} as='b' fontSize={{base:"7px", lg:"lg"}} display="flex" flexDirection="row">
                            <Box mx={1} display="flex" flexDirection="column">
                                <Text>{curUser.posts.length}</Text>
                                <Text>Posts:</Text>
                            </Box>
                            <Box mx={1} display="flex" flexDirection="column">
                                <Text>{curUser.followers.length}</Text>
                                <Text>Follows:</Text>
                                </Box>
                            <Box mx={1} display="flex" flexDirection="column">
                                <Text>{curUser.travelguides.length}</Text>
                                <Text>Guides:</Text>
                            </Box>
                        </Box>

                    </Box>

                    <Box display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center">
                        <Box width={{base:"60px", lg:"180px"}} >
                            <Heading size={{base: "xs", lg:"xl"}} >{curUser.name}</Heading>
                        </Box>
                        
                        <Box width={{base:"60px", lg:"180px"}} >
                        <Text fontSize={{base:"8px", lg:"xl"}}>
                            {curUser.location}
                        </Text>
                        </Box>
                    </Box>
                </Box>
                
                    
                <Box minHeight="80vh" display="flex" flexDirection="column" alignItems="center">

                    <Box display="flex" flexDirection="row" width="80vw" justifyContent="space-between" >
                        <Button onClick={renderPosts}>Posts</Button>
                        <Button onClick={renderTravelguides}>Travelguides</Button>
                    </Box>


                    {showPosts && 
                        
                        <Box boxShadow="lg" width="80vw" minHeight="80vh" my={5}>
                        <SimpleGrid my={3} spacing={2} minChildWidth="250px">
                            {curUser && 

                                curUser.posts.map(post => {
                                    return(
                                        <Card key={post._id} maxW='xs' >
                                            <CardBody textAlign='left'>
                                                <Box display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
                                                    <Text as='em' fontSize='xs'>{post.location}</Text>
                                                    
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
                                                            <Card key={comment._id}>
                          
                          
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
                        <Box boxShadow="lg" width="80vw" minHeight="80vh" my={5}>
                        <SimpleGrid spacing={2} minChildWidth="250px">
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

                                            <Link to={"/travelguide/" + travelguide._id}>
                                                <Button
                                                    colorScheme='teal' 
                                                    size={{base:"lg", lg:"xs"}}>see Details
                                                </Button>
                                            </Link>
                                           
                                        </Box>
                                    )
                                })
                            }
                        </SimpleGrid>
                        </Box>
                    }
                </Box>

                {curUser && 
                    <Box display="flex" flexDirection="row" width="80vw" overflow="scroll">
                    {curUser.followers.map(follower => {
                        return(
                            <Box mx={2}  borderRadius="10px" my={2} boxShadow='base' key={follower._id} display="flex" flexDirection="column" alignItems="center" onClick={()=>{getNewUser(follower._id)}} >
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
                     

                            </Box> 
                        )
                    })}
                    </Box>
                }
                    
                
                </Box>
               
            }
        
        </>
    )
}

export default UserDetailsPage;