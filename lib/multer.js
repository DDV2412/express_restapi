const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileStrore = multer.diskStorage({
  destination: (req, file, callback) => {
    if (
      !fs.existsSync(path.join(__dirname + `/../static/${req.params["path"]}`))
    ) {
      fs.mkdirSync(path.join(__dirname + `/../static/${req.params["path"]}`));
    }
    callback(null, path.join(__dirname + `/../static/${req.params["path"]}`));
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

module.exports = { fileStrore, fileFilter };
