"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { addRoom } from "../lib/api";

export default function RoomForm({ hotel, onSuccess }) {
  const { user, token } = useAuth();
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  // Only admins can add/edit rooms
  if (!user || user.role !== "admin") return null;

  // ✅ Payload matching backend schema
    const payload = {
      number: Number(roomNumber),
      hotel: hotel,           // must be hotel ID
      type: type.toLowerCase(), // enum: single, double, suite
      price: Number(price),
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRoom(payload, token);
      toast.success("Room added successfully!");
      setRoomNumber("");
      setPrice("");
      setType("single");
      onSuccess && onSuccess();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 text-black border p-4 rounded-lg shadow-sm bg-gray-50"
    >
      <h3 className="font-semibold text-lg mb-2">Add Room to {hotel.name}</h3>
     <input
        type="number"
        placeholder="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border rounded"
        required
      >
        <option value="single">Single</option>
        <option value="double">Double</option>
        <option value="suite">Suite</option>
      </select>
      
     <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Add Room
      </button>
    </form>
  );
}
