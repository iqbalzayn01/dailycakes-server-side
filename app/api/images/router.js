const express = require("express");
const router = express();
const { create, index, getUploadedImages } = require("./controller");
const upload = require("../../middlewares/multer");

router.post("/images", upload.single("product_image"), create);
router.get("/images", index);
router.get("/images/uploads/:imageName", getUploadedImages);

module.exports = router;
