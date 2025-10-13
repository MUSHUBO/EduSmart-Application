import Link from 'next/link';
import Image from 'next/image';
import {
  FaHome,
  FaBook,
  FaTasks,
  FaCalendarAlt,
  FaCog,
  FaList,
  FaPlus,
  FaSignOutAlt,
  FaChevronRight
} from 'react-icons/fa';

export default function UserSidebar() {
  return (
    <div className="drawer-side">
      <label htmlFor="user-drawer" className="drawer-overlay"></label>
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

          {/* Navigation */}
          <nav className="space-y-3">
            {/* Dashboard */}
            <Link
              href="/user-dashboard"
              className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md"
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>

            {/* My Courses Dropdown */}
            <details className="group">
              <summary className="flex items-center justify-between hover:bg-blue-500 p-2 rounded-md cursor-pointer">
                <div className="flex items-center space-x-2">
                  <FaBook />
                  <span>My Courses</span>
                </div>
                <FaChevronRight className="transition-transform group-open:rotate-90" />
              </summary>
              <div className="pl-6 mt-2 flex flex-col space-y-2">
                <Link href="/user-dashboard/all-courses" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaList size={14} />
                  <span>All Courses</span>
                </Link>
                <Link href="/user-dashboard/enrolled" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaBook size={14} />
                  <span>Enrolled</span>
                </Link>
                <Link href="/user-dashboard/add-course" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaPlus size={14} />
                  <span>Add Course</span>
                </Link>
              </div>
            </details>

            {/* Assignments */}
            <Link
              href="/user-dashboard/assignments"
              className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md"
            >
              <FaTasks />
              <span>Assignments</span>
            </Link>

            {/* Events */}
            <Link
              href="/user-dashboard/events"
              className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md"
            >
              <FaCalendarAlt />
              <span>Events</span>
            </Link>

            {/* Settings */}
            <Link
              href="/user-dashboard/settings"
              className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md"
            >
              <FaCog />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <button className="flex items-center space-x-2 text-red-200 hover:text-red-400 mt-6">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>
    </div>
  );
}
