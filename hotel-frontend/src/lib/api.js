//src/lib/api.js
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:8080/api";

// Helper for handling response
const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    toast.error(data.message || "API Error"); // show error toast
    throw new Error(data.message || "API Error");
  }
  return data;
};

// login
export async function loginUser(email, password) {
  const res = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text(); // Read raw response

  try {
    const data = JSON.parse(text); // Try to parse as JSON
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data; // { user, token }
  } catch {
    throw new Error("Server did not return valid JSON:\n" + text);
  }
}

// Rooms
export const fetchRooms = async () => {
  try {
    const res = await fetch(`${BASE_URL}/rooms`);
    const data = await handleResponse(res);
    return data;
  } catch (err) {
    console.error(err);
    toast.error(err.message);
    throw err;
  }
};

export async function addRoom(roomData, token) {
  const res = await fetch("http://localhost:8080/api/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
    },
    body: JSON.stringify(roomData),
  });

  const text = await res.text(); // Read raw response

  try {
    const data = JSON.parse(text);
    if (!res.ok) {
      throw new Error(data.message || "Failed to add room");
    }
    return data; // JSON from backend
  } catch {
    throw new Error("Server did not return valid JSON:\n" + text);
  }
}

// Guests
export const fetchGuests = async () => {
  try {
    const res = await fetch(`${BASE_URL}/guests`);
    const data = await handleResponse(res);
    return data;
  } catch (err) {
    console.error(err);
    toast.error(err.message);
    throw err;
  }
};

export const createGuest = async (guest) => {
  try {
    const res = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...guest, role: "guest" }),
    });
    const data = await handleResponse(res);
    toast.success("Guest registered successfully!");
    return data;
  } catch (err) {
    console.error(err);
    toast.error(err.message);
    throw err;
  }
};

// Bookings
export const fetchBookings = async () => {
  try {
    const res = await fetch(`${BASE_URL}/bookings`);
    const data = await handleResponse(res);
    return data;
  } catch (err) {
    console.error(err);
    toast.error(err.message);
    throw err;
  }
};

export const createBooking = async (booking) => {
  try {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    const data = await handleResponse(res);
    toast.success("Booking created successfully!");
    return data;
  } catch (err) {
    console.error(err);
    toast.error(err.message);
    throw err;
  }
};
