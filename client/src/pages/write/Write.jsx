import { useState } from "react";
import "./write.css";
import axios from "axios";
import { useAuth } from "../../context/Context";
import { useHistory } from "react-router-dom";
export default function Write() {
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [file, setFile] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const { currentUser, authHeader } = useAuth();

   const history = useHistory();
   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         const data = new FormData();
         data.append("image", file);

         const config = {
            header: {
               "Content-Type": "multipart/form-data",
            },
         };

         const image = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "api/uploads",
            data,
            config
         );
         const imageUrl = await image.data.imageUrl;
         console.log();
         const newPost = {
            author:currentUser.username,
            authorId: currentUser._id,
            title,
            body: desc,
            snippet: desc.slice(0, 20),
            imageUrl,
         };

         const post = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "api/posts",
            newPost
         );
         const postInfo = await post.data;
         console.log(postInfo);
         if (postInfo) {
            setTimeout(() => {
               history.push(`post/${postInfo.post._id}`);
            }, 1000);
         }
      } catch (err) {
         console.log(err);
      }
      setIsLoading(false);
   };

   return (
      <div className="write">
         {file && (
            <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
         )}
         <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
               <label htmlFor="fileInput">
                  <i className="writeIcon fas fa-plus"></i>
               </label>
               <input
                  required
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}/>
               <input
                  required
                  type="text"
                  placeholder="Title"
                  className="writeInput"
                  autoFocus={true}
                  onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="writeFormGroup">
               <textarea
                  required
                  placeholder="Tell your story..."
                  type="text"
                  className="writeInput writeText"
                  onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
            <button className="writeSubmit" type="submit" disabled={isLoading}>
               Publish
            </button>
         </form>
      </div>
   );
}
