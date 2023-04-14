
function UserEdit(props){


    return(
        <>
    <form onSubmit={props.handleUpdateSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={props.email}
          onChange={(e)=>{props.setEmail(e.target.value)}}
        />
  
        <label>Name:</label>
        <input 
          type="text"
          name="name"
          value={props.name}
          onChange={(e)=>{props.setName(e.target.value)}}
        />

        <label>ProfilePicture:</label>
        <input 
          type="text"
          name="profileImg"
          value={props.profileImg}
          onChange={(e)=>{props.setProfileImg(e.target.value)}}
        />
 
        <label>Location:</label>
        <input 
          type="text"
          name="location"
          value={props.location}
          onChange={(e)=>{props.setLocation(e.target.value)}}
        />
        <button type="submit">Edit Profile</button>
      </form>

        </>
    )
}

export default UserEdit;