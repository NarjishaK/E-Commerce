const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  product: { type: String ,required:true},
  Cimage: { type: String },
});
const CategoryModel = mongoose.model('CategoryModel',categorySchema)
module.exports =CategoryModel;