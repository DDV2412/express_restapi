const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileStroreProduct = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!fs.existsSync(path.join(__dirname + "/../static/products"))) {
      fs.mkdirSync(path.join(__dirname + "/../static/products"));
    }
    callback(null, path.join(__dirname + "/../static/products"));
  },

  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const fileStroreAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!fs.existsSync(path.join(__dirname + "/../static/avatar"))) {
      fs.mkdirSync(path.join(__dirname + "/../static/avatar"));
    }
    callback(null, path.join(__dirname + "/../static/avatar"));
  },

  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
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

module.exports = { fileStroreAvatar, fileStroreProduct, fileFilter };
