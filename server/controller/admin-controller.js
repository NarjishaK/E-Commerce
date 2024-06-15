var Adminmodel = require("../model/admin-model");
var asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  const image = req.file.filename;
  try {
    const admins = await Adminmodel.findOne({ email });
    if (admins) {
      return res
        .status(400)
        .json({ invalid: true, message: "email is already exist" });
    }
    const admin = await Adminmodel.create({
      email: email,
      password: password,
      name: name,
      image: image,
    });
    if (admin) {
      res.send("Success");
    } else {
      res.send("Failed");
    }
  } catch (err) {
    console.error(err, "Admin create is failed");
    return res
      .status(500)
      .json({ err: "an error occured in admin registration" });
  }
});

exports.signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Adminmodel.findOne({ email: email });
  if (!admin) {
    return res
      .status(400)
      .json({ invalid: true, message: "Invalid email or password" });
  }
  const isPasswordIsMatch = await bcrypt.compare(password, admin.password);
  if (admin && isPasswordIsMatch) {
    const adminDetails = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      image: admin.image,
    };
    const token = jwt.sign({ email: admin.email }, "myjwtsecretkey");
    admin.tokens = token;
    admin.save();
    res.status(200).json({ token: token, adminDetails: adminDetails });
  } else {
    console.error(err, "something went wrong in signIn");
    return res
      .status(400)
      .json({ invalid: true, message: "Invalid email or password" });
  }
});

exports.edit=asyncHandler(async(req,res)=>{
  const {id} =req.params
  try{
    const admin = await Adminmodel.findById(id);
    if(!admin){
      return res.status(400).json({message:"admin not found"})
    }else{
      res.json(admin)
    }
  }catch(err){
    console.log(err,"something went wrong");
    return res.status(500).json({err:"an error occured"})
  }
});


exports.update =asyncHandler(async(req,res)=>{
  const{name,email}=req.body;
  const{id}=req.params;
  try{
    const admin = await Adminmodel.findById(id)
    if(!admin){
      return res.status(400).json({message:"admin not found for update"})
    }
    admin.email =email;
    admin.name=name;
    if(req.file){
      admin.image =req.file.filename
    }
    const adminUpdate =await admin.save()
    res.json(adminUpdate)

  }catch(err){
    console.log(err);
    return res.status(500).json({err:"an error occured"})
  }
})