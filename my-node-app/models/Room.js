const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
number: { type: String, required: true },
type: { type: String, enum: ['single','double','suite'], default: 'single' },
price: { type: Number, required: true },
amenities: [{ type: String }],
status: { type: String, enum: ['available','booked','maintenance'], default: 'available' },
createdAt: { type: Date, default: Date.now }
});


roomSchema.index({ hotel: 1, number: 1 }, { unique: true });


module.exports = mongoose.model('Room', roomSchema);