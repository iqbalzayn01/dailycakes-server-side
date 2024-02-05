const express = require("express");
const router = express();
const { create } = require("./controller");
const upload = require("../../middlewares/multer");

router.post("/images", upload.single("product_image"), create);
module.exports = router;
