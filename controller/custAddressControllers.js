const errorHandler = require("../helpers/Error-Handler");
const { address } = require("../validation");

const create = async (req, res) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Create Address --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Create Address --Customer'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Address',
            required: true,
            schema: {
              "city": "Bantul",
              "province": "Yogyakarta",
              "line": "Banguntapan",
              "zip_code": "55198"
            }
          },
      #swagger.responses[200] = {
            description: 'Create Order',
            schema: {
                    "success": true,
                    "message": "Berhasil menambahkan alamat baru."           
            }
      }
      */
  const { error } = address({
    city: req.body.city,
    province: req.body.province,
    line: req.body.line,
    zip_code: req.body.zip_code,
  });

  if (error) return next(new errorHandler(error["details"][0]["message"], 400));

  const newAddress = {
    cust_id: req.Customer["id"],
    city: req.body.city,
    province: req.body.province,
    line: req.body.line,
    zip_code: req.body.zip_code,
  };

  await req.custAddressUC.Create(newAddress);

  res.status(201);

  res.json({
    success: true,
    message: "Berhasil menambahkan alamat baru.",
  });
};

const findAll = async (req, res) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Address List --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Address List --Customer'
      #swagger.responses[200] = {
            description: 'Address List',
            schema: {
                    success: true,
                    message: `Berhasil mendapatkan semua address dengan id Customer`,
                    data: [],                
            }
      }
      */
  let address = await req.custAddressUC.FindAll(req.Customer["id"]);

  if (address == null) {
    address = [];
  }
  return res.status(200).json({
    success: true,
    message: `Berhasil mendapatkan semua address dengan id Customer ${req.Customer["firstName"]}.`,
    data: address,
  });
};

const findOne = async (req, res, next) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Address By ID --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Address By ID --Customer'
      #swagger.responses[200] = {
            description: 'Address By ID',
            schema: {
                    "success": true,
                    "message": "Berhasil mendapatkan address dengan id",
                    "data": {},
            }
      }
      #swagger.responses[404] = {
            description: 'Address By ID',
            schema: {
                    "success": false,
                    "message": "Address not found",
            }
      }
      */
  const { addressId } = req.params;

  let address = await req.custAddressUC.FindById(addressId);

  if (!address) return next(new errorHandler("Address not found", 404));

  res.json({
    success: true,
    message: `Berhasil mendapatkan address dengan id:${addressId} .`,
    data: address,
  });
};

const delById = async (req, res, next) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Delete Address By ID --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Delete Address By ID --Customer'
      #swagger.responses[200] = {
            description: 'Delete Address By ID',
            schema: {
                    "success": true,
                    "message": "Berhasil menghapus address",
            }
      }
      #swagger.responses[404] = {
            description: 'Delete Address By ID',
            schema: {
                    "success": false,
                    "message": "Address not found",
            }
      }
      */
  const { addressId } = req.params;

  let address = await req.custAddressUC.FindById(addressId);

  if (!address) return next(new errorHandler("Address not found", 404));

  await req.custAddressUC.Delete(addressId);

  return res.status(200).json({
    success: true,
    message: "Berhasil menghapus address",
  });
};

const update = async (req, res, next) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Update Address By ID --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Update Address By ID --Customer'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Address',
            required: true,
            schema: {
              "city": "Bantul",
              "province": "Yogyakarta",
              "line": "Banguntapan",
              "zip_code": "55198"
            }
          },
      #swagger.responses[200] = {
            description: 'Create Order',
            schema: {
                    "success": true,
                    "message": "Berhasil memperbaharui address id"           
            }
      }
      #swagger.responses[404] = {
            description: 'Create Order',
            schema: {
                    "success": true,
                    "message": "Address not found"           
            }
      }
      */
  const { addressId } = req.params;

  let address = await req.custAddressUC.FindById(addressId);

  if (!address) return next(new errorHandler("Address not found", 404));

  await req.custAddressUC.Update(req.body, addressId);

  res.json({
    success: true,
    message: `Berhasil memperbaharui address id : ${addressId}`,
  });
};

module.exports = {
  create,
  findAll,
  findOne,
  delById,
  update,
};
