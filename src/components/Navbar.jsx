import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import "../css/Navbar.css";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logOutUser();
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LEFT SIDE */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <span className="logo-icon">N</span>
            <span className="logo-text">nestmate</span>
          </Link>

          <div className="navbar-main desktop-only">
            <Link to="/listings" className="nav-pill" onClick={closeMenu}>
              Browse listings
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE DESKTOP */}
        <div className="navbar-right desktop-only">
          {isLoggedIn ? (
            <>
              <Link to="/favorites" className="nav-pill" onClick={closeMenu}>
                Favorites
              </Link>
              <Link to="/conversations" className="nav-pill" onClick={closeMenu}>
                Inbox
              </Link>
              <Link to="/profile" className="nav-pill" onClick={closeMenu}>
                Profile
              </Link>
              <button type="button" onClick={handleLogout} className="nav-pill logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-pill" onClick={closeMenu}>
                Log In
              </Link>
              <Link to="/register" className="primary-btn" onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <Link to="/listings" className="mobile-link" onClick={closeMenu}>
            Browse listings
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/favorites" className="mobile-link" onClick={closeMenu}>
                Favorites
              </Link>
              <Link to="/conversations" className="mobile-link" onClick={closeMenu}>
                Inbox
              </Link>
              <Link to="/profile" className="mobile-link" onClick={closeMenu}>
                Profile
              </Link>
              <button type="button" onClick={handleLogout} className="mobile-link mobile-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={closeMenu}>
                Log In
              </Link>
              <Link to="/register" className="mobile-link mobile-primary" onClick={closeMenu}>
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