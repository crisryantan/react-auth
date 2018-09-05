var router = require('express').Router();
var UserCtrl = require('../controllers/user-controller');

/**
 * User routes
 */

router.post('/login', UserCtrl.login);
router.post('/signup', UserCtrl.create);
router.post('/verifyToken', UserCtrl.verifyToken);
router.get('/allUsers', UserCtrl.findAll);
router.put('/user/update/:id', UserCtrl.updateById);
router.get('/user/:id', UserCtrl.findById);
router.delete('/user/:id', UserCtrl.deleteById);

module.exports = router;
