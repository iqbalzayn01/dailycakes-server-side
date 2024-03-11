const CustomerRefreshToken = require("../../api/customerRefreshToken/model");
const {
  isTokenValidRefreshToken,
  createJWT,
  createTokenCustomer,
} = require("../../utils");
const Customers = require("../../api/customers/model");
const { NotFoundError } = require("../../errors");

const createCustomerRefreshToken = async (payload) => {
  const result = await CustomerRefreshToken.create(payload);

  return result;
};

const getCustomerRefreshToken = async (req) => {
  const { refreshToken } = req.params;
  const result = await CustomerRefreshToken.findOne({
    refreshToken,
  });

  if (!result) throw new NotFoundError(`refreshToken tidak valid `);

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  const customerCheck = await Customers.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenCustomer(customerCheck) });

  return token;
};

module.exports = {
  createCustomerRefreshToken,
  getCustomerRefreshToken,
};
