const Hotel = require('../models/Hotel');


exports.createHotel = async (req, res) => {
const hotel = await Hotel.create(req.body);
res.status(201).json(hotel);
};


exports.getHotels = async (req, res) => {
const hotels = await Hotel.find();
res.json(hotels);
};


exports.getHotel = async (req, res) => {
const hotel = await Hotel.findById(req.params.id);
if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
res.json(hotel);
};


exports.updateHotel = async (req, res) => {
const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
res.json(hotel);
};


exports.deleteHotel = async (req, res) => {
const hotel = await Hotel.findByIdAndDelete(req.params.id);
if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
res.json({ message: 'Hotel deleted' });
};