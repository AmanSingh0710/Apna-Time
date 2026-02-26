"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-2xl text-center">
        <h1 className="text-5xl font-bold text-white mb-6">🏨 Welcome to Hotel Management</h1>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
