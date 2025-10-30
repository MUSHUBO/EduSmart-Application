"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  FaBook,
  FaList,
  FaHeart,
  FaTasks,
  FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/Hooks/UseAuth/UseAuth";

export default function StudentSidebar() {
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

  const menuItems = [
    { name: "My Enrolled Courses", href: "/student-dashboard/my-courses", icon: <FaList /> },
    { name: "My Books", href: "/student-dashboard/my-books", icon: <FaBook /> },
    { name: "Wish-List", href: "/student-dashboard/wishlist", icon: <FaHeart /> },
    { name: "My Assignments", href: "/student-dashboard/my-assignments", icon: <FaTasks /> },
  ];

  const linkClass = (path) =>
    `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-base transition-all duration-300 ${
      pathname === path
        ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
        : "hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
    }`;

  return (
    <div className="drawer-side">
      <label htmlFor="user-drawer" className="drawer-overlay"></label>
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

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
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
