"use client";
import AdminSidebar from "@/components/adminDashboard-components/AdminSidebar";
import AdminProvider from "@/components/DashBoardProvider/AdminProvider";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";
import { FaBell, FaSearch } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <AdminProvider>
      <div className="drawer lg:drawer-open min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        {/* Drawer Toggle for Mobile */}
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

        {/* Page Content */}
        <div className="drawer-content flex flex-col">
          {/* ===== Navbar ===== */}
          <header className="flex items-center justify-between px-6 py-4 shadow bg-white dark:bg-black border-b border-[var(--accent)] sticky top-0 z-20">
            {/* Sidebar Toggle Button (Mobile) */}
            <label
              htmlFor="admin-drawer"
              className="btn btn-ghost lg:hidden text-[var(--primary)] text-xl"
            >
              ☰
            </label>

            {/* Search Bar */}
            <div className="flex items-center bg-[var(--muted)] px-3 py-2 rounded-full w-1/2 md:w-1/3 focus-within:ring-2 focus-within:ring-[var(--primary)] transition">
              <FaSearch className="text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none px-2 text-sm flex-1 text-[var(--foreground)]"
              />
            </div>

            {/* Notifications + Profile */}
            <div className="flex items-center space-x-5">
              <button className="relative text-[var(--foreground)] hover:text-[var(--primary)] transition">
                <FaBell size={18} />
                <span className="absolute -top-2 -right-2 bg-[var(--secondary)] text-white text-[10px] px-1 rounded-full">
                  3
                </span>
              </button>

              <div className="flex items-center gap-3">
                <Image
                  height={40}
                  width={40}
                  src={user?.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-[var(--primary)] object-cover"
                />
                <span className="hidden sm:block font-medium text-[var(--foreground)]">
                  {user?.displayName || "Admin"}
                </span>
              </div>
            </div>
          </header>

          {/* ===== Main Content ===== */}
          <main className="flex-1 p-6 bg-[var(--accent)] min-h-screen">
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-md p-6 border border-[var(--accent-foreground)]">
              {children}
            </div>
          </main>
        </div>

        {/* ===== Sidebar ===== */}
        <AdminSidebar />
      </div>
    </AdminProvider>

  );
}
