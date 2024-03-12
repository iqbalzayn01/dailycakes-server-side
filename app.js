const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "http://localhost:5173"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const v1 = "/api";
// Router
const categoriesRouter = require("./app/api/categories/router");
const productsRouter = require("./app/api/products/router");
const imagesRouter = require("./app/api/images/router");
const usersRouter = require("./app/api/users/router");
const authCMSRouter = require("./app/api/auth/router");
const customersRouter = require("./app/api/customers/router");
const userRefreshTokenRouter = require("./app/api/userRefreshToken/router");
const customerRefreshTokenRouter = require("./app/api/customerRefreshToken/router");

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
app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, productsRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, usersRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, customersRouter);
app.use(`${v1}/cms`, userRefreshTokenRouter);
app.use(`${v1}/cms`, customerRefreshTokenRouter);

// Middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
