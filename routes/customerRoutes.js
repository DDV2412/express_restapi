const customerRouter = require('express').Router();
const customerController = require('../controller/customerControllers')


customerRouter.get('/', customerController.getAll);
customerRouter.get('/:id', customerController.getById);
customerRouter.post('/register', customerController.register);
customerRouter.put('/password',customerController.updatePass);
customerRouter.post('/login', customerController.login);
customerRouter.delete('/:id', customerController.delById);

module.exports = customerRouter;