require("dotenv").config({ path: ".env.local" });
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./config/database");

const postRouter = require("./routes/post.route");
const UserRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

app.use(morgan("dev"));
app.use(express.json());

connectDB();
app.use(express.static("public"));
app.use("/api/posts", postRouter);
app.use("/api/users", UserRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

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
