import { Box, Button, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

function Login(props){
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return(
      <Box my={5} display="flex" flexDirection="column" alignItems="center">
        <Box minH="70vh" width="80vw" boxShadow="dark-lg" borderRadius={10} display="flex" flexDirection="column" alignItems="center" >
          <Heading my={3}>Login</Heading>
          
          <Box width="60%" my={5} >
            <form onSubmit={props.handleLoginSubmit}>
            
              <label>Email:</label>
              <Input 
                my={1}
                errorBorderColor='red.300'
                variant='filled'
                type="email"
                name="email"
                value={props.email}
                onChange={(e)=>{props.setEmail(e.target.value)}}
              />
   
              <label>Password:</label>
              <InputGroup size='md'>
                <Input
                  my={1}
                  errorBorderColor='red.300'
                  variant='filled'
                  type={show ? 'text' : 'password'}
                  name="password"
                  value={props.password}
                  onChange={(e)=>{props.setPassword(e.target.value)}}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            
      
              { props.errorMessage && <p className="error-message">{props.errorMessage}</p> }

              <Box type="submit" display="flex" flexDirection="column" alignItems="center" >
                <Button my={3} type="submit" colorScheme='teal' size='sm'>
                  Login
                </Button>
              </Box>

            </form>

            <Button my={3} colorScheme='red' size='xs' onClick={props.toggleForm}>
                  to Signup
            </Button>
   
          </Box>
        </Box>
      </Box>
    )
}

export default Login;