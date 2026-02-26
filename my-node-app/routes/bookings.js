//MY-NODE-APP/routes/bookings.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth, authorize } = require('../middleware/auth');


router.post('/', auth, authorize('guest','receptionist','admin'), bookingController.createBooking);
router.get('/', auth, authorize('admin','receptionist'), bookingController.getBookings);
router.get('/:id', auth, bookingController.getBooking);
router.post('/:id/cancel', auth, bookingController.cancelBooking);


module.exports = router;