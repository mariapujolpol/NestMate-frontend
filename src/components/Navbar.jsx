import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../css/Navbar.css";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">N</span>
          <span className="logo-text">nestmate</span>
        </Link>

        {/* CENTER LINKS */}
        <div className="navbar-links">
          <Link to="/listings">Browse all listings</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-auth">

          {isLoggedIn ? (
            <>
              <Link to="/favorites">Favorites</Link>
              <Link to="/conversations">Inbox</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/listings/create" className="primary-btn">
                Create Listing
              </Link>
              <button onClick={logOutUser} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/register" className="primary-btn">
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;