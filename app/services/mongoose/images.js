const Images = require("../../api/images/model");
const { NotFoundError } = require("../../errors");

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/product_image/default.jpeg",
  });

  return result;
};

// tambahkan function checking Image
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan id :  ${id}`);

  return result;
};

module.exports = { createImages, checkingImage };
