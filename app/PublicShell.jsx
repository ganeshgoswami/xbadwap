"use client";
import { usePathname } from "next/navigation";
import UserNavbar from "./components/UserNavbar.jsx";
import Footer from "./components/Footer.jsx";

export default function PublicShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return children;

  return (
    <>
      <UserNavbar />
      {children}
      <Footer />
    </>
  );
}
