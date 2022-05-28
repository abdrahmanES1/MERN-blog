import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import {useAuth} from '../../context/Context'
export default function Home() {
   const [posts, setPosts] = useState([]);
  


   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const res = await axios(process.env.REACT_APP_BACKEND_URL + "api/posts");

            setPosts(res.data.posts);
         } catch (error) {
            console.log(error);
         }
      };
      fetchPosts();
   }, []);
   return (
      <>
         <Header />
         <div className="home">
            <Posts posts={posts} />
            <Sidebar />
         </div>
      </>
   );
}
