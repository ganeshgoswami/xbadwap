import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function AdminIndex() {
  // Server-side redirect so hitting /admin goes straight to the login page.
  redirect("/admin/login");
}
