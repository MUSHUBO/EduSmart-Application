"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function ThemeWrapper() {
  const pathname = usePathname();

  if ((pathname === "/ai_assistant") || (pathname.startsWith("/noticeBoard")) || (pathname.startsWith("/user-dashboard"))) return null;

  return (
    <>
      <ThemeToggle />
    </>
  );
}
