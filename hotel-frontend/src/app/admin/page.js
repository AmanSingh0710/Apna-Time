//src/app/admin/page.js
"use client";

import { useAuth } from "../../context/AuthContext";
import HotelForm from "../../components/HotelForm";
import RoomForm from "../../components/RoomForm";
import { useState } from "react";

export default function AdminPage() {
  const { user, token, loading } = useAuth();
  const [selectedHotel, setSelectedHotel] = useState(null); // Store the hotel just added

  if (loading) return <p>Loading...</p>;
  if (!user || user.role !== "admin") return <p>Access denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome Admin {user.name}</h1>

      {/* Pass token and onSuccess callback to HotelForm */}
      <HotelForm
        token={token}
        onSuccess={(hotel) => setSelectedHotel(hotel)}
      />

      {/* Render RoomForm only after a hotel is added */}
      {selectedHotel && (
        <div className="mt-8">
          <RoomForm token={token} hotel={selectedHotel} />
        </div>
      )}
    </div>
  );
}
