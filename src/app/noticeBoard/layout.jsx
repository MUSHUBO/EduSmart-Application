"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Bell,
  Clock,
  FileText,
  BookOpen,
  CalendarDays,
  Umbrella,
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
  { name: "Academic", href: "/noticeBoard/academic", icon: CalendarDays },
  { name: "Holiday List", href: "/noticeBoard/holidays", icon: Umbrella },
  { name: "Sports & Play", href: "/noticeBoard/sports", icon: Volleyball },
  { name: "Cultural Function", href: "/noticeBoard/cultural", icon: Music },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[var(--background)] mt-4 ">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full bg-white dark:bg-[var(--muted)] border-r shadow-lg transition-all duration-300 w-20 lg:w-64">
    
        <nav className="flex-1 p-4  lg:p-4 lg:py-8 lg:mt-7 space-y-1 lg:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 font-medium transition
                  ${isActive
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"}
                  md:justify-center lg:justify-start`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden lg:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <>
          <aside className="fixed inset-0 z-50 w-64 bg-white dark:bg-[var(--muted)] border-r shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              
              <button onClick={() => setOpen(false)} className="text-gray-600">
                <X />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition
                      ${isActive
                        ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                        : "text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"}`}
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        </>
      )}

      {/* Main Content */}
      <main className="ml-0 md:ml-20 lg:ml-64 p-4 md:p-6 transition-all duration-300">
        {/* Mobile toggle button */}
        <button
          className="md:hidden mb-4 text-gray-600"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>

        {children}
      </main>
    </div>
  );
}
