import axios from "axios";
const instance = axios.create({
   baseURL: "https://api.example.com",
});
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";