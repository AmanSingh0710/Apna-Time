const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/rooms");
const hotelRoutes = require("./routes/hotels");

// Load env variables
dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

app.use("/api", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/hotels", hotelRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});