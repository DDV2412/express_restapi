const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const hash = (text) => {
  return bcrypt.hashSync(text, salt);
}

const validateText = (text, hash) => bcrypt.compareSync(text, hash);

module.exports = {
  hash,
  validateText
}