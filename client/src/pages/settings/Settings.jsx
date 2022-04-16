import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useAuth } from "../../context/Context";
import axios from "axios";

export default function Settings() {
   const { currentUser } = useAuth();

   return (
      <div className="settings">
         <div className="settingsWrapper">
            <div className="settingsTitle">
               <span className="settingsUpdateTitle">Update Your Account</span>
               <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm">
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
               <input type="text" placeholder={currentUser.username} />
               <label>Email</label>
               <input required type="email" placeholder={currentUser.email} />
               <label>Password</label>
               <input required type="password" />
            </form>
         </div>
         <Sidebar />
      </div>
   );
}
