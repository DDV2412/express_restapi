const customerController = require('../controller/customerControllers')


router.get('/', customerController.getAll);
router.get('/:id', customerController.getById);
router.post('/register', customerController.register);
router.put('/password',customerController.updatePass);
router.post('/login', customerController.login);
router.delete('/:id', customerController.delById);