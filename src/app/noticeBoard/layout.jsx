"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Clock,
  FileText,
  BookOpen,
  CalendarDays,
  Umbrella,
  Newspaper,
  Volleyball,
  Music,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Notice Board", href: "/noticeBoard", icon: LayoutDashboard },
  { name: "All Notices", href: "/noticeBoard/all-notice", icon: Bell },
  { name: "Class Routine", href: "/noticeBoard/class-routine", icon: Clock },
  { name: "Exam Routine", href: "/noticeBoard/exam", icon: FileText },
  { name: "Administration", href: "/noticeBoard/administration", icon: BookOpen },
  { name: "Academic Calendar", href: "/noticeBoard/academic-calendar", icon: CalendarDays },
  { name: "Academic ", href: "/noticeBoard/academic", icon: CalendarDays },
  { name: "Holiday List", href: "/noticeBoard/holidays", icon: Umbrella },
 
  { name: "Sports & Play", href: "/noticeBoard/sports", icon: Volleyball },
  { name: "Cultural Function", href: "/noticeBoard/cultural", icon: Music },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-20"
        } bg-white dark:bg-[var(--muted)] border-r shadow-lg flex flex-col transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2
            className={`font-bold text-xl text-[var(--primary)] ${
              !open && "hidden"
            }`}
          >
            Digital Notice Board
          </h2>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition 
                  ${
                    isActive
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {open && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
