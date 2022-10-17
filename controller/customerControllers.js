const errorHandler = require("../helpers/error-handler");

const getById = async (req, res, next) => {
  const { customerId } = req.params;

  let customer = await req.customerUC.GetById(customerId);

  if (!customer) return next(new errorHandler("Customer not found", 404));

  res.json({
    message: `Berhasil mendapatkan customer dengan Username: ${customer.userName}`,
    data: [customer],
  });
};

const profile = async (req, res, next) => {
  const { id } = req.Customer;

  let customer = await req.customerUC.GetById(id);

  if (!customer) return next(new errorHandler("Customer not found", 404));

  res.json({
    message: `Berhasil mendapatkan customer dengan Username: ${customer.userName}`,
    data: [customer],
  });
};

const getAll = async (req, res, next) => {
  const { page, size, filters } = req.query;

  let allCustomer = await req.customerUC.GetAll(page, size, filters);

  res.json({
    message: "Berhasil mendapatkan semua customer.",
    total: allCustomer.total,
    currentPage: allCustomer.currentPage,
    countPage: allCustomer.countPage,
    data: allCustomer.customer,
  });
};

const delById = async (req, res, next) => {
  const { id } = req.Customer;

  let customer = await req.customerUC.GetById(id);

  if (!customer) return next(new errorHandler("Customer not found", 404));

  await req.customerUC.DelById(id);

  return res.status(200).json({
    message: "Berhasil menghapus customer dengan Username: .",
  });
};

const updatePass = async (req, res, next) => {
  const { id } = req.Customer;

  let customer = await req.customerUC.GetById(id);

  if (!customer) return next(new errorHandler("customer not found", 404));

  await req.customerUC.UpdatePass(req.body.password, id);

  res.json({
    message: `berhasil merubah password`,
  });
};

const updateProfile = async (req, res, next) => {
  const { id } = req.Customer;

  let customer = await req.customerUC.GetById(id);

  if (!customer) return next(new errorHandler("customer not found", 404));

  await req.customerUC.UpdateProfile(req.body, id);

  res.json({
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
