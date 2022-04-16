import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
   return (
      <div className="post">
         {post.imageUrl && (
            <img
               className="postImg"
               src={process.env.REACT_APP_BACKEND_URL + post.imageUrl}
               alt=""
            />
         )}
         <div className="postInfo">
            <div className="postCats"></div>
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
