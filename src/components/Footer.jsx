import { Link } from "react-router-dom";
import "../Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-logo">
          <span className="footer-icon">N</span>
          <span className="footer-text">NestMate</span>
        </div>

        {/* RIGHT */}
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} NestMate. All rights reserved.
      </p>

    </footer>
  );
}

export default Footer;