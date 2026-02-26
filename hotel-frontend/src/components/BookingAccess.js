//src/components/BookingAccess.js
"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import BookingFormComponent from "./BookingForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BookingAccess() {
  const { user } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!user) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        router.push("/register");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white">
        <p className="text-xl font-semibold">
          You are not logged in. Redirecting to registration...
        </p>
      </div>
    );
  }

  // Callback for BookingForm to show toast
  const handleBookingSuccess = () => {
    toast.success("Booking added successfully!");
  };

  const handleBookingError = () => {
    toast.error("Failed to add booking.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl">
        
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
            alt="Hotel Booking"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Book a Room
          </h2>
          <BookingFormComponent />
        </div>
      </div>
    </div>
  );
}
