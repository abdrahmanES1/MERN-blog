import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
   return (
      <div className="post">
         {post.imageurl && (
            <img
               className="postImg"
               src={"http://localhost:4000" + post.imageurl}
               alt=""
            />
         )}
         <div className="postInfo">
            <div className="postCats">
               {/* {post.map((c) => (
            <span className="postCat">{c.name}</span>
          ))} */}
            </div>
            <Link to={`/post/${post._id}`} className="link">
               <span className="postTitle">{post.title}</span>
            </Link>
            <hr />
            <span className="postDate">
               {new Date(post.createdAt).toDateString()}
            </span>
         </div>
         <p className="postDesc">{post.snippet}</p>
      </div>
   );
}
