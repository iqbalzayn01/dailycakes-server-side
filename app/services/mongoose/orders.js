// import model Orders
const Orders = require("../../api/orders/model");
const { checkingCategories } = require("./categories");
const { checkingImage } = require("./images");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllOrders = async (req) => {
  const { keyword, category } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  //   const result = await Orders.find();
  const result = await Orders.find(condition).populate({
    path: "order",
    select: "_id name",
  });

  return result;
};

const createOrders = async (req) => {
  const { productName, description, price, stock, category, image } = req.body;

  // Cari Category dan Image dengan field id
  await checkingCategories(category);
  await checkingImage(image);

  // cari Orders dengan field name
  const check = await Orders.findOne({ productName });

  // apa bila check true / data Orders sudah ada maka kita tampilkan error bad request dengan message Orders nama duplikat
  if (check) throw new BadRequestError("Nama produk sudah terdaftar");

  const result = await Orders.create({
    productName,
    description,
    price,
    stock,
    category,
    image,
  });

  return result;
};

const getOneOrders = async (req) => {
  const { id } = req.params;

  const result = await Orders.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada produk dengan id :  ${id}`);

  return result;
};

const updateOrders = async (req) => {
  const { id } = req.params;
  const { productName, description, price, stock, category, image } = req.body;

  // cari Orders dengan field name dan id selain dari yang dikirim dari params
  const check = await Orders.findOne({
    productName,
    _id: { $ne: id },
  });

  // apa bila check true / data Orders sudah ada maka kita tampilkan pesan error bad request
  if (check) throw new BadRequestError("produk nama duplikat");

  const result = await Orders.findOneAndUpdate(
    { _id: id },
    { productName, description, price, stock, category, image },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan pesan error yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada produk dengan id :  ${id}`);

  return result;
};

const deleteOrders = async (req) => {
  const { id } = req.params;

  const result = await Orders.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada produk dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

// const checkingOrders = async (id) => {
//   const result = await Orders.findOne({ _id: id });

//   if (!result) throw new NotFoundError(`Tidak ada Orders dengan id :  ${id}`);

//   return result;
// };

module.exports = {
  getAllOrders,
  createOrders,
  getOneOrders,
  updateOrders,
  deleteOrders,
};
