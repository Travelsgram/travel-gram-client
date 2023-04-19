import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading,  Image, SimpleGrid, Text, Tag, Menu, MenuButton, MenuList, MenuItem, Input } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";


function HomePage() {
  const [posts, setPosts] = useState(null);
  const [copyPosts, setCopyPosts] = useState(null)
  const [update, setUpdate] = useState(true);
  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");
  
  const {storedToken, user} = useContext(AuthContext)
  useEffect(() => {
  
    /*axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/posts?search=${search}`,
      { headers: {Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
      setPosts(response.data);
    
    })
    .catch((err) => console.log("error getting posts from API", err)) */
  
    axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/posts`,
      { headers: {Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
      setPosts(response.data);
      setCopyPosts(response.data)
      
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

  const newSearch = (e) => {
    setSearch(e.target.value);
    const copy =[...copyPosts]
    search 
    ?
    setPosts(copy.filter( post => post.tags.join(" ").includes(search)))
    :
    
    refresh()
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
    <div>
    

      <Input
        my="2vh"
        width="80vw"
        type="text"
        value={search}
        placeholder="Search for tags"
        onChange={(e)=>{newSearch(e)}}
        
      />



      <SimpleGrid p={10} spacing={4} minChildWidth="250px">

      {posts ? 
        posts.map((post) => {
          return (

        <Card key={post._id} maxW='sm'>

          <CardHeader>
            <Flex spacing='4'>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' justify="space-between">
                <Avatar name={post.user.name} src={post.user.profileImg}  />

                <Box>
                  <Heading size='sm'>{post.user.name}</Heading>
                  <Text size="xs">{post.user.location}</Text>
                </Box>
              </Flex> 
            </Flex>
          </CardHeader>

          <CardBody textAlign='left'>
            <Text as='em' fontSize='xs'>{post.location}</Text>
            <Box className="card-image">
            <Image
              objectFit='cover'
              src={post.image}
              alt={post.name}
            />
            </Box>
            <Box py={2} overflow="scroll" h={{ base: "7vh", md: "14vh", lg: "12vh" }}>
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
                          <Card key={comment._id}>
                          
                          
                          <Box display="flex" direction="row"  alignItems="center">
                            <Avatar name={comment.user.name} src={comment.user.profileImg}  />

                            <CardBody>
                              <Text fontSize="sm" py='2'>
                                "{comment.text}"
                              </Text>
                            </CardBody>
                            <Box  display="flex" direction="column" justifyContent="space-between" >
                              <button onClick={()=>{addLikeToComment(comment._id)}}>❤️ {comment.likes.length}</button>
                                {comment.user.name === user.name &&
                              <button onClick={()=>{deleteMyComment(comment._id)}}>🗑</button>
                                }
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
          })}</Box>


          </CardFooter>
        </Card>
        );
      })
      : 
        <p> Loading posts...</p>
      }
      </SimpleGrid>

    </div>
  );
}

export default HomePage;
