const Room = require('../models/Room');


exports.createRoom = async (req, res) => {
const room = await Room.create(req.body);
res.status(201).json(room);
};


exports.getRoomsByHotel = async (req, res) => {
const rooms = await Room.find({ hotel: req.params.hotelId });
res.json(rooms);
};


exports.getRoom = async (req, res) => {
const room = await Room.findById(req.params.id).populate('hotel');
if (!room) return res.status(404).json({ message: 'Room not found' });
res.json(room);
};


exports.updateRoom = async (req, res) => {
const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!room) return res.status(404).json({ message: 'Room not found' });
res.json(room);
};


exports.deleteRoom = async (req, res) => {
const room = await Room.findByIdAndDelete(req.params.id);
if (!room) return res.status(404).json({ message: 'Room not found' });
res.json({ message: 'Room deleted' });
};