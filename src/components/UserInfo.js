import { Box, Button, Heading, Image, Text, WrapItem } from "@chakra-ui/react";
import { MdBuild } from "react-icons/md";
import { DeleteIcon } from '@chakra-ui/icons'

function UserInfo(props){

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    
    return(
        <>
            <Heading as='h4' size='md'>
                {props.name}'s profile
            </Heading>

            <Image
                my={7}
                boxSize={{base: "220px", md: "250px", xl:"150px"}}
                borderRadius='50%'
                objectFit='cover'
                src={props.image}
                alt="couldn`t load image"
            />


            <Box my={2} as='b' fontSize="15px" display="flex" flexDirection="row">
                <Box mx={1} display="flex" flexDirection="column">
                    <Text>{props.postsLength}</Text>
                    <Text>Posts:</Text>
                </Box>
                <Box mx={1} display="flex" flexDirection="column">
                    <Text>{props.followersLength}</Text>
                    <Text>Follows:</Text>
                </Box>
                <Box mx={1} display="flex" flexDirection="column">
                    <Text>{props.travelguideLength}</Text>
                    <Text>Guides:</Text>
                </Box>
            </Box>
            
            <Text my={2} fontSize='sm' as='em'>
                {props.location}
            </Text>

            <Text my={2} as='em'>
                Age: {getAge(props.birthdate)}
            </Text>

            <Text my={2} as='b'>
               {props.email}
            </Text>

            <WrapItem my={3} >
                <Button leftIcon={<MdBuild />} onClick={()=>{props.profileUpdate()}} colorScheme='yellow' size={{base:"sm", lg:"xs"}}>update my profile</Button>
                <Button leftIcon={<DeleteIcon />} onClick={()=>{props.deleteProfile()}} colorScheme='red' size={{base:"sm", lg:"xs"}}>delete my profile</Button>
            </WrapItem>

            
            <WrapItem display="flex" flexDirection="column" alignItems="center" my={3}>
                <Button my={3} onClick={props.postCreate} colorScheme='teal' size={{base:"lg", lg:"xs"}}>create new post</Button>
                <Button my={3} onClick={props.travelguideCreate} colorScheme='teal' size={{base:"lg", lg:"xs"}}>create new travelguide</Button>
            </WrapItem>
        </>
    )

}

export default UserInfo;