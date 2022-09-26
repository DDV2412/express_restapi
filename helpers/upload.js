const cloudinary = require('../config/cloudinary.config');
const fs = require('fs');

async function upload1(file, options = { }){
    try {
        const res = await cloudinary.uploader.upload(file, {
            use_filename: true,
            unique_filename: true,
            overwrite: true,
            ...options
        });
        fs.unlinkSync(file);

        return res.url;
    } catch (err) {
        throw err;
    }
}

async function upload2(file, options = { }){
  try {
      const res = await cloudinary.uploader.upload(file, {
          use_filename: true,
          unique_filename: true,
          overwrite: true,
          ...options
      });
      fs.unlinkSync(file);

      return res;
  } catch (err) {
      throw err;
  }
}

const destroy = async (publicID) => {
    try {
      const res = await cloudinary.uploader.destroy(publicID);
  
      return res;
    } catch (err) {
      throw err;
    }
  }
  
module.exports = {upload1, upload2, destroy};