const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
   {
      author: { type: String, required: true },
      authorId: { type: String, required: true },
      title: { type: String, required: true },
      snippet: { type: String, required: true },
      body: { type: String, required: true },
      imageUrl: { type: String, required: true },
   },
   { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
