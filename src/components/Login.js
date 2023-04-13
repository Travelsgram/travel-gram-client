
function Login(props){


    return(
        <div className="LoginPage">
        <h1>Login</h1>
   
        <form onSubmit={props.handleLoginSubmit}>
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
   
          <button type="submit">Login</button>
        </form>
        { props.errorMessage && <p className="error-message">{props.errorMessage}</p> }
   
        <p>Don't have an account yet?</p>
        <button onClick={props.toggleForm}>Signup</button>
      </div>
    )
}

export default Login;