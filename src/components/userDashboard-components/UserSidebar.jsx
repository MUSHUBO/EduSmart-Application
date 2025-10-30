"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaBook,
  FaTasks,
  FaCalendarAlt,
  FaCog,
  FaList,
  FaPlus,
  FaSignOutAlt,
  FaChevronRight,
  FaHeart,
  FaCertificate,
  FaUser,
  FaGift,
  FaUserFriends,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/Hooks/UseAuth/UseAuth";


export default function UserSidebar() {
  const router = useRouter();
  const pathname = usePathname(); // <-- Current route
  const { logoutAccount, user } = useAuth();

  const logoutHandler = async () => {
    try {
      await logoutAccount();
      toast.success("Logout Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        theme: "colored",
      });
      router.push("/");
    } catch (error) {
      toast.error(error?.message || "Logout failed", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        theme: "colored",
      });
    }
  };

  // Helper function for active link style
  const linkClass = (path) =>
    `flex items-center space-x-2 p-2 rounded-md transition-colors ${
      pathname === path
        ? "bg-blue-800 font-bold text-white" // active style
        : "hover:bg-blue-500 text-gray-100"
    }`;

  return (
    <div className="drawer-side">
      <label htmlFor="user-drawer" className="drawer-overlay"></label>
      <aside className="menu p-5 w-64 bg-gradient-to-b from-blue-700 to-blue-600 text-white min-h-full flex flex-col justify-between">
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

          {/* Navigation */}
          <nav className="space-y-3 text-[15px] font-medium">
            <Link
              href="/user-dashboard"
              className={linkClass("/user-dashboard")}
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>

            {/* All Courses */}
            <Link
              href="/user-dashboard/all-courses"
              className={`${linkClass("/user-dashboard/all-courses")} text-[17px]`}
            >
              <FaList />
              <span>All Courses</span>
            </Link>

            {/* All Books */}
            <Link
              href="/user-dashboard/all-books"
              className={`${linkClass("/user-dashboard/all-books")} text-[17px]`}
            >
              <FaBook />
              <span>All Books</span>
            </Link>
            {/* Preants */}
            <Link
              href="/user-dashboard/parent-dashboard"
              className={`${linkClass("/user-dashboard/parent-dashboard")} text-[17px]`}
            >
              <FaUser />
              <span>Preants</span>
            </Link>

            {/* Settings */}
            <Link
              href="/user-dashboard/settings"
              className={linkClass("/user-dashboard/settings")}
            >
              <FaCog />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            if (confirm("Are you sure you want to log out?")) logoutHandler();
          }}
          className="flex items-center space-x-2 text-red-200 hover:text-red-400 mt-6 transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>
    </div>
  );
}
