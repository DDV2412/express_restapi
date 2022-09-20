const { Customer } = require('../models');
const { validatetext } = require('../helper/bcrypt');
const { encode } = require("../helpers/jwt");


const ERROR = res.status(error.status || 500).json({message: error.message || 'Internal server error.'})


const register = async(req, res) => {
    try {
        const newCustomer = {
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            noPhone: req.body.noPhone,
            password: req.body.password
        }

        await Customer.create(newCustomer);

        return res
        .status(201)
        .json({
            meassage: 'Berhasil mendaftarkan customer baru.',
            customerEmail: newCustomer.email
        })
    } catch (error) {
        return ERROR;
        //res.status(error.status || 500)
        // .json({
        //     message: error.message || 'Internal server error.'
        // })
    }
};

const login = async(req, res) => {

    try {
        let customer = await Customer.findOne({
            attributes: ['id', 'usrName', 'firstName', 'lastName', 'email', 'noPhone', 'password'],
            where: {
                email: req.body.email,
            }
        });

        if(!customer)throw{
            status: 400,
            message: 'Customer name atau password tidak sesuai.'
        }

        if(validatetext(req.body.password, customer.dataValues.password))throw{
            status: 400,
            message: 'Customer name atau password tidak sesuai.'
        }

        return res.
        status(201)
        .json({
            message: 'Berhasil Login.',
            customer: req.body.email,
            token: encode({
                id: customer.dataValues.id,
                userName: customer.dataValues.userName,
                email: customer.dataValues.email
            })
        });

    } catch (error) {
        return ERROR;
    }
}

const getById = async(req, res) => {
    try {
        let customer = await Customer.findOne({
            attributes: ['id', 'usrName', 'firstName', 'lastName', 'email', 'noPhone', 'password'],
            where: {
                id: req.body.id,
            },
        });
        
        return res
        .status(200)
        .json({
            message: `Berhasil mendapatkan customer dengan Username: ${customer.dataValues.userName}`,
            data: [
                customer
            ]
        })


    } catch (error) {
        return ERROR
    }
};

const getAll = async(req, res) => {
    try {
        let allCustomer = await Customer.findAll();
        return res
        .status(200)
        .json({
            message: 'Berhasil mendapatkan semua customer.'
        })

    } catch (error) {
        return ERROR;
    }
};

const delById = async(req, res) => {
    try {
        let customer = await Customer.drop({
            attributes: ['id', 'usrName', 'firstName', 'lastName', 'email', 'noPhone', 'password'],
            where: {
                id: req.body.id,
            }
        });
        return res
        .status(200)
        .json({
            message: 'Berhasil menghapus customer dengan Username: .'
        })

    } catch (error) {
        return ERROR;
    }
};

const updatePass = async(req, res) => {
    try {
        let password = await Customer.update({password: req.body.password},
            {where: {
                id: req.body.id
            }
        })
        return res
        .status(200)
        .json({
            message: `berhasil merubah password menjadi = ${req.body.password}`});

    } catch (error) {
        return ERROR;
    }
};

module.exports = {register, login, getById, getAll, delById, updatePass};