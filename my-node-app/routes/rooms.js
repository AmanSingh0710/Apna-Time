//routes/room.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { auth, authorize } = require('../middleware/auth');

// POST /api/rooms          → Create a new room
router.post('/', auth, authorize('admin','receptionist'), roomController.createRoom);

// GET /api/rooms/hotel/:hotelId  → Get rooms by hotel
router.get('/hotel/:hotelId', roomController.getRoomsByHotel);

// GET /api/rooms/:id       → Get a single room
router.get('/:id', roomController.getRoom);

// PUT /api/rooms/:id       → Update a room
router.put('/:id', auth, authorize('admin','receptionist'), roomController.updateRoom);

// DELETE /api/rooms/:id    → Delete a room
router.delete('/:id', auth, authorize('admin'), roomController.deleteRoom);

module.exports = router;

