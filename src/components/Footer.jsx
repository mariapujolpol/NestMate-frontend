import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="footer-icon">N</div>
          <span className="footer-text">nestmate</span>
        </div>

        <p className="footer-copy">© 2026 nestmate. All rights reserved.</p>

        <div className="footer-links">
  <Link to="/AboutPage" className="footer-pill">About</Link>
  <Link to="/ContactPage" className="footer-pill">Contact</Link>
</div>
      </div>
    </footer>
  );
}

export default Footer;
