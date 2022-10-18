const errorHandler = require("../helpers/error-handler");
const path = require("path");

module.exports = {
  uploadFile: async (req, res, next) => {
    /**
        #swagger.tags = ['File Upload']
        #swagger.summary = 'Upload Product Image '
        #swagger.consumes = ['multipart/form-data']
        #swagger.description = 'Upload Product Image '
        #swagger.parameters['image'] = {
            in: 'formData',
            type: 'array',
            required: true,
            description: 'Upload Product Image ',
            collectionFormat: 'multi',
            items: { type: 'file' }
          },
       
       */

    if (
      typeof req.files == "undefined" ||
      req.files.length == undefined ||
      req.files.length == 0
    ) {
      return next(new errorHandler("No file uploaded", 404));
    }

    let files = [];

    req.files.map((file) => {
      files.push({
        fieldname: file.fieldname,
        name: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        destination: file.destination,
        filename: file.filename,
        url: file.path.replace(
          path.join(__dirname, "/../static"),
          `${req.protocol}://${req.get("host")}`
        ),
        size: file.size,
      });
    });

    res.json({
      success: true,
      files: files,
    });
  },
};
