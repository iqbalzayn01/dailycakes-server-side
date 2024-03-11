const { StatusCodes } = require("http-status-codes");
const {
  getCustomerRefreshToken,
} = require("../../services/mongoose/customerRefreshToken");

const index = async (req, res, next) => {
  try {
    const result = await getCustomerRefreshToken(req);

    res.status(StatusCodes.OK).json({
      data: { token: result },
    });
  } catch (err) {
    console.log("err");
    console.log(err);
    next(err);
  }
};

module.exports = { index };
