import axios from "axios";
import { createContext, useEffect, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
   return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(null);

   useEffect(() => {
      if (localStorage.getItem("user")) {
         const flag = JSON.parse(localStorage.getItem("user"));
         setUser(flag);
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
               setUser(result.user);
               setToken(result.jwt);
               localStorage.setItem("user", JSON.stringify(result));
               console.log(result.user);
               console.log(result.jwt);
            }
         })
         .catch((err) => {
            console.log(err);
         });
      localStorage.setItem("user", JSON.stringify(user));
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
            setUser(result.user);
            setToken(result.jwt);

            localStorage.setItem("user", JSON.stringify(result));
            console.log(result.user);
            console.log(result.jwt);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   const logout = async () => {
      localStorage.removeItem("user");
      setUser(null);
   };
   const authHeader = () => {
      if (user && user.jwt) {
         // for Node.js Express back-end
         return { Authorization: "Bearer " + token };
      } else {
         return {};
      }
   };

   const values = {
      login,
      register,
      user,
      logout,
      authHeader,
   };

   return (
      <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
   );
};
