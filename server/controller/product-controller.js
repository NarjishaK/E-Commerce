const ProductList = require("../model/product-model");
const asyncHandler = require("express-async-handler");
const Image = require("../model/images"); // Add this line

exports.create = asyncHandler(async (req, res) => {
  const {
    brand,
    category,
    color,
    price,
    offerday,
    offerpercentage,
    details,
    available,
    delivery,
  } = req.body;
  const files = req.files;
  const productimage = files.map((file) => file.filename);
  // const files = req.files;
  // const productimage = await Promise.all(files.map(async (file) => {
  //   const image = new Image({
  //     variant: 'default', 
  //     links: [file.filename]
  //   });
  //   await image.save();
  //   return image._id;
  // }));

  try {
    const products = await ProductList.create({
      brand: brand,
      category: category,
      productimage: productimage,
      price: price,
      offerpercentage: offerpercentage,
      color: color,
      offerday: offerday,
      details: details,
      available: available,
      delivery: delivery,
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

exports.list = asyncHandler(async (req, res) => {
  try {
    const product = await ProductList.find();
    if (!product) {
      console.log("failed product list");
      return res.status(400).json({ message: "product listing failed" });
    }
    res.json(product);
  } catch (err) {
    console.log(err, "an error occured in product list");
    return res
      .status(500)
      .json({ err: "serverside  error in product listing" });
  }
});

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductList.findById(id);
    if (!product) {
      return res.status(400).json({ message: "product not found" });
    } else {
      await product.deleteOne();
      res.json({ message: "delete product successfull" });
    }
  } catch (err) {
    console.log(err, "an error occured in product delete");
    return res.status(500).json({ err: "serverside  error in product delet" });
  }
});

exports.edit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductList.findById(id);
    if (!product) {
      return res.status(400).json({ message: "not found" });
    }
    res.json(product);
  } catch (err) {
    console.log(err, "an error occured in editing");
    return res.status(500).json({ err: "an error occured in edit product" });
  }
});
// exports.brand =asyncHandler(async(req,res)=>{
//   const {brand} =req.params;
//   try{
//   const product = await ProductList.find({brand:brand})
//     if(!product){
//       return res.status(400).json({message:'not found'})
//     }
//     res.json(product)
//   }catch(err){console.log(err,"error occured");}
// })
