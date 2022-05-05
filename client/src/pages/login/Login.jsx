import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/Context";
import "./login.css";

export default function Login() {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError]= useState("");
   const userRef = useRef();
   const passwordRef = useRef();
   const { login, currentUser } = useAuth();
   const history = useHistory();

   useEffect(() => {
      setIsLoading(false);
   }, [isLoading]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
      try {
         login(userRef.current.value, passwordRef.current.value);
         if (currentUser) history.push("/");
      } catch (err) {
         setError('Email or Password Invalid');
      }
   };

   return (
      <div className="login">
         <span className="loginTitle">Login</span>
         {error && <span style={{color:"red"}}>{ error}</span>}
         
         <form className="loginForm" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
               type="email"
               className="loginInput"
               placeholder="Enter your username..."
               ref={userRef}
            />
            <label>Password</label>
            <input
               type="password"
               className="loginInput"
               placeholder="Enter your Email ..."
               ref={passwordRef}
            />
            <button className="loginButton" type="submit" disabled={isLoading}>
               Login
            </button>
         </form>
         <button className="loginRegisterButton">
            <Link className="link" to="/register">
               Register
            </Link>
         </button>
      </div>
   );
}
