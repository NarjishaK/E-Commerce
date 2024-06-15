const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = mongoose.Schema({
  name: { type: String ,require:true},
  email: { type: String ,require:true},
  password: { type: String,require:true },
  image: { type: String },
  tokens:{type:String,default:""}
});
adminSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    if (!this.password.startsWith("$2b$")) {
      try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next()
      } catch (err) {
        console.log(err.message, "something went wrong in password hashing");
        return next(err);
      }
    } else {
      console.log("Password is already hashed.");
      return next();
    }
  } else {
    console.log("Password is not modified.");
    return next();
  }
});
const AdminModel = mongoose.model("AdminModel", adminSchema);
module.exports = AdminModel;
