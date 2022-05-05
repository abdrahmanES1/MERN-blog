import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
   const { postId } = useParams();
   const [post, setPost] = useState({});

   const { currentUser } = useAuth();
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");

   useEffect(() => {
      const getPost = async () => {
         const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "api/posts/" + postId
         );
         setPost(res.data.post);
         setTitle(res.data.post.title);
         setDesc(res.data.post.body);
      };
      getPost();
   }, [postId]);

   const handleDelete = async () => {
      try {
         await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}api/posts/${postId}`
         );
         window.location.replace("/");
      } catch (err) {}
   };

   const handleUpdate = async () => {
      try {
         await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}api/posts/${postId}`,
            {
               title,
               body: desc,
            }
         );
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="singlePost">
         <div className="singlePostWrapper">
            {post.imageUrl && (
               <img
                  src={process.env.REACT_APP_BACKEND_URL + post.imageUrl}
                  alt=""
                  className="singlePostImg"
               />
            )}
            {post.authorId === currentUser?._id ? (
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
                  {post.authorId === currentUser?._id && (
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
            {post.authorId === currentUser?._id ? (
               <textarea
                  className="singlePostDescInput"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
               />
            ) : (
               <p className="singlePostDesc">{desc}</p>
            )}
            {post.authorId === currentUser?._id && (
               <button className="singlePostButton" onClick={handleUpdate}>
                  Update
               </button>
            )}
            {post.authorId === currentUser?._id && (
               <button
                  className="singlePostButton"
                  style={{ backgoundColor: "red" }}
                  onClick={handleDelete}
               >
                  Delete
               </button>
            )}
         </div>
      </div>
   );
}
