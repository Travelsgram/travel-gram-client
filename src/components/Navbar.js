import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
 
function Navbar() {
  
  const { 
    user,                 
    logOutUser         
  } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/travelguide"> 
      <button> Travel Guide</button>
      </Link>
      
      <Link to="/register"> 
      <button> SignUp / Login</button>
      </Link>

      <button onClick={logOutUser}>Logout</button>
      <span>{user && user.name}</span>
 

    </nav>
  );
}
 
export default Navbar;