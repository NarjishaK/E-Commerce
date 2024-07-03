
const ProductList = require("../model/product-model");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res) => {
  const { brand, category,color,price,offerday,offerpercentage,details,available,delivery } = req.body;
  const productimage = req.file.filename;
  try {
    const products = await ProductList.create({
      brand: brand,
      category: category,
      productimage: productimage,
      price:price,
      offerpercentage:offerpercentage,
      color:color,
      offerday:offerday,
      details:details,
      available:available,
      delivery:delivery
    });
    if (!products) {
      return res.status(400).json({ err: "Product create failed" });
    }
    res.json(products);
  } catch (err) {
    console.log(err, "Product create is failed");
    return res.status(500).json({ err: "an error occured in Product create" });
  }
});