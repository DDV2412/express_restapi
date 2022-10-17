const controller = require('../controller/OrderController');
const router = require('express').Router();
const { authentication, authorization } = require('../middleware/auth');

router.use(authentication);
// router.get('/orders', authorization.Customers , controller.getAll);
router.post('/addOrders', controller.addOrder);
router.get('/orders/:id', controller.getOrderById);
router.put('/orders/:id',  controller.updateOrder);
router.delete('/orders/:id', controller.deleteOrder);


module.exports = router;