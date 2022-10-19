const { users: Customer, Sequelize } = require("../models");
const { validateText } = require("../helpers/bcrypt");
const loggerWinston = require("../helpers/logs-winston");

class authRepository {
  constructor() {
    this.Customer = Customer;
    this.Sequelize = Sequelize;
  }

  GetUserByUserName = async (userName) => {
    try {
      return await this.Customer.findOne({
        where: {
          userName: userName,
        },
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  Register = async (customerData) => {
    try {
      return await this.Customer.create(customerData);
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  Login = async (userName, password) => {
    try {
      const customer = await this.GetUserByUserName(userName);
      if (customer === null) {
        return null;
      }

      const valid = validateText(password, customer.password);

      if (!valid) {
        return null;
      }
      return customer;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

module.exports = authRepository;
