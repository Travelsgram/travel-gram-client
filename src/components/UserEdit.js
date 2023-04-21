import { Box, Button, Heading, Input } from "@chakra-ui/react";

function UserEdit(props){
  

  return(
    <Box my={5} display="flex" flexDirection="column" alignItems="center">
      <Box minH="70vh" width="80vw" boxShadow="dark-lg" borderRadius={10} display="flex" flexDirection="column" alignItems="center" >
        <Heading my={3}>Edit my profile</Heading>
        <Box width="60%" my={5} >
          <form onSubmit={props.handleUpdateSubmit}>
        
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

            <label>Name:</label>
            <Input 
              maxLength="13"
              my={1}
              errorBorderColor='red.300'
              variant='filled'
              type="text"
              name="name"
              value={props.name}
              onChange={(e)=>{props.setName(e.target.value)}}
            />

            <label>ProfilePicture:</label>
            <Input 
              my={1}
              errorBorderColor='red.300'
              variant='filled'
              type="file"
              name="image"
              onChange={(e)=>{props.handleFileUpload(e)}}
            />

            <label>Location:</label>
            <Input 
              type="text"
              name="location"
              value={props.location}
              onChange={(e)=>{props.setLocation(e.target.value)}}
            />
            
            { props.errorMessage && <p className="error-message">{props.errorMessage}</p> }

            <Box display="flex" flexDirection="column" alignItems="center" >
              <Button my={3} type="submit" colorScheme='teal' size='sm'>
                Update my profile
              </Button>

            </Box>

          </form>
          <Button my={3} colorScheme='red' size='xs' onClick={props.profileUpdate}>
            back to profile
          </Button>

        </Box>
      </Box>
    </Box>
  )
}

export default UserEdit;