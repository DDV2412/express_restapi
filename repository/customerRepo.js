const {users: Customer} = require('../models');
const bcrypt = require('bcrypt');


class CustomerRepository {
    constructor() {
        this.Customer = Customer;
    }

    Register = async (customerData) => {
        customerData.password = bcrypt.hashSync(customerData.password, 10);
        //customerData.isAdmin = false;

        let customer = null;
        try {
            customer = await Customer.create(customerData);
        } catch (error) {
            console.error(error);
            return null;
        }
        return customer;
    };

    Login = async(email, password) => {
        let customer = null
        try {
            customer = await this.getCustomerByEmail(email);
            if(customer === null){
                return customer;
            }
        } catch (error) {
            console.error(error);
            return null;
        }

        const valid = bcrypt.compareSync(password, customer.password);

        if(!valid){
            return null;
        }
        return customer;
    };

    async getCustomerByEmail(email) {
        try {
            return await Customer.findOne({
                where: {
                    email: email
                }
            })
        } catch (error) {
            console.error(error);
            return null;
        }
        
    };

    GetById = async(id) => {
        let customer = null;
        try {
            customer =  await Customer.findOne({
                where: {
                    id: id
                }
            });            
        } catch (error) {
            console.error(error);
            return null;
        }

        return customer;
    };

    GetAll = async() => {
        const customer = null;
        try {
            customer = await Customer.findALl()
        } catch (error) {
            console.error(error);
            return null;
        }
        return customer;
    };

    DelById = async(id) =>{
        let customer = null;
        try {
            customer = await Customer.Destroy({
                where: {
                    id:id
                }
            });
        } catch (error) {
            console.error(error);
            return null;
        }

        return customer;
    };

    UpdatePass = async(password, id) => {
        //let password = null;
        try {
            password = await Customer.Update({password: preq.body.assword},
                {where: {
                    id: id
                }});
        } catch (error) {
            console.error(error);
            return null;
        }

        return password;
    };
}

module.exports = CustomerRepository;