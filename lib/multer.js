const multer = require("multer");
const path = require("path");

const fileStrore = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname + "/../public/images"));
  },

  filename: (req, file, callback) => {
    callback(
      null,
      Date.now() + file.originalname + "-" + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = { fileStrore, fileFilter };
