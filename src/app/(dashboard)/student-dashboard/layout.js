"use client";
import StudentProvider from "@/components/DashBoardProvider/StudentProvider";
import StudentSidebar from "@/components/studentDashboard/StudentSidebar";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";
import { FaBell, FaSearch } from "react-icons/fa";

function StudentLayout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle for mobile */}
      <input id="user-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-[var(--background)] px-6 py-4 shadow-md sticky top-0 z-20 border-b border-[var(--accent)]">
          {/* Mobile menu button */}
          <label
            htmlFor="user-drawer"
            className="btn btn-ghost btn-sm lg:hidden text-[var(--muted-foreground)]"
          >
            ☰
          </label>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-[var(--secondary)] px-4 py-2 rounded-full w-1/3 transition-all hover:bg-[var(--accent)]">
            <FaSearch className="text-[var(--muted-foreground)] mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-2 text-sm flex-1 text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
            />
          </div>

          {/* Right side: notifications + profile */}
          <div className="flex items-center space-x-4">
            <button className="relative text-[var(--muted-foreground)] hover:text-[var(--primary)] transition">
              <FaBell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <div className="flex items-center space-x-2">
              <Image
                height={40}
                width={40}
                src={user?.photoURL || "/default-avatar.png"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary)] shadow-sm"
              />
              <span className="text-[var(--foreground)] font-medium hidden sm:block">
                {user?.displayName || "Student"}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-[var(--background)] min-h-screen transition-colors">
          {children}
        </main>
      </div>

      {/* Sidebar / Drawer */}
      <StudentSidebar />
    </div>
  );
}

export default StudentLayout;
