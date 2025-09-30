import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUtensils,
} from "react-icons/fa";

function AdminLayout({ children }) {
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle for mobile */}
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white p-4 shadow">
          {/* Left: Mobile menu button */}
          <label
            htmlFor="admin-drawer"
            className="btn btn-ghost lg:hidden text-gray-600"
          >
            ☰
          </label>

          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full w-1/2 md:w-1/3">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-2 text-sm flex-1"
            />
          </div>

          {/* Right side: notifications + profile */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <FaBell size={18} />
            </button>
            <div className="flex items-center space-x-2">
              <Image
                height={40}
                width={40}
                src="/images/events/01 (2).jpg"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-gray-700 font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>

      {/* Sidebar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <aside className="menu p-5 w-64 bg-blue-600 text-white min-h-full flex flex-col justify-between">
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <Image
                src="/images/eduSmart.png"
                alt="logo"
                width={150}
                height={50}
                className="w-auto h-auto"
              />
            </Link>

            <nav className="space-y-3">
              <Link href="#" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md">
                <FaHome />
                <span>Dashboard</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md">
                <FaUserGraduate />
                <span>Students</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md">
                <FaChalkboardTeacher />
                <span>Teachers</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md">
                <FaCalendarAlt />
                <span>Events</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md">
                <FaUtensils />
                <span>Food</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md">
                <FaCog />
                <span>Settings</span>
              </Link>
            </nav>
          </div>

          <button className="flex items-center space-x-2 text-red-200 hover:text-red-400 mt-6">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </aside>
      </div>
    </div>
  );
}

export default AdminLayout;
