//src/components/GuestForm,js
"use client";
import { useState } from "react";
import { createGuest } from "../lib/api";
import toast from "react-hot-toast"; 

export default function GuestForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGuest({
        name,
        email,
        phone,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        roomNumber,
      });

      toast.success("Guest added successfully!"); // <-- success toast

      setName("");
      setEmail("");
      setPhone("");
      setCheckIn("");
      setCheckOut("");
      setRoomNumber("");

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add guest"); // <-- error toast
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1576671087406-0293beacb353?auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Guest
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />

          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />

          <input
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-4 rounded-xl hover:from-blue-500 hover:to-green-400 transition-colors duration-300"
          >
            Add Guest
          </button>
        </form>
      </div>
    </div>
  );
}
