const express = require("express");
const router = express.Router();
const upload = require("../helpers/multer");

const {
  createPost,
  allposts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const requiredLogin = require("../middleware/requiredLogin");

router
  .route("/createpost")
  .post(requiredLogin, upload.single("photo"), createPost);
router.route("/").get(requiredLogin, allposts);
router.route("/:id").get(requiredLogin, getPost);
router.route("/:id").put(requiredLogin, upload.single("photo"), updatePost);
router.route("/:id").delete(requiredLogin, deletePost);

module.exports = router;
