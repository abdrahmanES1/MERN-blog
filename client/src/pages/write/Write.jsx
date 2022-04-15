import { useState, useRef } from "react";
import "./write.css";
import axios from "axios";
import { useAuth } from "../../context/Context";

export default function Write() {
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [file, setFile] = useState(null);
   const { user, authHeader } = useAuth();

   const onFileChange = (event) => {
      // Update the state

      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      const newPost = {
         author: user.username,
         title,
         body: desc,
         snippet: desc.slice(0, 20),
         // imagurl,
      };
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("image", file);
      newPost.photo = filename;
      console.log(file);

      const config = {
         header: {
            "Content-Type": "multipart/form-data",
         },
      };
      axios
         .post("http://localhost:4000/api/uploads", data, config)
         .then((res) => console.log(res));
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
                  onChange={(e) => setFile(e.target.files[0])}
               />
               <input
                  required
                  type="text"
                  placeholder="Title"
                  className="writeInput"
                  autoFocus={true}
                  onChange={(e) => setTitle(e.target.value)}
               />
            </div>
            <div className="writeFormGroup">
               <textarea
                  required
                  placeholder="Tell your story..."
                  type="text"
                  className="writeInput writeText"
                  onChange={(e) => setDesc(e.target.value)}
               ></textarea>
            </div>
            <button className="writeSubmit" type="submit">
               Publish
            </button>
         </form>
      </div>
   );
}
