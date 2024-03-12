const express = require("express");
const router = express();
const { create, getUploadedImages } = require("./controller");
const upload = require("../../middlewares/multer");

router.post("/images", upload.single("product_image"), create);
router.get("/images/uploads/:imageName", getUploadedImages);

module.exports = router;
