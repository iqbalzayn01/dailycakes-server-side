const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const v1 = "/api/cms";
// Router
const categoriesRouter = require("./app/api/categories/router");
const productsRouter = require("./app/api/products/router");
const imagesRouter = require("./app/api/images/router");

// Middlewares
const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Testing
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API DailyCakes",
  });
});

// Router
app.use(v1, categoriesRouter);
app.use(v1, productsRouter);
app.use(v1, imagesRouter);

// Middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
