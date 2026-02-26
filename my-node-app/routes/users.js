// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, authorize } = require('../middleware/auth');


router.get('/', auth, authorize('admin'), userController.getAll);
router.get('/:id', auth, userController.getOne);
router.put('/:id', auth, authorize('admin'), userController.update);
router.delete('/:id', auth, authorize('admin'), userController.remove);


module.exports = router;