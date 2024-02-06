const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");

router.get("/users", index);

router.get("/users/:id", find);

router.post("/users", create);

router.put("/users/:id", update);

router.delete("/users/:id", destroy);

module.exports = router;
