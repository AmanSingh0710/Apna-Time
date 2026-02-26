const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');


const registerSchema = Joi.object({ name: Joi.string().required(), email: Joi.string().email().required(), password: Joi.string().min(6).required(), phone: Joi.string().length(10).required(), role: Joi.string().valid('admin','receptionist','guest') });
const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });


const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE || '7d' });

//Register
exports.register = async (req, res) => {
    try{
const { error } = registerSchema.validate(req.body);
if (error) return res.status(400).json({ message: error.details[0].message });


const { name, email, password, phone, role } = req.body;
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'Email already registered' });


const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);


const user = await User.create({ name, email, password: hash, phone, role });
res.status(201).json({ user: 
    { id: user._id, 
        name: user.name, 
        email: user.email, 
        phone:user.phone, 
        role: user.role
    }, 
        token: generateToken(user) 
    });
}catch(err){
     console.error("Register Error:", err);
    return res.status(500).json({ message: "Server Error Fialed to Register" });
}
};



//Login
exports.login = async (req, res) => {
    try{
const { error } = loginSchema.validate(req.body);
if (error) return res.status(400).json({ message: error.details[0].message });


const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


res.json({ user: 
    { id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
    }, 
    token: generateToken(user) });
}catch(err){
  console.error("Login failed");
  return res.status(500).json({message : "Internal server failed to Login"});
}
};