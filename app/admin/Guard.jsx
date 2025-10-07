"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AdminContext } from "../providers/AdminContext";

export default function AdminGuard({ children }) {
  const { admin } = useContext(AdminContext);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("adminlogin");
    if (!admin && !stored) {
      router.replace("/admin/login");
    }
  }, [admin, router]);

  return children;
}
