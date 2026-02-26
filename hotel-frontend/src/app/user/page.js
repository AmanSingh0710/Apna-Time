//src/app/user/page.js
"use client";
import UserBooking from "../../components/UserBooking";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserBookingPage() {
  const { user , loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "guest" && user.role !== "user") {
        router.push("/admin"); // admins redirected
      }
    }
  }, [user, loading, router]);

  if (!user || loading) return null;

  return <UserBooking />;
}
