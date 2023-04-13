import { Link } from "react-router-dom";
 
function Navbar() {
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
 

    </nav>
  );
}
 
export default Navbar;