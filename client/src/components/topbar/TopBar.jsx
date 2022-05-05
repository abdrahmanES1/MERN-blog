import { Link } from "react-router-dom";
import { useAuth } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
   const { currentUser, logout } = useAuth();

   return (
      <div className="top">
         <div className="topCenter">
            <ul className="topList">
               <li className="topListItem">
                  <Link className="link" to="/">
                     HOME
                  </Link>
               </li>
               <li className="topListItem">
                  <Link className="link" to="/">
                     ABOUT
                  </Link>
               </li>
               <li className="topListItem">
                  <Link className="link" to="/">
                     CONTACT
                  </Link>
               </li>
               <li className="topListItem">
                  <Link className="link" to="/write">
                     WRITE
                  </Link>
               </li>
               {currentUser && (
                  <li className="topListItem" onClick={logout}>
                     LOGOUT
                  </li>
               )}
            </ul>
         </div>
         <div className="topRight">
            {currentUser ? (
               <Link to="/settings">
                  <img
                     className="topImg"
                     src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                     alt=""
                  />
               </Link>
            ) : (
               <ul className="topList">
                  <li className="topListItem">
                     <Link className="link" to="/login">
                        LOGIN
                     </Link>
                  </li>
                  <li className="topListItem">
                     <Link className="link" to="/register">
                        REGISTER
                     </Link>
                  </li>
               </ul>
            )}
         </div>
      </div>
   );
}
