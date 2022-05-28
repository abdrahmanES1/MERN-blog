import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useRef } from "react";
import { useAuth } from "../../context/Context";
import axios from "axios";

export default function Settings() {
   const { currentUser, token } = useAuth();
   const [msg, setMsg] = useState(null);
   const passRef =useRef();
   const CpassRef = useRef();
   
   const handleSubmit =(e) => {
      e.preventDefault();
      setMsg(null);
      if (passRef.current.value === CpassRef.current.value && passRef.current.value !== ""){
         axios.put(process.env.REACT_APP_BACKEND_URL + "api/users/" + currentUser._id,
            { password: passRef.current.value }, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         }
         ).then(res=>{
            setMsg('pass updated');
         }).catch(err=>{
            console.log(err);
            setMsg('error while updating password');
         })
      } else if (passRef.current.value !== "" && CpassRef.current.value !== ""){
         setMsg('password is empty');
      }
      else{
         setMsg('password not match');
      }
      
   }

   return (
      <div className="settings">
         <div className="settingsWrapper">
            <div className="settingsTitle">
               <span className="settingsUpdateTitle">Update Your Account</span>
               <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
               <label>Profile Picture</label>
               <div className="settingsPP">
                  <img
                     src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                     }
                     alt=""
                  />
                  <label htmlFor="fileInput">
                     <i className="settingsPPIcon far fa-user-circle"></i>
                  </label>
                  <input
                     type="file"
                     id="fileInput"
                     style={{ display: "none" }}
                  />
               </div>
               <label>Username</label>
               <p>{currentUser.username}</p>
               <label>Email</label>
               <p>{currentUser.email}</p>

               {msg && <p style={{color:"red"}}>{msg}</p>}
               {msg && !msg && <p style={{ color: "green" }}>password updated</p>}
               <label>password</label>
               <input
                  type="password"
                  id="fileInput"
                  ref={passRef}
               />
               <label>confirm password</label>
               <input
                  type="password"
                  id="fileInput"
                  ref={CpassRef}
               />
               <button type="submit" className="settingsSubmit">submit</button>
               
               
            </form>
         </div>
         <Sidebar />
      </div>
   );
}
