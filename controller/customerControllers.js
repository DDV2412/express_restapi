const { validatetext } = require('../helper/bcrypt');
const { encode } = require("../helper/jwt");

const register = async(req, res) => {
    try {
        const newCustomer = {
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            noPhone: req.body.noPhone,
            password: req.body.password,
            role: req.body.role
        }

        await req.uC.customerUC.Register(newCustomer);

        return res
        .status(201)
        .json({
            meassage: 'Berhasil mendaftarkan customer baru.',
            customerEmail: newCustomer.email
        })
    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};

const login = async(req, res) => {

    try {
        let customer = await req.uC.customerUC.Login(req.body.email);


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
                email: customer.dataValues.email,
                role: customer.dataValues.role
            })
        });

    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
}

const getById = async(req, res) => {
    try {
        let customer = await req.uC.customerUC.GetById(req.body.id)
        
        return res
        .status(200)
        .json({
            message: `Berhasil mendapatkan customer dengan Username: ${customer.userName}`,
            data: [
                customer
            ]
        })


    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};

const getAll = async(req, res) => {
    try {
        let allCustomer = await req.uC.customerUC.GetAll();
        return res
        .status(200)
        .json({
            message: 'Berhasil mendapatkan semua customer.',
            data: [
                allCustomer
            ]
        })

    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};

const delById = async(req, res) => {
    try {
        let customer = await req.uC.customerUC.DelById(req.body.id);

        return res
        .status(200)
        .json({
            message: 'Berhasil menghapus customer dengan Username: .'
        })

    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};

const updatePass = async(req, res) => {
    try {
        let password = await req.uC.customerUC(req.body.password, req.body.id);
        return res
        .status(200)
        .json({
            message: `berhasil merubah password menjadi = ${req.body.password}`});

    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};

module.exports = {
    register, 
    login, 
    getById, 
    getAll, 
    delById, 
    updatePass
};