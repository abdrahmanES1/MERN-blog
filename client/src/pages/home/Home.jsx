import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";

export default function Home() {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const res = await axios("/posts");
            // const data = data.data;

            // setPosts(data);
            console.log(res.data.posts);
            setPosts(res.data.posts);
         } catch (error) {
            console.log(error);
         }
      };
      fetchPosts();
      console.log(posts);
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
