import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../services/api";

function Login() {

  const { setIsLoggedIn, setLoggedUserId, setLoggedUserRole } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = { email, password };

    try {

     const { data } = await service.post("/auth/login", body); //se envia al backend para verificar si el usuario existe y la contraseña es correcta

     const token = data.authToken;

      localStorage.setItem("authToken", token);

      setIsLoggedIn(true);

      setLoggedUserId(data.payload._id);
      setLoggedUserRole(data.payload.role);

      navigate("/listings");

    } catch (error) {

      console.log(error);

      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }

    }
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>

    </div>
  );
}

export default Login;