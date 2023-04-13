import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
 
function Navbar() {
  
  const { 
    isLoggedIn,
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

      <Link to="/users"> 
      <button> User List </button>
      </Link>

      {!isLoggedIn && 
      <>
        <Link to="/register"> 
        <button> SignUp / Login</button>
        </Link>
      </>
      }
      
      {isLoggedIn &&
      <>
        <button onClick={logOutUser}>Logout</button>
        
      </>
        
      }
      
 
      <Link to="/userprofile"> 
      <span>{user && user.name}</span>
      </Link>
 

    </nav>
  );
}
 
export default Navbar;