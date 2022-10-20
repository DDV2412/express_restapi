const { users: Customer, resetPassword } = require("../models");
const { validateText } = require("../helpers/bcrypt");
const loggerWinston = require("../helpers/logs-winston");
const crypto = require("crypto");
const { hashSync } = require("bcrypt");
const { Op, Sequelize } = require("sequelize");

class authRepository {
  constructor() {
    this.Customer = Customer;
    this.Sequelize = Sequelize;
    this.ResetPassword = resetPassword;
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

  ForgotPassword = async (email) => {
    const token = await this.ResetPassword.findOne({
      where: {
        email: email,
      },
    });

    const fpSalt = crypto.randomBytes(64).toString("base64");

    const expireDate = new Date(new Date().getTime() + 15 * 60 * 1000);

    if (!token) {
      await this.ResetPassword.create({
        email: email,
        resetToken: fpSalt,
        expired_at: expireDate,
      });
    } else {
      await this.ResetPassword.update(
        {
          resetToken: fpSalt,
          expired_at: expireDate,
        },
        {
          where: {
            email: email,
          },
        }
      );
    }

    return fpSalt;
  };

  ResetPass = async (token, email, password) => {
    await this.ResetPassword.destroy({
      where: {
        expired_at: {
          [Op.lte]: this.Sequelize.fn(
            "date_trunc",
            "day",
            this.Sequelize.col("expired_at")
          ),
        },
      },
    });

    const resetToken = await this.ResetPassword.findOne({
      where: {
        email: email,
        resetToken: token,
        expired_at: {
          [Op.gte]: this.Sequelize.fn(
            "date_trunc",
            "day",
            this.Sequelize.col("expired_at")
          ),
        },
      },
    });

    if (!resetToken) {
      return null;
    }

    let newPass = hashSync(password, 12);

    await this.ResetPassword.destroy({
      where: {
        email: email,
      },
      force: true,
    });

    return await this.Customer.update(
      {
        password: newPass,
      },
      {
        where: {
          email: resetToken.email,
        },
      }
    );
  };

  VerifyEmail = async (email) => {
    return await this.Customer.update(
      {
        verified: Date.now(),
      },
      {
        where: {
          email: email,
        },
      }
    );
  };
}

module.exports = authRepository;
