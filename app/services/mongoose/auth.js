const Users = require("../../api/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createTokenUser, createJWT, createRefreshJWT } = require("../../utils");
const { createUserRefreshToken } = require("./refreshToken");

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result = await Users.findOne({ email: email });

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const token = createJWT({ payload: createTokenUser(result) });

  const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
  await createUserRefreshToken({
    refreshToken,
    user: result._id,
  });

  return { token, refreshToken, role: result.role, email: result.email };
};

module.exports = { signin };
