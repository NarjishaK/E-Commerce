const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017/Electronics";

function connectDB() {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database connectede successfull");
      console.log("http://localhost:8080");
    })
    .catch((err) => {
      console.log(err,"error occured in database connection");
    });
}
module.exports = connectDB;
