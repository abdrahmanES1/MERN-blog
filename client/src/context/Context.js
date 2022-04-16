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
         setCurrentUser(flag);
      }
   }, []);

   const login = async (email, password) => {
      axios
         .post("http://localhost:4000/api/auth/login", {
            email,
            password,
         })
         .then((res) => {
            const result = res.data;
            if (result.jwt) {
               setCurrentUser(result.user);
               setToken(result.jwt);
               localStorage.setItem("user", JSON.stringify(result.user));
            }
         })
         .catch((err) => {
            console.log(err);
         });
      localStorage.setItem("user", JSON.stringify(currentUser));
   };
   const register = async (username, email, password) => {
      axios
         .post("http://localhost:4000/api/auth/register", {
            username,
            email,
            password,
         })
         .then((res) => {
            const result = res.data;
            setCurrentUser(result.user);
            setToken(result.jwt);

            localStorage.setItem("user", JSON.stringify(result.user));
         })
         .catch((err) => {
            console.log(err);
         });
   };
   const logout = async () => {
      localStorage.removeItem("user");
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
