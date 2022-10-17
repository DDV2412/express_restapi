const custAddressRouter = require('express').Router();
const custAddressController = require('../controller/custAddressControllers');

custAddressRouter.post('/create',custAddressController.create);
custAddressRouter.get('/:cus_id', custAddressController.findAll);
custAddressRouter.get('/:id', custAddressController.findOne);
custAddressRouter.put('/', custAddressController.update);
custAddressRouter.get('/:id', custAddressController.delById)

module.exports = custAddressRouter;