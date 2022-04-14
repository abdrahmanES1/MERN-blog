import axios from "axios";
const instance = axios.create({
   baseURL: "http://localhost:4000/",
});

instance
   .get("/api/posts")
   .then((res) => {
      console.log(res.data);
   })
   .catch((err) => {
      console.log(err);
   });
