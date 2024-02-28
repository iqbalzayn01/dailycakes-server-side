const express = require("express");
const router = express();
const {
  signup,
  signin,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
  index,
  find,
  update,
  destroy,
} = require("./controller");

router.get("/customers", index);

router.get("/customers/:id", find);

router.post("/customers", signup);

router.put("/customers/:id", update);

router.delete("/customers/:id", destroy);

module.exports = router;
