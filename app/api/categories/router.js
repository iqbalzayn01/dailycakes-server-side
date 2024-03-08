const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");

const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");

router.get(
  "/categories",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  index
);

router.get(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  find
);

router.post(
  "/categories",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  create
);

router.put(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  update
);

router.delete(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("karyawan", "admin"),
  destroy
);

module.exports = router;
