"use client";

import TeacherProvider from "@/components/DashBoardProvider/TeacherProvider";
import TeacherSidebar from "@/components/teacherDashboardComponent/teacherSidebar";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";
import { FaBell, FaSearch } from "react-icons/fa";

function TeacherLayout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    // <TeacherProvider>
    //    </TeacherProvider>
      <div className="drawer lg:drawer-open">
        {/* Drawer toggle for mobile */}
        <input id="teacher-drawer" type="checkbox" className="drawer-toggle" />

        {/* Page Content */}
        <div className="drawer-content flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
          {/* Top Navbar */}
          <header className="flex items-center justify-between bg-[var(--primary)] px-4 py-3 shadow-md sticky top-0 z-20 text-[var(--primary-foreground)]">
            {/* Left: Mobile menu button */}
            <label
              htmlFor="teacher-drawer"
              className="btn btn-ghost btn-sm lg:hidden text-[var(--primary-foreground)]"
            >
              ☰
            </label>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-[var(--accent)] bg-opacity-20 px-3 py-2 rounded-full w-1/3 focus-within:ring-2 focus-within:ring-[var(--accent)] transition">
              <FaSearch className="text-[var(--accent-foreground)]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none px-2 text-sm flex-1 text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
              />
            </div>

            {/* Right side: notifications + profile */}
            <div className="flex items-center space-x-4">
              {/* Notification */}
              <button className="relative text-[var(--primary-foreground)] hover:text-[var(--secondary)] transition">
                <FaBell size={18} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-2">
                <Image
                  height={40}
                  width={40}
                  src={user?.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[var(--accent)]"
                />
                <span className="font-medium hidden sm:block text-[var(--primary-foreground)]">
                  {user?.displayName || "Teacher"}
                </span>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 bg-[var(--muted)] bg-opacity-5 min-h-screen rounded-t-3xl shadow-inner">
            {children}
          </main>
        </div>

        {/* Sidebar */}
        <TeacherSidebar />
      </div>

  );
}

export default TeacherLayout;
