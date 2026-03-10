import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/api";
import "../css/Login.css";
import { Link } from "react-router-dom";

function Login() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const body = {
      email: email.trim(),
      password,
    };

    try {
      const { data } = await service.post("/auth/login", body);

      storeToken(data.authToken);
      await authenticateUser();

      navigate("/profile");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else if (error.response?.status === 401) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <p className="login-subtitle">
          Access your nestmate account and continue your search.
        </p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {errorMessage && <p className="login-error">{errorMessage}</p>}
        </form>

        <p className="login-footer-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;