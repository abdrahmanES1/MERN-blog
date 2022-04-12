const Post = require("../models/post.model");

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
   const { title, snippet, body } = req.body;

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
   if (!req.body.title || !req.body.snippet || !req.body.body) {
      res.status(403).send(
         JSON.stringify({ success: false, error: "parameter is missed" })
      );
   } else {
      const { title, snippet, body } = req.body;
      const newPost = new Post({
         title,
         snippet,
         body,
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
   const { title, snippet, body } = req.body;

   if (!title || !snippet || !body) {
      res.status(403).send(
         JSON.stringify({ success: false, error: "parameter is missed" })
      );
   }

   Post.findByIdAndUpdate(id, { title, snippet, body })
      .then((result) => {
         res.send({ success: true, post: result });
      })
      .catch((err) => res.status(400).send({ success: false, error: err }));
}

function deletePost(req, res) {
   const id = req.params.id;

   Post.findByIdAndDelete(id)
      .then((result) => {
         if (result) res.send({ success: true, post: result });
         else
            res.status(406).send({
               success: false,
               error: `Post not found with id of ${req.params.id}`,
            });
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
