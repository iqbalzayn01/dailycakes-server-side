const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");

const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");

router.get(
  "/products",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  index
);

router.get(
  "/products/:id",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  find
);

router.post("/products", authenticateUser, authorizeRoles("karyawan"), create);

router.put(
  "/products/:id",
  authenticateUser,
  authorizeRoles("karyawan"),
  update
);

router.delete(
  "/products/:id",
  authenticateUser,
  authorizeRoles("karyawan"),
  destroy
);

module.exports = router;
