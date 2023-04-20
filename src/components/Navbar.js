import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/auth.context";
import {Flex, Button, IconButton, Image, Box} from '@chakra-ui/react'
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons'

import { Avatar } from "@chakra-ui/avatar";

import TravelsgramLogo from "../images/TravelsgramLogo.png"
import { ThemeContext } from "../context/theme.context";

 
function Navbar() {
  
  const { 
    isLoggedIn,
    user,                 
    logOutUser         
  } = useContext(AuthContext);

  const { navTheme,toggleTheme } = useContext(ThemeContext)

  const [display, changeDisplay] = useState('none');
  

 

  return (
    <Flex justify="center" alignItems="center" className={navTheme}>
     <Flex align="center">
     <Link to="/"> <Image src={TravelsgramLogo}  /> </Link>

      <Flex display={['none','none' , 'flex' , 'flex']} >


     {isLoggedIn &&
    <>  
     <Link to="/travelguide"> 
      <Button as="a" variant="ghost" arial-label="Home" my={5} w="100%"> Travel Guide</Button>
      </Link>

      <Link to="/users"> 
      <Button as="a" variant="ghost" arial-label="Home" my={5} w="100%"> User List </Button>
      </Link>
      <Box>
        <Button onClick={toggleTheme}></Button>
         
      </Box>
      </>
        }
      

      {!isLoggedIn && 
      <>
        <Link to="/register"> 
        <Button as="a" variant="ghost" arial-label="Home" my={5} w="100%" > SignUp / Login</Button>
        </Link>
        </>
      }
      
      {isLoggedIn &&
      <>
        <Button as="a" variant="ghost" arial-label="Home" my={5} w="100%" onClick={logOutUser}>Logout</Button>
        
      </>
        
      }


      
 

      </Flex>
      
      <IconButton aria-label="Open Menu"
       size="lg"
        mr={2}
         icon={<HamburgerIcon/>} 
         display={['flex', 'flex', 'none', 'none']}
          onClick={()=> changeDisplay('flex')}
         />
      
      
       <Flex spacing={3} alignItems="center" >
       {isLoggedIn &&
        <Link to="/userprofile"> 
       <Avatar src={user && user.profileImg} />
      </Link>
       }

      </Flex>
     </Flex>

       <Flex w="100vw"
       bgColor="gray.50"
       zIndex={20}
       h="100vh"
       pos="fixed"
       top="0"
       left="0"
       overflowY="auto"
       flexDir="column"
       display={display}>

       <Flex justify="flex-end">
        <IconButton
         mt={2}
         mr={2} 
         aria-label="Close Menu" 
         size="lg"
         icon={<CloseIcon/>} 
        onClick={()=> changeDisplay('none')} />
       </Flex>
         
      <Flex flexDir="column" align="center">
      <Link to="/">
        <Button as="a" variant="ghost" arial-label="Home" my={5} w="100%" onClick={() => changeDisplay('none')} >Home</Button>
      </Link>

      <Link to="/travelguide"> 
      <Button as="a" variant="ghost" arial-label="Home" my={5} w="100%" onClick={() => changeDisplay('none')} > Travel Guide</Button>
      </Link>

      <Link to="/users"> 
      <Button as="a" variant="ghost" arial-label="Home" my={5} w="100%" onClick={() => changeDisplay('none')} > User List </Button>
      </Link>

      {!isLoggedIn && 
      <>
        <Link to="/register"> 
        <Button as="a" variant="ghost" arial-label="Home" my={5} w="100%" onClick={() => changeDisplay('none')} > SignUp / Login</Button>
        </Link>
        </>
      }
      
      {isLoggedIn &&
      <>
      
        <Button as="a" variant="ghost" arial-label="Home" my={5} w="100%"  onClick={logOutUser} >Logout</Button>
        
      </>
        
      }


      
 

      </Flex>


       </Flex>

    </Flex>
  );
}
 
export default Navbar;