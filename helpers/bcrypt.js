const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const hash = (text) => bcrypt.hashSync(text, salt);
const validateText = (text, hash) => bcrypt.compareSync(text, hash);
module.exports = {
  hash,
  validateText,
};
