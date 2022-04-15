import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
   const { postId } = useParams();
   const [post, setPost] = useState({});

   const { user } = useAuth();
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");

   useEffect(() => {
      const getPost = async () => {
         const res = await axios.get("/posts/" + postId);
         console.log(res.data);
         setPost(res.data.post);
         setTitle(res.data.post.title);
         setDesc(res.data.post.desc);
      };
      getPost();
   }, [postId]);

   const handleDelete = async () => {
      try {
         await axios.delete(`/posts/${postId}`, {
            data: { username: user.username },
         });
         window.location.replace("/");
      } catch (err) {}
   };

   const handleUpdate = async () => {
      try {
         await axios.put(`/posts/${postId}`, {
            username: user.username,
            title,
            desc,
         });
      } catch (err) {}
   };

   return (
      <div className="singlePost">
         <div className="singlePostWrapper">
            {post.imageurl && (
               <img
                  src={"http://localhost:4000" + post.imageurl}
                  alt=""
                  className="singlePostImg"
               />
            )}
            {post.author === user?.username ? (
               <input
                  type="text"
                  value={title}
                  className="singlePostTitleInput"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
               />
            ) : (
               <h1 className="singlePostTitle">
                  {title}
                  {post.author === user?.username && (
                     <div className="singlePostEdit">
                        <i
                           className="singlePostIcon far fa-edit"
                           // onClick={() => setUpdateMode(true)}
                        ></i>
                        <i
                           className="singlePostIcon far fa-trash-alt"
                           onClick={handleDelete}
                        ></i>
                     </div>
                  )}
               </h1>
            )}
            <div className="singlePostInfo">
               <span className="singlePostAuthor">
                  Author:
                  <b> {post.author}</b>
               </span>
               <span className="singlePostDate">
                  Created At :{new Date(post.createdAt).toDateString()}
               </span>
            </div>
            {post.author === user?.username ? (
               <textarea
                  className="singlePostDescInput"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
               />
            ) : (
               <p className="singlePostDesc">{desc}</p>
            )}
            {post.author === user.username && (
               <button className="singlePostButton" onClick={handleUpdate}>
                  Update
               </button>
            )}
         </div>
      </div>
   );
}
