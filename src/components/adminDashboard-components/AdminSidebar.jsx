'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FaUser,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBookOpen,
  FaCalendarAlt,
  FaSignOutAlt
} from 'react-icons/fa';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'All Users', href: '/admin-dashboard/allUsers', icon: <FaUser /> },
    { name: 'All Students', href: '/admin-dashboard/allStudents', icon: <FaUserGraduate /> },
    { name: 'All Teachers', href: '/admin-dashboard/all-teachers', icon: <FaChalkboardTeacher /> },
    { name: 'All Courses', href: '/admin-dashboard/all-courses', icon: <FaBookOpen /> },
    { name: 'All Books', href: '/admin-dashboard/all-books', icon: <FaBook /> },
    { name: 'All Events', href: '#', icon: <FaCalendarAlt /> }
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="drawer-side">
      <label htmlFor="admin-drawer" className="drawer-overlay"></label>

      <aside className="menu p-5 w-64 bg-blue-600 text-white min-h-full flex flex-col justify-between">
        {/* Logo */}
        <div>
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
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-md transition text-lg font-bold ${
                  isActive(item.href)
                    ? 'bg-blue-700 text-white'
                    : 'hover:bg-blue-500 text-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button className="flex items-center space-x-2 text-red-200 hover:text-red-400 mt-6 text-lg font-bold">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>
    </div>
  );
}
