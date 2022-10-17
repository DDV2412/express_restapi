const multer = require('multer');

const fileFilter = (req, file, next) => {
  if (!file) next('File cannot be empty');
  else if (file.mimetype !== 'image/png') next({
    message: 'Unsupport file format',
    support: 'png'
  });

  else next(null, true);
}

const storage = multer.diskStorage({
  //  folder tempat menyimpan hasil generated file
  destination: (_, __,next) => next(null, './files'),

  //  nama file
  filename: function (req, file, next) {
    try {
      const originalnameArr = file.originalname.split('.');
      const fileFormat = originalnameArr[originalnameArr.length - 1];
  
      const current = new Date();
      const ms = current.getMilliseconds() > 9 ? current.getMilliseconds() : `0${current.getMilliseconds()}`;
      const ss = current.getSeconds() > 9 ? current.getSeconds() : `0${current.getSeconds()}`;
      const mm = current.getMinutes() > 9 ? current.getMinutes() : `0${current.getMinutes()}`;
      const hh = current.getHours() > 9 ? current.getHours() : `0${current.getHours()}`;
      const DD = current.getDate() > 9 ? current.getDate() : `0${current.getDate()}`;
      const MM = current.getMonth() + 1 > 9 ? current.getMonth() + 1 : `0${current.getMonth() + 1}`;
      const YY = current.getFullYear();
  
      const filename = `${YY}${MM}${DD}${hh}${mm}${ss}${ms}.${fileFormat}`;
      req.filePath = filename;

      next(null, filename);
    } catch (err) {
      next(err);
    }
  }
})

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500_000
    }
});