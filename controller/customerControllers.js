const errorHandler = require("../helpers/Error-Handler");
const validation = require("../validation");

const getById = async (req, res, next) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Customer By ID --Admin'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Customer By ID --Admin'
      #swagger.responses[200] = {
            description: 'Customer By ID',
            schema: {
                    success: true,
                    message: `Berhasil mendapatkan customer dengan Username:.`,
                    data: {},                            
            }
      }
      #swagger.responses[404] = {
            description: 'Customer List',
            schema: {
                    success: false,
                    message: `Customer not found`,                           
            }
      }
      */
  const { customerId } = req.params;

  let customer = await req.customerUC.GetById(customerId);

  if (!customer) return next(new errorHandler("Customer not found", 404));

  res.json({
    success: true,
    message: `Berhasil mendapatkan customer dengan Username: ${customer.userName}`,
    data: customer,
  });
};

const profile = async (req, res, next) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Customer Profile --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Customer Profile --Customer'
      #swagger.responses[200] = {
            description: 'Customer Profile',
            schema: {
                    success: true,
                    message: `Berhasil mendapatkan customer dengan Username.`,
                    data: {},                          
            }
      }
      #swagger.responses[200] = {
            description: 'Customer Profile',
            schema: {
                    success: false,
                    message: `Customer not found`,                       
            }
      }
      */
  const { id } = req.Customer;

  let customer = await req.customerUC.GetById(id);

  if (!customer) return next(new errorHandler("Customer not found", 404));

  res.json({
    success: true,
    message: `Berhasil mendapatkan customer dengan Username: ${customer.userName}`,
    data: customer,
  });
};

const getAll = async (req, res, next) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Customer List --Admin'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Customer List --Admin'
      #swagger.responses[200] = {
            description: 'Customer List',
            schema: {
                    success: true,
                    message: "Berhasil mendapatkan semua customer.",
                    total: 0,
                    currentPage: 0,
                    countPage: 0,
                    data: [],                       
            }
      }
      */
  const { page, size, filters } = req.query;

  let allCustomer = await req.customerUC.GetAll(page, size, filters);

  if (!allCustomer) {
    allCustomer = [];
  }

  res.json({
    success: true,
    message: "Berhasil mendapatkan semua customer.",
    total: allCustomer.total,
    currentPage: allCustomer.currentPage,
    countPage: allCustomer.countPage,
    data: allCustomer.customer,
  });
};

const delById = async (req, res, next) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Delete Account --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Delete Account --Customer'
      #swagger.responses[200] = {
            description: 'Delete Account',
            schema: {
                    success: true,
                    message: "Berhasil menghapus customer dengan Username: .",           
            }
      }
      #swagger.responses[404] = {
            description: 'Customer Update Profile',
            schema: {
                    success: false,
                    message: `Customer not found`,           
            }
      }
      */
  const { id } = req.Customer;

  let customer = await req.customerUC.GetById(id);

  if (!customer) return next(new errorHandler("Customer not found", 404));

  await req.customerUC.DelById(id);

  return res.status(200).json({
    success: true,
    message: "Berhasil menghapus customer dengan Username: .",
  });
};

const updatePass = async (req, res, next) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Customer Update Password --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Customer Update Password --Customer'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Customer Update Password',
            required: true,
            schema: {
               "password": "DDV24129&$",
              "confirmPassword": "DDV24129&$"
            }
      },
      #swagger.responses[200] = {
            description: 'Customer Update Profile',
            schema: {
                    success: true,
                    message: `berhasil merubah password`,           
            }
      }
      #swagger.responses[404] = {
            description: 'Customer Update Profile',
            schema: {
                    success: false,
                    message: `Customer not found`,           
            }
      }
      #swagger.responses[403] = {
            description: 'Customer Update Profile',
            schema: {
                    success: false,
                    message: `Password not match`,           
            }
      }
      #swagger.responses[400] = {
            description: 'Customer Update Profile',
            schema: {
                    success: false,
                    message: `___`,           
            }
      }
      */
  const { id } = req.Customer;

  let customer = await req.customerUC.GetById(id);

  if (!customer) return next(new errorHandler("Customer not found", 404));

  const { error } = validation.password({
    password: req.body.password,
  });

  if (error) return next(new errorHandler(error["details"][0]["message"], 400));

  if (req.body["password"] !== req.body["confirmPassword"])
    return next(new errorHandler("Password not match", 403));

  await req.customerUC.UpdatePass(req.body.password, id);

  res.json({
    success: true,
    message: `berhasil merubah password`,
  });
};

const updateProfile = async (req, res, next) => {
  /**
      #swagger.tags = ['Customer']
      #swagger.summary = 'Customer Update Profile --Customer'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Customer Update Profile --Customer'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Customer Update Profile',
            required: true,
            schema: {
              "photoProfile": "http://localhost:5000\\profile\\1665840984530IJRES - Journal Cover web.png"
            }
      },
      #swagger.responses[200] = {
            description: 'Customer Update Profile',
            schema: {
                    success: true,
                    message: `berhasil merubah profile`,           
            }
      }
      #swagger.responses[404] = {
            description: 'Customer Update Profile',
            schema: {
                    success: false,
                    message: `Customer not found`,           
            }
      }
      */
  const { id } = req.Customer;

  let customer = await req.customerUC.GetById(id);

  if (!customer) return next(new errorHandler("Customer not found", 404));

  await req.customerUC.UpdateProfile(req.body, id);

  res.json({
    success: true,
    message: `berhasil merubah profile`,
  });
};

module.exports = {
  getById,
  getAll,
  delById,
  profile,
  updatePass,
  updateProfile,
};
