//src/app/rooms/page.js
"use client";
import { useEffect, useState } from "react";
import { fetchRooms } from "../../lib/api";
import RoomForm from "../../components/RoomForm";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = await fetchRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Rooms</h1>

      <RoomForm onSuccess={loadRooms} />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Existing Rooms</h2>

      {loading && <p>Loading rooms...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {rooms.map((room) => (
            <div key={room._id} className="p-4 border border-gray-300 rounded-xl shadow-sm flex flex-col gap-2">
              <p><strong>Room Number:</strong> {room.roomNumber}</p>
              <p><strong>Type:</strong> {room.type}</p>
              <p><strong>Price:</strong> ${room.price}</p>
              <BookingForm room={room} onSuccess={loadRooms} />
            </div>
          ))}
      </div>
    </div>
  );
}
