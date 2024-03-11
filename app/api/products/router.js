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

router.post(
  "/products",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  create
);

router.put(
  "/products/:id",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  update
);

router.delete(
  "/products/:id",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  destroy
);

module.exports = router;
