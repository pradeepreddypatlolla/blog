const express = require("express");
const router = express.Router();
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
  getEditor,
  getBlogs,
  blogCommentsSubmitController,
} = require("../controllers/blogController");
const isAuthorized = require("../middleware/auth");
router.get('/all',isAuthorized,getBlogs)
router.get("/editor",isAuthorized,getEditor)
router.get('/:id',isAuthorized,getBlogById)
router.post("/submit",isAuthorized, blogSubmitController);
router.post("/commentsubmit",isAuthorized,blogCommentsSubmitController)
router.post("/uploadPhoto",isAuthorized, upload.single("file"), blogUploadPhoto);
module.exports = router;
