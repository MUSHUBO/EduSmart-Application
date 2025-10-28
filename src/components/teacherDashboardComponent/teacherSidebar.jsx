"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaBook,
  FaPlus,
  FaList,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/Hooks/UseAuth/UseAuth";

export default function TeacherSidebar() {
  const router = useRouter();
  const pathname = usePathname();
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

  const linkClass = (path) =>
    `flex items-center space-x-2 p-2 rounded-md transition-colors ${
      pathname === path
        ? "bg-blue-800 font-bold text-white"
        : "hover:bg-blue-500 text-gray-100"
    }`;

  return (
    <div className="drawer-side">
      <label htmlFor="teacher-drawer" className="drawer-overlay"></label>
      <aside className="menu p-5 w-64 bg-gradient-to-b from-blue-700 to-blue-600 text-white min-h-full flex flex-col justify-between shadow-lg">
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

          {/* Teacher Info */}
          <div className="mb-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white shadow-md">
              <Image
                src={user?.photoURL || "/images/teacher-avatar.png"}
                alt="Teacher Avatar"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <h3 className="mt-2 font-semibold text-lg">{user?.displayName || "Teacher"}</h3>
            <p className="text-sm text-blue-200">Instructor</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-3 text-[15px] font-medium">
            <Link href="/teacher-dashboard" className={linkClass("/teacher-dashboard")}>
              <FaHome />
              <span>Dashboard Home</span>
            </Link>

            {/* Create Course */}
            <Link
              href="/teacher-dashboard/create-course"
              className={linkClass("/teacher-dashboard/create-course")}
            >
              <FaChalkboardTeacher />
              <span>Create Course</span>
            </Link>

            {/* Create Book */}
            <Link
              href="/teacher-dashboard/create-book"
              className={linkClass("/teacher-dashboard/create-book")}
            >
              <FaPlus />
              <span>Create Book</span>
            </Link>

            {/* My Created Courses */}
            <Link
              href="/teacher-dashboard/my-courses"
              className={linkClass("/teacher-dashboard/my-courses")}
            >
              <FaList />
              <span>My Created Courses</span>
            </Link>

            {/* My Created Books */}
            <Link
              href="/teacher-dashboard/my-books"
              className={linkClass("/teacher-dashboard/my-books")}
            >
              <FaBook />
              <span>My Created Books</span>
            </Link>

            {/* Settings */}
            <Link
              href="#"
              className={linkClass("/teacher-dashboard/settings")}
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
