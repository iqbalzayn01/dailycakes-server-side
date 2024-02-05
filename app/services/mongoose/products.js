// import model Products
const Products = require("../../api/products/model");
const { checkingCategories } = require("./categories");
const { checkingImage } = require("./images");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllProducts = async (req) => {
  const { keyword, category } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  //   const result = await Products.find();
  const result = await Products.find(condition).populate({
    path: "category",
    select: "_id name",
  });

  return result;
};

const createProducts = async (req) => {
  const { productName, description, price, stock, category, image } = req.body;

  // Cari Category dan Image dengan field id
  await checkingCategories(category);
  await checkingImage(image);

  // cari Products dengan field name
  const check = await Products.findOne({ productName });

  // apa bila check true / data Products sudah ada maka kita tampilkan error bad request dengan message Products nama duplikat
  if (check) throw new BadRequestError("Nama produk sudah terdaftar");

  const result = await Products.create({
    productName,
    description,
    price,
    stock,
    category,
    image,
  });

  return result;
};

const getOneProducts = async (req) => {
  const { id } = req.params;

  const result = await Products.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada produk dengan id :  ${id}`);

  return result;
};

const updateProducts = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari Products dengan field name dan id selain dari yang dikirim dari params
  const check = await Products.findOne({
    name,
    _id: { $ne: id },
  });

  // apa bila check true / data Products sudah ada maka kita tampilkan pesan error bad request
  if (check) throw new BadRequestError("produk nama duplikat");

  const result = await Products.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan pesan error yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada produk dengan id :  ${id}`);

  return result;
};

const deleteProducts = async (req) => {
  const { id } = req.params;

  const result = await Products.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada produk dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

// const checkingProducts = async (id) => {
//   const result = await Products.findOne({ _id: id });

//   if (!result) throw new NotFoundError(`Tidak ada Products dengan id :  ${id}`);

//   return result;
// };

module.exports = {
  getAllProducts,
  createProducts,
  getOneProducts,
  updateProducts,
  deleteProducts,
};
