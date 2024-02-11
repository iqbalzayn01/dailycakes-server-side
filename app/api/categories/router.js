const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");

const {
  authenticateUser,
  //   authorizeRoles,
} = require("../../middlewares/auth");

router.get("/categories", authenticateUser, index);

router.get("/categories/:id", find);

router.post("/categories", create);

router.put("/categories/:id", update);

router.delete("/categories/:id", destroy);

module.exports = router;
