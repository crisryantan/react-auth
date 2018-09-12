const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');

// Extract methods from user ctrl
const {
  login,
  create,
  verify,
  findAll,
  updateById,
  findById,
  deleteById
} = require('../controllers/user');

/**
 * User routes
 */

router.post('/login', login);
router.post('/signup', create);
router.post('/verifyToken', authMiddleware, verify);
router.get('/allUsers', authMiddleware, findAll);
router.put('/user/update/:id', authMiddleware, updateById);
router.get('/user/:id', authMiddleware, findById);
router.delete('/user/:id', authMiddleware, deleteById);

module.exports = router;
