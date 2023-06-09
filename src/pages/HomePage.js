import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading,  Image, SimpleGrid, Text, Tag, Menu, MenuButton, MenuList, Input } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { PacmanLoader } from "react-spinners";
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";
import "../index.css";
import { ThemeContext } from "../context/theme.context";


function HomePage() {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(true);
  const [query, setQuery] = useState("");
  const [comment, setComment] = useState("");
  
  const {storedToken, user} = useContext(AuthContext);
  const { bodyTheme, boxTheme, boxColor} =useContext(ThemeContext);

  const filteredPosts = useMemo(() => {
    return posts.filter( post => {
      return post.tags.join(" ").toLowerCase().includes(query.toLowerCase())
    })
  }, [posts, query])

  useEffect(() => {
    axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/posts`,
      { headers: {Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
      setPosts(response.data);
    })
    .catch((err) => console.log("error getting posts from API", err))
  
  }, [update]);

  const addLike = (id) => {

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
      .then( response => {
        refresh()
      })
      .catch( error => console.log("error adding like to post", error))
  }

  const refresh = () => {
    update ? setUpdate(false) : setUpdate(true)
  }

  const newComment = (e, id) => {
    e.preventDefault();
    
    const data = {
      post_id:id,
      text: comment
    }

    axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/posts`,
      data,
      { headers: {Authorization: `Bearer ${storedToken}`}}
    )
    .then( response => {
      setComment("")
      refresh();
    })
    .catch((err) => console.log("error getting posts from API", err))
  }

  const addLikeToComment = (id) => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/comments/${id}`,
          { headers: {Authorization: `Bearer ${storedToken}`}}
        )
        .then( response => {
          refresh()
        })
        .catch( error => console.log("error adding like to post", error))
  }

  const deleteMyComment = (id) => {

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/comments/${id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}}
      )
      .then( response => {
        refresh()
      })
      .catch( error => console.log("error adding like to post", error))

  }

  return (
    <Box minH="70vh" className={bodyTheme}>
    
    
      <Input
        bg="white"
        my={{base:"15px", lg:"5px"}}
        width="50vw"
        type="text"
        value={query}
        placeholder="Search for tags"
        onChange={(e) => {setQuery(e.target.value)}}
        
      />



      <SimpleGrid p={10} spacing={4} minChildWidth="250px">

      {posts.length > 1  ? 
        filteredPosts.map((post) => {
          return (

        <Card key={post._id} maxW='sm' bg={boxTheme} color={boxColor} >

          <CardHeader>
          <Link to={"/users/" + post.user._id}>
            <Flex spacing='4'>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' justify="space-between">
                <Avatar name={post.user.name} src={post.user.profileImg}  />

                <Box>
                  <Heading size='sm'>{post.user.name}</Heading>
                  <Text size="xs">{post.user.location}</Text>
                </Box>
              </Flex> 
            </Flex>
          </Link>
          </CardHeader>

          <CardBody textAlign='left'>
            <Text as='em' fontSize='xs'>{post.location}</Text>
            {!user &&
              <Box className="card-image" filter='auto' blur='8px'>
                <Image
                objectFit='cover'
                src={post.image}
                alt={post.name}
              />
            </Box>
            }
            {user &&
              <Box className="card-image">
                <Image
                objectFit='cover'
                src={post.image}
                alt={post.name}
              />
            </Box>
            }
            <Box py={2} overflow="scroll" h={{ base: "9vh", md: "14vh", lg: "12vh" }}>
              <Text as='samp' lineHeight="1.5" fontSize="md">
                {post.description}
              </Text>
            </Box>

            <Box display="flex" justifyContent="space-between" flexDirection="row" alignItems="center">
              <Button onClick={()=>{addLike(post._id)}} flex='1' variant='ghost' >
                ❤️ {post.likes.length}
              </Button>
              <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                        {isOpen ? 'Close' : 'Open'}
                      </MenuButton>
                      <MenuList>
                        <form  onSubmit={(e)=>{newComment(e, post._id)}}>
                          <input
                            type="text"
                            name="comment"
                            placeholder="comment this post"
                            value={comment}
                            onChange={(e)=>{setComment(e.target.value)}}
                          />
                          <button type="submit">comment</button>
                        </form>
                      </MenuList>
                    </>
                  )}
              </Menu>

            </Box>

            <Box overflow="scroll" height="20vh" >
              {post.comments && 
                  post.comments.map( comment => {
                    return(
                          <Card key={comment._id} bg={boxTheme} color={boxColor}>
                          
                          
                          <Box display="flex" direction="row"  alignItems="center">
                            <Avatar name={comment.user.name} src={comment.user.profileImg}  />

                            <CardBody>
                              <Text fontSize="sm" py='2'>
                                "{comment.text}"
                              </Text>
                            </CardBody>
                            <Box  display="flex" direction="column" justifyContent="space-between" >
                              <button onClick={()=>{addLikeToComment(comment._id)}}>❤️ {comment.likes.length}</button>
                                {user && comment.user._id === user._id &&
                              <button onClick={()=>{deleteMyComment(comment._id)}}>🗑</button>
                                }
                            </Box>  
                          </Box>
                        </Card>
                    )
                  })
              }
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
              <Text fontSize="xs"   variant='ghost' >
                {post.comments.length} comments
              </Text>
              <Text fontSize="xs"   variant='ghost'>
                <Moment fromNow>{post.createdAt}</Moment>
              </Text>
            </Box>

          </CardBody>


          <CardFooter>
          <Box overflow="scroll" display="flex" justify="flex-start" 
          >{post.tags.map( tag => {
            return (
              <Box mx="1">
                  <Tag>{tag}</Tag>
              </Box>
            )
          })}</Box>


          </CardFooter>
        </Card>
        );
      })
      : 
      <Box minH="70vh" display="flex" justifyContent="center" alignItems="center" >
      {bodyTheme === "lightBody" ?
        <PacmanLoader
          color="black"
          size={70}
        />
       :
       <PacmanLoader
          color="gray"
          size={70}
        />
      }
      </Box>
      
      }
      </SimpleGrid>

    </Box>
  );
}

export default HomePage;
