
function Signup(props){

    return(
        <div className="SignupPage">
      <h1>Sign Up</h1>
 
      <form onSubmit={props.handleSignupSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={props.email}
          onChange={(e)=>{props.setEmail(e.target.value)}}
        />
 
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={props.password}
          onChange={(e)=>{props.setPassword(e.target.value)}}
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

        <label>Birthdate:</label>
        <input 
          type="date"
          name="birthdate"
          value={props.birthdate}
          onChange={(e)=>{props.setBirthdate(e.target.value)}}
        />
 
        <label>Location:</label>
        <input 
          type="text"
          name="location"
          value={props.location}
          onChange={(e)=>{props.setLocation(e.target.value)}}
        />
        <button type="submit">Sign Up</button>
      </form>
 
      { props.errorMessage && <p className="error-message">{props.errorMessage}</p> }
 
      <p>Already have account?</p>
      <button onClick={props.toggleForm}>Login</button>
    </div>
    )
}

export default Signup;