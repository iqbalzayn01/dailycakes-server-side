const Users = require("../../api/users/model");
const Customers = require("../../api/customers/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const {
  createTokenUser,
  createTokenCustomer,
  createJWT,
  createRefreshJWT,
} = require("../../utils");
const { createUserRefreshToken } = require("./userRefreshToken");
const { createCustomerRefreshToken } = require("./customerRefreshToken");

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  let result, role;
  // Check for Users
  if (Users) {
    result = await Users.findOne({ email: email });
    role = result ? result.role : null;
  }

  // Check for Customers
  if (Customers && !result) {
    result = await Customers.findOne({ email: email });
    role = "customer";
  }

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  let token, refreshToken, firstname, lastname;
  if (role === "karyawan" || role === "admin") {
    token = createJWT({ payload: createTokenUser(result) });
    refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
    await createUserRefreshToken({ refreshToken, user: result._id });
  } else if (role === "customer") {
    token = createJWT({ payload: createTokenCustomer(result) });
    refreshToken = createRefreshJWT({ payload: createTokenCustomer(result) });
    await createCustomerRefreshToken({ refreshToken, customer: result._id });
    firstname = result.firstname;
    lastname = result.lastname;
  }

  return {
    token,
    refreshToken,
    firstname,
    lastname,
    email: result.email,
    role: result.role,
  };
};

module.exports = { signin };
