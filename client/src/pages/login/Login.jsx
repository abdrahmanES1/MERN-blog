import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/Context";
import "./login.css";

export default function Login() {
   const [isLoading, setIsLoading] = useState(false);
   const userRef = useRef();
   const passwordRef = useRef();
   const { login, currentUser, AuthError } = useAuth();
   const history = useHistory();

   // useEffect(() => {
   //    setIsLoading(false);
   // }, [isLoading]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      login(userRef.current.value, passwordRef.current.value);
      if (currentUser) history.push("/");
   
      setIsLoading(false);
   };

   return (
      <div className="login">
         <span className="loginTitle">Login</span>
         <form className="loginForm" onSubmit={handleSubmit}>
            {/* {AuthError && (<span>{AuthError}</span>)} */}
            <label>Email</label>
            <input
               type="email"
               className="loginInput"
               placeholder="Enter your username..."
               ref={userRef}
               required
            />
            <label>Password</label>
            <input
               type="password"
               className="loginInput"
               placeholder="Enter your Email ..."
               ref={passwordRef}
               required
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
