const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
module.exports = {
   generateAccessToken(username, email, password) {
      return jwt.sign({ username, email, password }, process.env.TOKEN_SECRET, {
         expiresIn: "1800s",
      });
   },
};
