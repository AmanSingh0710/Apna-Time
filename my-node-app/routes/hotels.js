const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { auth, authorize } = require('../middleware/auth');


router.post('/', auth, authorize('admin','receptionist'), hotelController.createHotel);
router.get('/', hotelController.getHotels);
router.get('/:id', hotelController.getHotel);
router.put('/:id', auth, authorize('admin','receptionist'), hotelController.updateHotel);
router.delete('/:id', auth, authorize('admin'), hotelController.deleteHotel);


module.exports = router;