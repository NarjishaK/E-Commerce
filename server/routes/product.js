var express = require("express");
var router = express.Router();
var Controller = require("../controller/product-controller");
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


router.post("/", upload.array("productimage"), Controller.create);
router.get('/',Controller.list);
router.delete('/:id',Controller.delete)
router.get('/:id',Controller.edit)
// router.get('/:brand',Controller.brand)

module.exports = router;
