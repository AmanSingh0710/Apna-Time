//src/components/HotelForm.js
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function HotelForm({ token, onSuccess }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location) {
      setError("Name and Location are required");
      toast.error("Name and Location are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ name, location, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add hotel");
      }

      toast.success("Hotel added successfully");
      setName("");
      setLocation("");
      setDescription("");
      setError("");

      if (onSuccess) onSuccess(data);

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg flex flex-col gap-4 text-black"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Add Hotel
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <input
        type="text"
        placeholder="Hotel Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        rows={4}
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-colors"
      >
        Add Hotel
      </button>
    </form>
  );
}
