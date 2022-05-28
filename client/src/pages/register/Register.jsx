import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";
import { useAuth } from "../../context/Context";

export default function Register() {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const history = useHistory();
   const { currentUser, register, AuthError } = useAuth();
   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      try {
         register(username, email, password);
         if (currentUser) {
            history.push("/");
         }
      } catch (err) {
         setError("true");
      }
   };
   return (
      <div className="register">
         <span className="registerTitle">Register</span>
         
         <form className="registerForm" onSubmit={handleSubmit}>
            {/* {AuthError && <span style={{ color: "red" }}>{AuthError}</span>} */}
            <label>Username</label>
            <input
               required
               type="text"
               className="registerInput"
               placeholder="Enter your username..."
               onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
               required
               type="email"
               className="registerInput"
               placeholder="Enter your email..."
               onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
               required
               type="password"
               className="registerInput"
               placeholder="Enter your password..."
               onChange={(e) => setPassword(e.target.value)}
            />
            <button className="registerButton" type="submit">
               Register
            </button>
         </form>
         <button className="registerLoginButton">
            <Link className="link" to="/login">
               Login
            </Link>
         </button>
         {/* {error && (
            <span style={{ color: "red", marginTop: "10px" }}>
               Something went wrong!
            </span>
         )} */}
      </div>
   );
}
