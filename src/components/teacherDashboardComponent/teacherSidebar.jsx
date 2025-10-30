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
    `flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-base transition-all duration-300 ${
      pathname === path
        ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
        : "hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
    }`;

  return (
    <div className="drawer-side">
      <label htmlFor="teacher-drawer" className="drawer-overlay"></label>
      <aside
        className="menu p-6 w-64 min-h-full flex flex-col justify-between
          bg-[var(--background)] text-[var(--foreground)] border-r border-[var(--accent)] shadow-lg"
      >
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mb-10">
            <Image
              src="/images/eduSmart.png"
              alt="logo"
              width={160}
              height={60}
              className="w-auto h-auto"
            />
          </Link>

          {/* Teacher Info */}
          <div className="mb-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-[var(--primary)] shadow-md">
              <Image
                src={user?.photoURL || "/images/teacher-avatar.png"}
                alt="Teacher Avatar"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <h3 className="mt-2 font-semibold text-lg">{user?.displayName || "Teacher"}</h3>
            <p className="text-sm text-[var(--secondary)]">Instructor</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link href="/teacher-dashboard" className={linkClass("/teacher-dashboard")}>
              <FaHome />
              <span>Dashboard Home</span>
            </Link>
            <Link
              href="/teacher-dashboard/create-course"
              className={linkClass("/teacher-dashboard/create-course")}
            >
              <FaChalkboardTeacher />
              <span>Create Course</span>
            </Link>
            <Link
              href="/teacher-dashboard/create-book"
              className={linkClass("/teacher-dashboard/create-book")}
            >
              <FaPlus />
              <span>Create Book</span>
            </Link>
            <Link
              href="/teacher-dashboard/my-courses"
              className={linkClass("/teacher-dashboard/my-courses")}
            >
              <FaList />
              <span>My Created Courses</span>
            </Link>
            <Link
              href="/teacher-dashboard/my-books"
              className={linkClass("/teacher-dashboard/my-books")}
            >
              <FaBook />
              <span>My Created Books</span>
            </Link>
            {/* <Link href="#" className={linkClass("/teacher-dashboard/settings")}>
              <FaCog />
              <span>Settings</span>
            </Link> */}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            if (confirm("Are you sure you want to log out?")) logoutHandler();
          }}
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
