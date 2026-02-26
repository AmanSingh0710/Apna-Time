const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
name: { type: String, required: true, trim: true, minlength: [2, "Name must be at least 2 characters long"], },

email: { type: String, required: true, unique: true, lowercase: true, trim: true,
     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email",],
},

password: { type: String, required: true ,  minlength: [6, "Password must be at least 6 characters"], },

phone: { type: String,required: [true, "Phone number is required"],unique: true,
    match: [/^[0-9]{10}$/,"Please enter a valid 10-digit phone number",],
},

role: { type: String, enum: ['admin','receptionist','guest'], default: 'guest' },

createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);