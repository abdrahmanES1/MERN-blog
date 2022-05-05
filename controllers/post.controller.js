const Post = require("../models/post.model");
const fs = require('fs');
function getPosts(req, res) {
   Post.find()
      .then((posts) => {
         res.status(200).send({ success: true, count: posts.length, posts });
      })
      .catch((err) => {
         res.status(403).send({ success: false, error: err });
      });
}

function getPost(req, res) {
   const id = req.params.id;

   Post.findById(id)
      .then((result) => {
         if (result) res.send({ success: true, post: result });
         else
            res.status(406).send({
               success: false,
               error: `Post not found with id of ${req.params.id}`,
            });
      })
      .catch((err) => res.status(400).send({ success: false, error: err }));
}

function postPost(req, res) {
   const { author, title, snippet, body, imageUrl } = req.body;
   console.log(req.body);
   if (!title || !snippet || !body || !author || !imageUrl) {
      res.status(403).send(
         JSON.stringify({ success: false, error: "parameter is missed" })
      );
   } else {
      const newPost = new Post({
         author,
         title,
         snippet,
         body,
         imageUrl,
      });

      newPost
         .save()
         .then((result) => {
            res.send({ success: true, post: result });
         })
         .catch((err) => res.status(403).send({ success: false, error: err }));
   }
}

function updatedPost(req, res) {
   const id = req.params.id;
   const { title, body } = req.body;

   if (!title || !body) {
      res.status(403).send(
         JSON.stringify({ success: false, error: "parameter is missed" })
      );
   }

   Post.findByIdAndUpdate(id, { title, body })
      .then((result) => {
         res.send({ success: true, post: result });
      })
      .catch((err) => res.status(400).send({ success: false, error: err }));
}

function deletePost(req, res) {
   const id = req.params.id;

   Post.findByIdAndDelete(id)
      .then((result) => {
         if (result) {
            const imageUrl = result.imageUrl;

            fs.rm('public/' + imageUrl, (err) =>{
               if(err) return console.log(err)
               console.log("file deleted")
            })
            res.send({ success: true, post: result })
         }
         else{
            res.status(406).send({
               success: false,
               error: `Post not found with id of ${req.params.id}`,
            });}
      })
      .catch((err) => {
         res.status(403).send({ success: false, error: err });
      });
}

module.exports = {
   getPosts,
   getPost,
   postPost,
   deletePost,
   updatedPost,
};


// fs.rm("public/uploads/1650063327441-444121265.png", (err) => {
//    if (err) return console.log(err)
//    console.log("file deleted")
// })