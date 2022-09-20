'use strict';
const uuid = require('uuid');
const { hash } = require('../helper/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    noPhone: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.addHook('beforeCreate', (customer) => {
    try {
      customer.id = uuid.v4();
      customer.password = hash(customer.password);
    } catch (err) {
      throw err;
    }
  });

  return Customer;
};