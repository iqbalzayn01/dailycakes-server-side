// import model Customers
const Customers = require("../../api/customers/model");

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors");
const { createTokenCustomers, createJWT } = require("../../utils");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const signUpCustomers = async (req) => {
  const { firstname, lastname, email, password, address, notelp } = req.body;

  // cari Customers dengan field name
  const check = await Customers.findOne({ firstname, lastname, email });

  // apa bila check true / data Customers sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check) throw new BadRequestError("Anda sudah terdaftar");

  const result = await Customers.create({
    firstname,
    lastname,
    email,
    password,
    address,
    notelp,
  });

  delete result._doc.password;

  return result;
};

const signinCustomers = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result = await Customers.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  if (result.status === "tidak aktif") {
    throw new UnauthorizedError("Akun anda belum aktif");
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = createJWT({ payload: createTokenCustomers(result) });

  return token;
};

const getAllCustomers = async () => {
  const result = await Customers.find();

  return result;
};

const getOneCustomers = async (req) => {
  const { id } = req.params;

  const result = await Customers.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada customer dengan id :  ${id}`);

  return result;
};

const updateCustomers = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari Customers dengan field name dan id selain dari yang dikirim dari params
  const check = await Customers.findOne({
    name,
    _id: { $ne: id },
  });

  // apa bila check true / data Customers sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check) throw new BadRequestError("Nama anda sudah sudah terdaftar");

  const result = await Customers.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan pesan error yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada customer dengan id :  ${id}`);

  return result;
};

const deleteCustomers = async (req) => {
  const { id } = req.params;

  const result = await Customers.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada customer dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  signUpCustomers,
  getAllCustomers,
  getOneCustomers,
  updateCustomers,
  deleteCustomers,
};
