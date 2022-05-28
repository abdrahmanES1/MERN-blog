import axios from "axios";
import { createContext, useEffect, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
   return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);
   const [token, setToken] = useState(null);
   const [AuthError, setAuthError] = useState(null);

   useEffect(() => {
      if (localStorage.getItem("user") && localStorage.getItem("jwt")) {
         const flag = JSON.parse(localStorage.getItem("user"));
         const flagToken = JSON.parse(localStorage.getItem("jwt"));
         setCurrentUser(flag);
         setToken(flagToken)
      }
   }, []);

   const login = async (email, password) => {
      setAuthError(null);
      // try {
      //    axios
      //       .post(process.env.REACT_APP_BACKEND_URL + "api/auth/login", {
      //          email,
      //          password,
      //       }).catch(r=>{
      //          console.log(r)
      //       })
      // } catch (error) {
      //    console.log("login _________")
      //            console.log(error);
      //           console.log("login _________")
      // }
      
         axios
            .post(process.env.REACT_APP_BACKEND_URL + "api/auth/login", {
               email,
               password,
            })
            .then((res) => {
               const {jwt, user} = res.data;
               if (user && jwt) {
                  setCurrentUser(user);
                  setToken(jwt);
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("jwt", JSON.stringify(jwt));
               }
            })
            .catch(d => {
               console.log("login _________")
                console.log(d);
               console.log("login _________")
               return setAuthError(d);
            });
      
      
      // typeof callback === 'function' && callback();
   };
   
   const register = async (username, email, password) => {
      setAuthError(null);
      axios.post(process.env.REACT_APP_BACKEND_URL +"api/auth/register", {
            username,
            email,
            password
         })
         .then((res) => {
            const { jwt, user } = res.data;
            if (user && jwt) {
               setCurrentUser(user);
               setToken(jwt);
               localStorage.setItem("user", JSON.stringify(user));
               localStorage.setItem("jwt", JSON.stringify(jwt));
            }
         })
         .catch(error => {
            console.log(error);
            return setAuthError(error);
         });
      // typeof callback === 'function' && callback();
   };
   const logout = async () => {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      setCurrentUser(null);
      setToken(null);
      setAuthError(null);
   };
   const authHeader = () => {
      if (currentUser && token) {
         // for Node.js Express back-end
         return  "Bearer " + token ;
      } else {
         return {};
      }
   };

   const values = {
      login,
      register,
      currentUser,
      logout,token,
      authHeader,
      AuthError
   };

   return (
      <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
   );
};
