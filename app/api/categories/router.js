const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
  authorizeRolesCustomer,
} = require("../../middlewares/auth");

router.get(
  "/categories",
  authenticateUser,
  // authorizeRoles("karyawan", "admin"),
  // authorizeRolesCustomer("customer"),
  index
);

router.get(
  "/categories/:id",
  authenticateUser,
  // authorizeRoles("karyawan", "admin"),
  // authorizeRolesCustomer("customer"),
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
