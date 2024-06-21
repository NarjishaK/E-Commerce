var express = require("express");
var router = express.Router();
var Controller = require("../controller/admin-controller");
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


router.post("/", upload.single("image"), Controller.create);
router.post("/signin",Controller.signin);
router.get('/:id',Controller.edit)
router.put("/:id",upload.single('image'),Controller.update)
router.get('/',Controller.list)
router.delete("/:id",Controller.delete)
router.post('/unlockPassword/:id',Controller.unlockPassword)

module.exports = router;
