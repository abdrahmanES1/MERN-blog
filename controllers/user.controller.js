const User = require("../models/user.model");
const bcrypt = require("bcrypt");

function getUsers(req, res) {
   User.find()
      .sort({ createdAt: -1 })
      .then((users) => {
         res.status(200).send({ success: true, count: users.length, users });
      })
      .catch((err) => res.status(403).send({ success: false, error: err }));
}

function getUser(req, res) {
   User.findById(req.params.id)
      .then((user) => {
         if (!user) {
            res.status(401).send({
               success: false,
               error: `User not found with id of ${req.params.id}`,
            });
         } else {
            res.status(200).send({
               success: true,
               user,
            });
         }
      })
      .catch((err) => {
         res.status(401).json({
            success: false,
            error: `User not found with id of ${req.params.id}`,
         });
      });
}

async function updateUser(req, res) {
   const { password } = req.body ;
   const salt = await bcrypt.genSalt(10);
   const newPassword = await bcrypt.hash(password, salt);

   User.findById(req.params.id).then((user) => {
      if (!user) {
         res.status(401).send({
            success: false,
            error: `User not found with id of ${req.params.id}`,
         });
      } else {
         const data = { ...req.body };
         User.findByIdAndUpdate(req.params.id, { ...data, password: newPassword}, {
            new: true,
            runValidators: true,
         })
            .then((updatedUser) => {
               res.status(200).send({
                  success: true,
                  data: updatedUser,
               });
            })
            .catch((err) =>
               res.status(403).send({ success: false, error: err })
            );
      }
   });
}

module.exports = {
   getUsers,
   getUser,
   updateUser,
};
