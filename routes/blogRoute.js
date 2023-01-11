const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//     callBack(null, path.join(__dirname, "../blogimages/"));
//   },
//   filename: (req, file, callBack) => {
//     callBack(null, `${Date.now() + file.originalname}`);
//   },
// });

let upload = multer();

const {

  blogSubmitController,
  blogUploadPhoto,
  getBlogById,
  getEditor,
  getBlogs,
  blogCommentsSubmitController,
  getBlogEditor,
  blogUpdateController,
  blogDeleteController
} = require("../controllers/blogController");
const isAuthorized = require("../middleware/auth");
router.get('/all',isAuthorized,getBlogs)
router.get("/editor",isAuthorized,getEditor)
router.get('/:id',isAuthorized,getBlogById)
router.post("/submit",isAuthorized, blogSubmitController);
router.post("/update-blog",isAuthorized,blogUpdateController)
router.delete('/delete',isAuthorized,blogDeleteController)
router.post("/commentsubmit",isAuthorized,blogCommentsSubmitController)
router.get("/blog-editor/:id",isAuthorized,getBlogEditor)
router.post("/uploadPhoto",isAuthorized, blogUploadPhoto);
//router.post("/uploadPhoto",isAuthorized, upload.single("file"), blogUploadPhoto);
module.exports = router;
