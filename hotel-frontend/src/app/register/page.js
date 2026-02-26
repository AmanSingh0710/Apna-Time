//src/app/register/page.js
"use client";
import { useRouter } from "next/navigation";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  return <RegisterForm onSuccess={() => router.push("/user")} />;
}
