// controllers/bookingController.js
// controllers/bookingController.js
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { guestId, roomId, hotelId, checkIn, checkOut } = req.body;

    // Validate required fields
    if (!guestId || !roomId || !hotelId || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Check if room is available for the selected dates
    const overlapping = await Booking.findOne({
      room: roomId,
      status: 'active',
      $or: [
        { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $lte: new Date(checkOut), $gt: new Date(checkIn) } },
        { checkIn: { $lte: new Date(checkIn) }, checkOut: { $gte: new Date(checkOut) } }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ message: 'Room not available for selected dates' });
    }

    // Calculate total price
    const nights = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = nights * room.price;

    // Create booking
    const booking = await Booking.create({
      user: guestId,
      hotel: hotelId,
      room: roomId,
      checkIn,
      checkOut,
      totalPrice
    });

    // Optional: mark room as booked if you want simple status
    room.status = 'booked';
    await room.save();

    res.status(201).json(booking);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings (admin/receptionist)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user hotel room');
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user hotel room');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();

    // Free the room
    const room = await Room.findById(booking.room);
    if (room) {
      room.status = 'available';
      await room.save();
    }

    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
