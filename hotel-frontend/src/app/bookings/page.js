//src/app/booking/page.js
"use client"
import { useEffect, useState } from "react";
import { fetchBookings } from "../lib/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const data = await fetchBookings();
    setBookings(data);
  };

  useEffect(() => { loadBookings(); }, []);

  return (
    <div>
      <h1>Bookings</h1>
      <BookingForm onSuccess={loadBookings} />
      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            Guest ID: {b.guestId} - Room ID: {b.roomId}
          </li>
        ))}
      </ul>
    </div>
  );
}
