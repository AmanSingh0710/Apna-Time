//src/components/BookingForm.js

"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { bookRoom } from "../lib/api";

export default function BookingForm({ room, onSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Only guests/users can book rooms
  if (!user || (user.role !== "guest" && user.role !== "user")) return null;

  const handleBooking = async () => {
    setLoading(true);
    try {
      await bookRoom({ roomId: room._id, userId: user._id });
      toast.success(`Room ${room.roomNumber} booked successfully`);
      onSuccess && onSuccess();
    } catch (err) {
      toast.error(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBooking}
      disabled={loading}
      className="mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
    >
      {loading ? "Booking..." : "Book Room"}
    </button>
  );
}
