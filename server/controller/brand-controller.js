const BrandList = require("../model/brand-model");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res) => {
  const { brand, category } = req.body;
  const Bimage = req.file.filename;
  try {
    const brands = await BrandList.create({
      brand: brand,
      category: category,
      Bimage: Bimage,
    });
    if (!brands) {
      return res.status(400).json({ err: "brand create failed" });
    }
    res.json(brands);
  } catch (err) {
    console.log(err, "brand create is failed");
    return res.status(500).json({ err: "an error occured in brand create" });
  }
});

exports.list = asyncHandler(async (req, res) => {
  try {
    const brands = await BrandList.find();
    if (!brands) {
      return res.status(400).json({ err: "brand listing" });
    }
    res.json(brands);
  } catch (err) {
    console.log(err, "brand listing failed");
    return res.status(500).json({ err: "an error occured in brand listing" });
  }
});

exports.edit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const brands = await BrandList.findById(id);
    if (!brands) {
      return res.status(400).json({ err: "brand not found" });
    }
    res.json(brands);
  } catch (err) {
    console.log(err, "something went wrong in brand edit");
    return res.status(500).json({ err: "something went wrong in brand edit" });
  }
});

exports.update = asyncHandler(async (req, res) => {
  const { brand, category } = req.body;
  const { id } = req.params;
  try {
    const brands = await BrandList.findById(id);
    if (!brands) {
      return res.status(400).json({ err: "brand not found" });
    }
    brands.brand = brand;
    brands.category = category;
    if (req.file) {
      brands.Bimage = req.file.filename;
    }
    const updatebrand = await brands.save();
    res.json(updatebrand);
  } catch (err) {
    console.log(err, "something went wrong in brand update");
    return res
      .status(500)
      .json({ err: "something went wrong in brand update" });
  }
});

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const brands = await BrandList.findById(id);
    if (!brands) {
      return res.status(400).json({ err: "brand not found" });
    } else {
      await brands.deleteOne();
      res.json({ message: "deleted successfull" });
    }
  } catch (err) {
    console.log(err, " brand delete failed");
    return res
      .status(500)
      .json({ err: "something went wrong in brand delete" });
  }
});
