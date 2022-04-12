require("dotenv").config({ path: "../.env.local" });
const mongoose = require("mongoose");

const connectDB = async () => {
   const conn = await mongoose.connect(
      process.env.MONGOO_DB_URL,
      {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      },
      (err) => {
         if (err) console.log(err);
         else console.log(`MongoDB Connected ... `);
      }
   );
};

module.exports = connectDB;
