const mongoose = require('mongoose');


const hotelSchema = new mongoose.Schema({
name: { type: String, required: true },
address: { type: String },
city: { type: String },
phone: { type: String },
description: { type: String },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Hotel', hotelSchema);