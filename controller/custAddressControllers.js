const { nextDay } = require("date-fns");
const errorHandler = require("../helpers/error-handler");

const create = async (req, res) => {
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
    meassage: "Berhasil menambahkan alamat baru.",
  });
};

const findAll = async (req, res) => {
  let address = await req.custAddressUC.FindAll(req.Customer["id"]);

  if (address == null) {
    address = [];
  }
  return res.status(200).json({
    message: `Berhasil mendapatkan semua address dengan id Customer ${req.Customer["firstName"]}.`,
    data: address,
  });
};

const findOne = async (req, res) => {
  const { addressId } = req.params;

  let address = await req.custAddressUC.FindById(addressId);

  if (!address) return nextDay(new errorHandler("Address not found", 404));

  res.json({
    message: `Berhasil mendapatkan address dengan id:${addressId} .`,
    data: address,
  });
};

const delById = async (req, res) => {
  const { addressId } = req.params;

  let address = await req.custAddressUC.FindById(addressId);

  if (!address) return nextDay(new errorHandler("Address not found", 404));

  await req.custAddressUC.Delete(addressId);

  return res.status(200).json({
    message: "Berhasil menghapus address",
  });
};

const update = async (req, res) => {
  const { addressId } = req.params;

  let address = await req.custAddressUC.FindById(addressId);

  if (!address) return nextDay(new errorHandler("Address not found", 404));

  await req.custAddressUC.Update(req.body, addressId);

  res.json({
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
