import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/listings">Listings</Link>

      {isLoggedIn ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/favourites">Favourites</Link>
          <Link to="/inbox">Inbox</Link>
          <Link to="/listings/create">Create Listing</Link>
          <button onClick={logOutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;