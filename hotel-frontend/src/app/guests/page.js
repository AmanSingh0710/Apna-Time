//src/app/guests/page.js
"use client"
import { useEffect, useState } from "react";
import { fetchGuests } from "../lib/api";


export default function Guests() {
   const { user } = useAuth();
  const router = useRouter();


   useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role === "guest") {
      router.push("/user"); // ✅ guests go here instead
    }
  }, [user, router]);

  if (!user || user.role === "guest") return null;

  return (
    <div>
      <h1>Guests</h1>
      <GuestForm onSuccess={loadGuests} />
      <ul>
        {guests.map(guest => (
          <li key={guest._id}>
            {guest.name} - {guest.email} - {guest.phone} - Room {guest.roomNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}
