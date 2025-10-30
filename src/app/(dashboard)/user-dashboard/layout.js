"use client";
import UserProvider from "@/components/DashBoardProvider/UserProvider";
import UserSidebar from "@/components/userDashboard-components/UserSidebar";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";
import { FaBell, FaSearch } from "react-icons/fa";

function UserLayout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    // <UserProvider>

      <div className="drawer lg:drawer-open">
        {/* Drawer toggle for mobile */}
        <input id="user-drawer" type="checkbox" className="drawer-toggle" />

        {/* Page Content */}
        <div className="drawer-content flex flex-col">
          {/* Top Navbar */}
          <header
            className="flex items-center justify-between px-4 py-3 shadow sticky top-0 z-20
            bg-[var(--background)] text-[var(--foreground)] border-b border-[var(--accent)]"
          >
            {/* Left: Mobile menu button */}
            <label
              htmlFor="user-drawer"
              className="btn btn-ghost btn-sm lg:hidden text-[var(--foreground)] hover:text-[var(--primary)]"
            >
              ☰
            </label>

            {/* Search Bar */}
            <div
              className="hidden md:flex items-center px-3 py-2 rounded-full w-1/3
              bg-[var(--secondary)] text-[var(--secondary-foreground)]"
            >
              <FaSearch className="text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none px-2 text-sm flex-1 placeholder-[var(--muted-foreground)]"
              />
            </div>

            {/* Right side: notifications + profile */}
            <div className="flex items-center space-x-4">
              <button className="relative text-[var(--foreground)] hover:text-[var(--primary)] transition">
                <FaBell size={18} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-2">
                <Image
                  height={40}
                  width={40}
                  src={user?.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary)]"
                />
                <span className="font-medium hidden sm:block text-[var(--foreground)]">
                  {user?.displayName || "User"}
                </span>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 bg-[var(--background)]">{children}</main>
        </div>

        {/* Sidebar / Drawer */}
        <UserSidebar />
      </div>
    // </UserProvider>
  );
}

export default UserLayout;
