"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  FaUser,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBookOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/Hooks/UseAuth/UseAuth"; 
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaNotesMedical, FaRegNoteSticky } from "react-icons/fa6";

// SweetAlert2 with React
const MySwal = withReactContent(Swal);

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutAccount } = useAuth(); // Use your auth hook

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

  const handleLogoutClick = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      logoutHandler();
    }
  };

  const menuItems = [
    { name: "All Users", href: "/admin-dashboard/allUsers", icon: <FaUser /> },
    { name: "All Students", href: "/admin-dashboard/allStudents", icon: <FaUserGraduate /> },
    { name: "All Teachers", href: "/admin-dashboard/all-teachers", icon: <FaChalkboardTeacher /> },
    { name: "All Courses", href: "/admin-dashboard/all-courses", icon: <FaBookOpen /> },
    { name: "All Books", href: "/admin-dashboard/all-books", icon: <FaBook /> },
    { name: "ADD Notice", href: "/admin-dashboard/addNotice", icon: <FaNotesMedical /> },
    { name: "Sell Courses", href: "/admin-dashboard/Sell-Courses", icon: <FaRegNoteSticky /> },
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
          onClick={handleLogoutClick}
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
