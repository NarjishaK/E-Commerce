const CategoryModel = require("../model/category-model");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res) => {
  const { product } = req.body;
  const Cimage = req.file.filename;
  try {
    const category = await CategoryModel.create({
      product: product,
      Cimage: Cimage,
    });
    if (!category) {
      return res.status(400).json({ err: "category create failed" });
    }
    res.json(category);
  } catch (err) {
    console.log(err, "category create is failed");
    return res.status(500).json({ err: "an error occured in category create" });
  }
});

exports.list = asyncHandler(async (req, res) => {
  try {
    const category = await CategoryModel.find();
    if (!category) {
      return res.status(400).json({ err: "category listing" });
    }
    res.json(category);
  } catch (err) {
    console.log(err, "category listing failed");
    return res
      .status(500)
      .json({ err: "an error occured in category listing" });
  }
});

exports.edit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(400).json({ err: "category not found" });
    }
    res.json(category);
  } catch (err) {
    console.log(err, "something went wrong in category edit");
    return res
      .status(500)
      .json({ err: "something went wrong in category edit" });
  }
});

exports.update = asyncHandler(async (req, res) => {
  const { product } = req.body;
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(400).json({ err: "category not found" });
    }
    category.product = product;
    if (req.file) {
      category.Cimage = req.file.filename;
    }
    const updatecatogory = await category.save();
    res.json(updatecatogory);
  } catch (err) {
    console.log(err, "something went wrong in category update");
    return res
      .status(500)
      .json({ err: "something went wrong in category update" });
  }
});

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(400).json({ err: "category not found" });
    } else {
      await category.deleteOne();
      res.json({ message: "deleted successfull" });
    }
  } catch (err) {
    console.log(err, " category delete failed");
    return res
      .status(500)
      .json({ err: "something went wrong in category delete" });
  }
});
