import service from "../services/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    setIsSubmitting(true);

    const body = {
      email: email.trim(),
      name,
      password
    };

    try {

      await service.post("/auth/signup", body);

      navigate("/login");

    } catch (error) {

      console.log(error);

      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h1>Create Account</h1>

        <p className="signup-subtitle">
          Join NestMate and find your perfect flatmate.
        </p>

        <form onSubmit={handleSignup} className="signup-form">

          <div className="signup-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          {errorMessage && (
            <p className="signup-error">{errorMessage}</p>
          )}

        </form>

        <p className="signup-footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;