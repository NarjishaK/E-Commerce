const mongoose = require("mongoose");
const brandSchema = mongoose.Schema({
  category: { type: String, required: true },
  Bimage: { type: String, required: true },
  brand: { type: String, required: true },
});

const BrandList = mongoose.model("BrandList", brandSchema);
module.exports = BrandList;
