"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function ThemeWrapper() {
  const pathname = usePathname();

  if ((pathname === "/ai_assistant") || (pathname.startsWith("/noticeBoard")) || (pathname.startsWith("/user-dashboard")) || (pathname.startsWith("/admin-dashboard")) || (pathname.startsWith("/teacher-dashboard")) || (pathname.startsWith("/student-dashboard")) ) return null;

  return (
    <>
      <ThemeToggle />
    </>
  );
}
