const { CustAddress } = require("../models");
const loggerWinston = require("../helpers/logs-winston");

class CustAddressRepository {
  constructor() {
    this.CustAddress = CustAddress;
  }

  FindAll = async (customer_id) => {
    try {
      return await this.CustAddress.findAll({
        where: {
          cust_id: customer_id,
        },
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  FindById = async (id) => {
    try {
      return await this.CustAddress.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      loggerWinston.log(error);
      return null;
    }
  };

  Create = async (addressData) => {
    try {
      return await this.CustAddress.create(addressData);
    } catch (error) {
      loggerWinston.log(error);
      return null;
    }
  };

  Update = async (addressData, id) => {
    try {
      return await this.CustAddress.update(addressData, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      loggerWinston.log(error);
      return null;
    }
  };

  Delete = async (id) => {
    try {
      return await this.CustAddress.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      loggerWinston.log(error);
      return null;
    }
  };
}

module.exports = CustAddressRepository;
