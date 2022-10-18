const db = require('../models/orders')
const Orders = db.Orders;
// const Op = db.Sequelize.Op;
const controller = {};


controller.getAll = async (req, res) => {
    const dataOrders = req.query.dataOrders
    let condition = dataOrders ? {dataOrders: {[Op.like]: `%${dataOrders}%`} } : null;
    try {
        await Orders.findAll({
            where: condition
        })
        .then(results => {
            res.send(results)
        })
    } catch (err) {
        next(err)
    }
}

controller.addOrder = async (req, res, next) => {
    const { qty, status, payment_method, confirm_payment } = req.body;
        const order = {
            qty           : qty,
            amount        : qty * orderItem.dataValues.price,
            status        : status,
            payment_method: payment_method,
            confirm_payment: confirm_payment
        }

        await Orders.create(order)
        .then(() => {
            res.status(201).send({
                status: "201",
                message: "Added order is successfully"
            })
        })
    .catch (err => next(err)); 
}

controller.getOrderById = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Orders.findByPk(id)
        .then(results => {
            if (results) {
                res.send(results);
            } else {throw {error: `Cannot find Order with id`}};
        });
    } catch (err) {
        next(err)
    }
}

controller.updateOrder = async (req, res, next) => {
    try {
        const orderItem = await Items.findOne({
            where: {
                 id: req.body.item_id
            }
        })
        const order = {
            qty           : req.body.qty,
            amount        : req.body.qty * orderItem.dataValues.price,
            status        : req.body.status,
            payment_method: req.body.payment_method,
            confirm_payment: req.body.confirm_payment
        }
         await Orders.update(order,{
             where: {
                 id: req.params.id
             }
         });
         
         return res.status(203).json(
            {
                status: "203",                
                message: "Updated Successfully"
            });
    } catch (err){next(err)}
 }

controller.deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Orders.findByPk(id)
        .then(results => {
            if(results) {
                Orders.destroy({
                    where: {
                        id: id
                    }
                })
                .then(() => {
                    res.send({
                        status: 204,
                        message: "Deleted Successfully"
                    });
                })
            } else {throw {error: "Cannot find Order with id"}}
        })

    } catch (err) {next(err)}
    
}

module.exports = controller;