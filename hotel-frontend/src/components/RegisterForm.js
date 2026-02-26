// src/components/RegisterForm.js
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createGuest } from "../lib/api"; // Backend register API
import toast from "react-hot-toast"; 

export default function RegisterForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest"); // default role
  const [error, setError] = useState("");
  const { login } = useAuth();

  // Hydration safe: no server-side dynamic values
  useEffect(() => {
    if (!role) setRole("guest");
  }, []);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email");
      toast.error("Invalid email");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Phone must be 10 digits");
      toast.error("Phone must be 10 digits");
      return;
    }

    try {
      const userData = await createGuest({ name, email, phone, password, role });
      login(userData); // auto login after registration
      toast.success("Registration successful!");
      onSuccess && onSuccess();
      setError("");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Registration failed");
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto flex flex-col gap-4"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Register
      </h2>

      {error && <p className="text-red-500 text-center font-medium">{error}</p>}

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        required
      />

      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        required
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        required
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        required
      />

      {/* Role selection */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      >
        <option value="guest">Guest</option>
        <option value="admin">Admin</option>
        <option value="receptionist">Receptionist</option>
      </select>

      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:from-pink-500 hover:to-purple-500 transition-colors duration-300"
      >
        Register
      </button>

      <p className="text-center text-gray-400 mt-4 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-purple-500 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
}
