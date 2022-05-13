require("dotenv").config({ path: ".env.local" });
const express = require("express");
const app = express();

const morgan = require("morgan");
const connectDB = require("./config/database");
const cors = require("cors");
const postRouter = require("./routes/post.route");
const UserRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const uploadRouter = require("./routes/upload.route");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


connectDB();

app.use(express.static("public"));
app.use("/api/posts", postRouter);
app.use("/api/users", UserRouter);
app.use("/api/auth", authRouter);
app.use("/api/uploads", uploadRouter);
app.use((err, req, res, next) => {
   console.error(err.stack)
   res.status(500).send('Something broke!')
})
const PORT = process.env.PORT || 3000;


app.use((req, res, next)=>{

    res.status(404).send({error:"route not found"})

})

app.listen(PORT, () => {
   console.log(`listening on port ${PORT} ...`);
});

// {
//     "title": "title 1",
//     "snippet":"snippet 1",
//     "body": "body 1"
// }

// {
//     "username": "usernam 1",
//     "email":"email@test.j",
//     "password": "body 1"
// }
