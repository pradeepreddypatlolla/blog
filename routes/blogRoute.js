const express = require("express");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "../blogimages/"));
  },
  filename: (req, file, callBack) => {
    callBack(null, `${Date.now() + file.originalname}`);
  },
});

let upload = multer({ storage: storage });

const {
  blogSubmitController,
  blogUploadPhoto,
  getBlogById,
} = require("../controllers/blogController");

const router = express.Router();

router.get('/:id',getBlogById)
router.post("/submit", blogSubmitController);
router.post("/uploadPhoto", upload.single("file"), blogUploadPhoto);
module.exports = router;
