var router = require('express').Router();
var UserCtrl = require('../controllers/user-controller');

/**
 * User routes
 */
router.get('/allUsers', UserCtrl.findAll);
router.post('/login', UserCtrl.login);
router.post('/signup', UserCtrl.create);
router.put('/user/update/:id', UserCtrl.updateById);
router.get('/user/:id', UserCtrl.findById);
router.delete('/user/:id', UserCtrl.deleteById);

module.exports = router;
