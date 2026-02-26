// src/components/UserBooking.js

"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserBooking() {
  const { user, token, loading } = useAuth(); // ✅ include loading
  const router = useRouter();

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Redirect if not user or still loading
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "user") {
        router.push("/"); // redirect admins or others
      }
    }
  }, [user, loading, router]);

  // Show a loading state while auth is initializing
  if (loading) return <p>Loading...</p>;
  if (!user || user.role !== "user") return null;

  return <UserBooking />;

  // Fetch hotels
  useEffect(() => {
    if (loading) return; // wait until auth is loaded
    fetch("http://localhost:8080/api/hotels")
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => toast.error("Failed to load hotels"));
  }, [loading]);

  // Fetch rooms for selected hotel
  useEffect(() => {
    if (!selectedHotel) return;

    fetch(`http://localhost:8080/api/rooms?hotel=${selectedHotel}`)
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => toast.error("Failed to load rooms"));
  }, [selectedHotel]);

  // Filter available rooms based on selected dates
  useEffect(() => {
    if (!checkIn || !checkOut || rooms.length === 0) {
      setAvailableRooms([]);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/bookings");
        const bookings = await res.json();

        const filtered = rooms.filter((room) => {
          const overlapping = bookings.some((b) => {
            if (b.room._id !== room._id || b.status !== "active") return false;
            const existingCheckIn = new Date(b.checkIn);
            const existingCheckOut = new Date(b.checkOut);
            const newCheckIn = new Date(checkIn);
            const newCheckOut = new Date(checkOut);

            return (
              (newCheckIn >= existingCheckIn && newCheckIn < existingCheckOut) ||
              (newCheckOut > existingCheckIn && newCheckOut <= existingCheckOut) ||
              (newCheckIn <= existingCheckIn && newCheckOut >= existingCheckOut)
            );
          });
          return !overlapping;
        });

        setAvailableRooms(filtered);
      } catch (err) {
        console.error(err);
        toast.error("Failed to check room availability");
      }
    };

    fetchBookings();
  }, [checkIn, checkOut, rooms]);

  // Calculate total price
  useEffect(() => {
    if (!selectedRoom || !checkIn || !checkOut) {
      setTotalPrice(0);
      return;
    }

    const room = availableRooms.find(r => r._id === selectedRoom);
    if (!room) return;

    const nights = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );
    setTotalPrice(nights * room.price);
  }, [selectedRoom, checkIn, checkOut, availableRooms]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedHotel || !selectedRoom || !checkIn || !checkOut) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: user._id,
          hotel: selectedHotel,
          room: selectedRoom,
          checkIn,
          checkOut,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      toast.success("Room booked successfully!");
      setSelectedHotel("");
      setSelectedRoom("");
      setCheckIn("");
      setCheckOut("");
      setTotalPrice(0);
      setAvailableRooms([]);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading...</p>; // ✅ wait for auth

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleBooking}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Book a Room</h2>

        <select
          value={selectedHotel}
          onChange={(e) => setSelectedHotel(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Select Hotel</option>
          {hotels.map((h) => (
            <option key={h._id} value={h._id}>
              {h.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
          required
        />

        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
          required
          disabled={!availableRooms.length}
        >
          <option value="">Select Room</option>
          {availableRooms.map((r) => (
            <option key={r._id} value={r._id}>
              {r.roomNumber} - {r.type} - ${r.price}/night
            </option>
          ))}
        </select>

        {totalPrice > 0 && (
          <p className="text-center font-semibold text-gray-700">
            Total Price: ${totalPrice}
          </p>
        )}

        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-blue-500 hover:to-green-500 transition-colors"
        >
          Book Room
        </button>
      </form>
    </div>
  );
}
