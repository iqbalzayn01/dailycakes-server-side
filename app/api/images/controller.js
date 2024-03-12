// import services images
const { createImages } = require("../../services/mongoose/images");

const { StatusCodes } = require("http-status-codes");

const path = require("path");

const create = async (req, res) => {
  try {
    console.log("req.file");
    console.log(req.file);

    const result = await createImages(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Menyediakan gambar dari folder uploads
const getUploadedImages = (req, res) => {
  // Ambil nama file dari parameter URL
  const imageName = req.params.imageName;

  // Dapatkan path ke folder upload
  const uploadFolder = path.join(__dirname, "../../../public/uploads/");

  // Mengirimkan gambar sebagai respons
  res.sendFile(path.join(uploadFolder, imageName));
};

module.exports = { create, getUploadedImages };
