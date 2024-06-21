var express = require('express');
var router = express.Router();
var Controller = require('../controller/category-controller')
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });


router.post('/',upload.single('Cimage'),Controller.create)
router.get('/',Controller.list)
router.get('/:id',Controller.edit)
router.put('/:id',upload.single('Cimage'),Controller.update)
router.delete('/:id',Controller.delete)
module.exports = router;