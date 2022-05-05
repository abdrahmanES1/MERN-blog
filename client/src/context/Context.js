import axios from "axios";
import { createContext, useEffect, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
   return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);
   const [token, setToken] = useState(null);

   useEffect(() => {
      if (localStorage.getItem("user")) {
         const flag = JSON.parse(localStorage.getItem("user"));
         const flagToken = JSON.parse(localStorage.getItem("jwt"));
         setCurrentUser(flag);
         setToken(flagToken)
      }
   }, []);

   const login = async (email, password) => {
      axios
         .post(process.env.REACT_APP_BACKEND_URL + "api/auth/login", {
            email,
            password,
         })
         .then((res) => {
            const result = res.data;
            if (result.jwt) {
               
               setCurrentUser(result.user);
               setToken(result.jwt);
               localStorage.setItem("user", JSON.stringify(result.user));
               localStorage.setItem("jwt", JSON.stringify(result.jwt));
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };
   
   const register = async (username, email, password) => {
      axios
         .post(process.env.REACT_APP_BACKEND_URL +"api/auth/register", {
            username,
            email,
            password,
         })
         .then((res) => {
            const result = res.data;
            console.log(result);
            setCurrentUser(result.user);
            setToken(result.jwt);

            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("jwt", JSON.stringify(result.jwt));
         })
         .catch((err) => {
            console.log(err);
         });
   };
   const logout = async () => {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      setCurrentUser(null);
   };
   const authHeader = () => {
      if (currentUser && currentUser.jwt) {
         // for Node.js Express back-end
         return { Authorization: "Bearer " + token };
      } else {
         return {};
      }
   };

   const values = {
      login,
      register,
      currentUser,
      logout,
      authHeader,
   };

   return (
      <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
   );
};
