"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaUser,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBookOpen,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "All Users", href: "/admin-dashboard/allUsers", icon: <FaUser /> },
    { name: "All Students", href: "/admin-dashboard/allStudents", icon: <FaUserGraduate /> },
    { name: "All Teachers", href: "/admin-dashboard/all-teachers", icon: <FaChalkboardTeacher /> },
    { name: "All Courses", href: "/admin-dashboard/all-courses", icon: <FaBookOpen /> },
    { name: "All Books", href: "/admin-dashboard/all-books", icon: <FaBook /> },
    // { name: "All Events", href: "#", icon: <FaCalendarAlt /> },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="drawer-side">
      <label htmlFor="admin-drawer" className="drawer-overlay"></label>

      <aside
        className="menu p-6 w-64 min-h-full flex flex-col justify-between
        bg-[var(--background)] text-[var(--foreground)] border-r border-[var(--accent)] shadow-lg"
      >
        {/* ===== Logo ===== */}
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-10">
            <Image
              src="/images/eduSmart.png"
              alt="logo"
              width={160}
              height={60}
              className="w-auto h-auto"
            />
          </Link>

          {/* ===== Navigation ===== */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-base transition-all duration-300
                  ${
                    isActive(item.href)
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
                      : "hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* ===== Logout Button ===== */}
        <button
          className="flex items-center space-x-2 mt-6 text-[var(--secondary)] hover:text-[var(--primary)]
          transition-colors duration-300 font-semibold text-lg"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>
    </div>
  );
}
