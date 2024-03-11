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

  // Users
  if (Users) {
    const result = await Users.findOne({ email: email });

    if (!result) {
      throw new UnauthorizedError("Invalid Credentials");
    }
    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Invalid Credentials");
    }

    // Token
    const token = createJWT({ payload: createTokenUser(result) });

    const refreshToken = createRefreshJWT({
      payload: createTokenUser(result),
    });
    await createUserRefreshToken({
      refreshToken,
      user: result._id,
    });

    return {
      token,
      refreshToken,
      role: result.role,
      email: result.email,
    };
  }

  // Customers
  if (Customers) {
    const result = await Customers.findOne({ email: email });

    if (!result) {
      throw new UnauthorizedError("Invalid Credentials");
    }
    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Invalid Credentials");
    }

    // Token
    const token = createJWT({ payload: createTokenCustomer(result) });

    const refreshToken = createRefreshJWT({
      payload: createTokenCustomer(result),
    });
    await createCustomerRefreshToken({
      refreshToken,
      customer: result._id,
    });

    return {
      token,
      refreshToken,
      firstname: result.firstname,
      lastname: result.lastname,
      email: result.email,
      role: result.role,
    };
  }
};

module.exports = { signin };
