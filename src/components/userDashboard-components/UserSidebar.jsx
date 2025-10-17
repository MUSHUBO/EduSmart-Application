"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/Hooks/UseAuth/UseAuth"; // make sure you have this

export default function UserSidebar() {
  const router = useRouter();
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
            {/* Dashboard */}
            <Link
              href="/dashboard/user-dashboard"
              className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md transition-colors"
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>

            {/* Explore Courses */}
            <details className="group">
              <summary className="flex items-center justify-between hover:bg-blue-500 p-2 rounded-md cursor-pointer">
                <div className="flex items-center space-x-2">
                  <FaBook />
                  <span>Courses</span>
                </div>
                <FaChevronRight className="transition-transform group-open:rotate-90" />
              </summary>
              <div className="pl-6 mt-2 flex flex-col space-y-2">
                <Link
                  href="/user-dashboard/all-courses"
                  className="flex items-center space-x-2 hover:text-gray-200"
                >
                  <FaList size={14} />
                  <span>All Courses</span>
                </Link>

                <Link
                  href="/user-dashboard/enrolled"
                  className="flex items-center space-x-2 hover:text-gray-200"
                >
                  <FaBook size={14} />
                  <span>My Enrolled</span>
                </Link>

                <Link
                  href="/user-dashboard/favorites"
                  className="flex items-center space-x-2 hover:text-gray-200"
                >
                  <FaHeart size={14} />
                  <span>Wishlist</span>
                </Link>

                <Link
                  href="/user-dashboard/become-student"
                  className="flex items-center space-x-2 hover:text-gray-200"
                >
                  <FaPlus size={14} />
                  <span>Become a Student</span>
                </Link>
              </div>
            </details>

            {/* Special Access */}
            <details className="group">
              <summary className="flex items-center justify-between hover:bg-blue-500 p-2 rounded-md cursor-pointer">
                <div className="flex items-center space-x-2">
                  <FaGift />
                  <span>Special Access</span>
                </div>
                <FaChevronRight className="transition-transform group-open:rotate-90" />
              </summary>
              <div className="pl-6 mt-2 flex flex-col space-y-2">
                <Link
                  href="/user-dashboard/certificates"
                  className="flex items-center space-x-2 hover:text-gray-200"
                >
                  <FaCertificate size={14} />
                  <span>Certificates</span>
                </Link>

                <Link
                  href="/user-dashboard/profile"
                  className="flex items-center space-x-2 hover:text-gray-200"
                >
                  <FaUser size={14} />
                  <span>My Profile</span>
                </Link>
              </div>
            </details>

            {/* Assignments */}
            <Link
              href="/user-dashboard/assignments"
              className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md transition-colors"
            >
              <FaTasks />
              <span>Assignments</span>
            </Link>

            {/* Events */}
            <Link
              href="/user-dashboard/events"
              className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md transition-colors"
            >
              <FaCalendarAlt />
              <span>Events</span>
            </Link>

            {/* Settings */}
            <Link
              href="/user-dashboard/settings"
              className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md transition-colors"
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
