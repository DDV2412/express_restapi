const errorHandler = require("../helper/error-handler");
const path = require("path");

module.exports = {
  uploadFileArray: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['File Upload']
        #swagger.summary = 'Upload Product Image '
        #swagger.consumes = ['multipart/form-data']
        #swagger.description = 'Upload Product Image '
        #swagger.parameters['imageProduct'] = {
            in: 'formData',
            type: 'array',
            required: true,
            description: 'Upload Product Image ',
            collectionFormat: 'multi',
            items: { type: 'file' }
          },
       
       */
      if (typeof req.files == undefined || req.files.length == 0) {
        return next(new errorHandler("No file uploaded", 400));
      }

      let files = [];

      req.files.map((file) => {
        files.push({
          fieldname: file.fieldname,
          originalname: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
          destination: file.destination,
          filename: file.filename,
          path: file.path.replace(
            path.join(__dirname, "/../static/products"),
            `${req.protocol}://${req.get("host")}/api/product-image`
          ),
          size: file.size,
        });
      });

      res.status(200).json({
        success: true,
        status: 200,
        files: files,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  uploadFile: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['File Upload']
        #swagger.summary = 'Upload Avatar '
        #swagger.description = 'Upload Avatar '
        #swagger.parameters['photoProfile'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'Upload Avatar ',
          },
      
       */
      if (typeof req.file == undefined || req.file == null) {
        return next(new errorHandler("No file uploaded", 400));
      }

      let file = {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path.replace(
          path.join(__dirname, "/../static"),
          `${req.protocol}://${req.get("host")}/api/avatar`
        ),
        size: req.file.size,
      };

      res.status(200).json({
        success: true,
        status: 200,
        file: file,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  getProductImage: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['File Upload']
        #swagger.summary = 'Get Product Image '
        #swagger.description = 'Get Product Image '
     
       */
      const { fileName } = req.params;

      res
        .status(200)
        .sendFile(path.join(__dirname, "/../static/products/", fileName));
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },

  getAvatar: async (req, res, next) => {
    try {
      /**
        #swagger.tags = ['File Upload']
        #swagger.summary = 'Get Avatar '
        #swagger.description = 'Get Avatar '
     
       */
      const { fileName } = req.params;

      res
        .status(200)
        .sendFile(path.join(__dirname, "/../static/avatar/", fileName));
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  },
};
