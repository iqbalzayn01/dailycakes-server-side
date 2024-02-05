// import model Customers
const Customers = require("../../api/customers/model");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllCustomers = async () => {
  const result = await Customers.find();

  return result;
};

const createCustomers = async (req) => {
  const { name } = req.body;

  // cari Customers dengan field name
  const check = await Customers.findOne({ name });

  // apa bila check true / data Customers sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check) throw new BadRequestError("Nama anda sudah sudah terdaftar");

  const result = await Customers.create({ name });

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
  getAllCustomers,
  createCustomers,
  getOneCustomers,
  updateCustomers,
  deleteCustomers,
};
