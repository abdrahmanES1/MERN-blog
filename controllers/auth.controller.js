const { generateAccessToken } = require("../config/auth.generator");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

async function register(req, res) {
   const { username, email, password } = req.body;
   if (!username || !email || !password) {
      return res.send({ message: "parameter are missed" });
   }

   const userExist = await User.findOne({ email: email });

   if (userExist) {
      return res.send({ message: "email already exist" });
   }

   let newUser = new User({ username, email, password });
   const salt = await bcrypt.genSalt(10);
   newUser.password = await bcrypt.hash(newUser.password, salt);
  
   newUser.save().then(user => {
      let id = user._id.toString();
      const token = generateAccessToken(username, email, password);
      res.send({ jwt: token, user: { username, email, _id: id} });
   }).catch(err => {
      res.status(401).send({ error: err.toString() });
   })
}

async function login(req, res) {
    const { password, email } = req.body;
   if (!email || !password) {
      return res.send({ message: "parameter are missed" });
   }
   const userExist = await User.findOne({ email: email });
   if (userExist) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, userExist.password);
      if (validPassword) {
         const token = generateAccessToken(userExist.username, email, password);

         res.send({
            jwt: token,
            user: { username: userExist.username, email, _id: userExist._id.toString() },
         });
      } else {
         res.status(400).send({ error: "Invalid Password" });
      }
   } else {
      res.status(401).send({ error: "User does not exist" });
   }
}

module.exports = { register, login };
