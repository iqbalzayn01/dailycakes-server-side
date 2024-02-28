// import model Customers
const Customers = require("../../api/customers/model");

// import models
const Products = require("../../api/products/model");

// import custom error not found dan bad request
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors");

const { createTokenCustomers, createJWT } = require("../../utils");

const signUpCustomers = async (req) => {
  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    address,
    notelp,
  } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan Konfirmasi password tidak cocok");
  }

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

  const result = await Participant.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = createJWT({ payload: createTokenCustomers(result) });

  return token;
};

const getAllProducts = async (req) => {
  const result = await Products.find()
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");

  return result;
};

const getOneProduct = async (req) => {
  const { id, productName } = req.params;
  const result = await Products.findOne({ _id: id, productName })
    .populate("category")
    .populate({ path: "talent", populate: "image" })
    .populate("image");

  if (!result) throw new NotFoundError(`Tidak ada produk dengan id :  ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  console.log(req.participant);
  const result = await Orders.find({ participant: req.participant.id });
  return result;
};

const getAllCustomers = async (req) => {
  const result = await Customers.find();

  return result;
};

const getOneCustomers = async (req) => {
  const { id } = req.params;

  const result = await Customers.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Customer dengan id :  ${id}`);

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
  signinCustomers,
  getAllProducts,
  getOneProduct,
  getAllOrders,
  getAllCustomers,
  getOneCustomers,
  updateCustomers,
  deleteCustomers,
};
