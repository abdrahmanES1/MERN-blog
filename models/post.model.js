const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      snippet: {
         type: String,
         required: true,
      },
      body: {
         type: String,
         required: true,
      },
      imageurl: {
         type: String,
         required: false,
      },
   },
   { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
