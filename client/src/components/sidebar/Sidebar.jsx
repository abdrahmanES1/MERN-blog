import "./sidebar.css";

export default function Sidebar() {
   return (
      <div className="sidebar">
         <div className="sidebarItem">
            <span className="sidebarTitle"> MORE ABOUT ME</span>
            <img
               className="sidebarImage"
               src="https://images.unsplash.com/photo-1572985025310-cc8cafbbf394?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964"
               alt=""
            />
            
         </div>
         <div className="sidebarItem">
            <a href="abderrahman-es.netlify.app" className="sidebarTitle">FOLLOW US (Personal Website) </a>
                       <div className="sidebarSocial">
               <i className="sidebarIcon fab fa-twitter-square"></i>
               <a href="https://www.linkedin.com/in/abderrahman-essebyity/">
                  <i className="sidebarIcon fab fa-linkedin"></i>
               </a>
            </div>
         </div>
      </div>
   );
}
