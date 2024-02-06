const Users = require("../../api/users/model");
const { BadRequestError } = require("../../errors");

const createUsers = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan Konfirmasi password tidak cocok");
  }

  const result = await Users.create({
    name,
    email,
    password,
    role,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
};

const getOneUsers = async (req) => {
  const { id } = req.params;

  const result = await Users.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada user dengan id :  ${id}`);

  return result;
};

const updateUsers = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  const check = await Users.findOne({
    name,
    _id: { $ne: id },
  });

  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message user nama duplikat
  if (check) throw new BadRequestError("User nama sudah terdaftar");

  const result = await Users.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada user dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada user dengan id :  ${id}`);

  return result;
};

const deleteUsers = async (req) => {
  const { id } = req.params;

  const result = await Users.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada user dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createUsers,
  getAllUsers,
  getOneUsers,
  updateUsers,
  deleteUsers,
};
