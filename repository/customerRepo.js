const { users: Customer, Sequelize } = require("../models");
const bcrypt = require("bcrypt");
const loggerWinston = require("../helpers/logs-winston");
const Pagination = require("../helpers/Requestpagination");

class CustomerRepository {
  constructor() {
    this.Customer = Customer;
    this.Sequelize = Sequelize;
  }

  GetById = async (id) => {
    try {
      return await this.Customer.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  GetByEmail = async (email) => {
    try {
      return await this.Customer.findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  GetAll = async (page, size, filters) => {
    try {
      const { limit, offset } = new Pagination(page, size);

      let _where = filters
        ? {
            isAdmin: false,
            [this.Sequelize.Op.or]: {
              firstName: { [this.Sequelize.Op.like]: `%${filters}%` },
              lastName: { [this.Sequelize.Op.like]: `%${filters}%` },
              email: { [this.Sequelize.Op.like]: `%${filters}%` },
            },
          }
        : {
            isAdmin: false,
          };

      const customer = await this.Customer.findAndCountAll({
        where: _where,
        limit,
        offset,
        distinct: true,
      });

      return {
        customer: customer.rows,
        total: customer.count,
        currentPage: page ? +page : 0,
        countPage: Math.ceil(customer.count / limit),
      };
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  DelById = async (id) => {
    try {
      return await this.Customer.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  UpdatePass = async (password, id) => {
    let newPassword = bcrypt.hashSync(password, 10);
    try {
      return await this.Customer.update(
        { password: newPassword },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  UpdateProfile = async (profile, id) => {
    try {
      return await this.Customer.update(profile, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

module.exports = CustomerRepository;
