const CustAddress = require("../models");

class CustAddressRepository {
  constructor() {
    this.CustAddress = CustAddress;
  }

  FindAll = async (customer_id) => {
    let address = null;

    try {
      address = await this.CustAddress.findAll({
        where: {
          customer_id: customer_id,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
    return address;
  };

  FindById = async (id) => {
    let address = null;

    try {
      address = await this.CustAddress.fineOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
    return address;
  };

  Create = async (addressData) => {
    let address = null;

    try {
      address = await this.CustAddress.create(addressData);
    } catch (error) {
      console.log(error);
      return null;
    }
    return address;
  };

  Update = async (addressData) => {
    let address = null;
    try {
      address = await this.CustAddress.update(
        { address: addressData },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
    return address;
  };

  Delete = async (id) => {
    let address = null;

    try {
      address = await this.CustAddress.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
    return address;
  };
}

module.exports = CustAddressRepository;
