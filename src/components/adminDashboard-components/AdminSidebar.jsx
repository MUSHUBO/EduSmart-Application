import Link from 'next/link';
import Image from 'next/image';
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaCog,
  FaList,
  FaPlus,
  FaSignOutAlt,
  FaChevronRight
} from 'react-icons/fa';

export default function AdminSidebar() {
  return (
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

          {/* Navigation */}
          <nav className="space-y-3">
            {/* Dashboard */}
            <Link href="#" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md">
              <FaHome />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin-dashboard/allUsers" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md">
              <FaHome />
              <span>All USERS</span>
            </Link>

            {/* Students Dropdown */}
            <details className="group">
              <summary className="flex items-center justify-between hover:bg-blue-500 p-2 rounded-md cursor-pointer">
                <div className="flex items-center space-x-2">
                  <FaUserGraduate />
                  <span>Student</span>
                </div>
                <FaChevronRight className="transition-transform group-open:rotate-90" />
              </summary>
              <div className="pl-6 mt-2 flex flex-col space-y-2">
                <Link href="/admin-dashboard/allStudents" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaList size={14} />
                  <span>All Students</span>
                </Link>
                <Link href="/admin-dashboard/addStudent" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaPlus size={14} />
                  <span>Add Student</span>
                </Link>
              </div>
            </details>

            {/* Teachers Dropdown */}
            <details className="group">
              <summary className="flex items-center justify-between hover:bg-blue-500 p-2 rounded-md cursor-pointer">
                <div className="flex items-center space-x-2">
                  <FaChalkboardTeacher />
                  <span>Teacher</span>
                </div>
                <FaChevronRight className="transition-transform group-open:rotate-90" />
              </summary>
              <div className="pl-6 mt-2 flex flex-col space-y-2">
                <Link href="/admin-dashboard/all-teachers" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaList size={14} />
                  <span>All Teachers</span>
                </Link>
                <Link href="/admin-dashboard/add-teacher" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaPlus size={14} />
                  <span>Add Teacher</span>
                </Link>
              </div>
            </details>

            {/* Events Dropdown */}
            <details className="group">
              <summary className="flex items-center justify-between hover:bg-blue-500 p-2 rounded-md cursor-pointer">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt />
                  <span>Events</span>
                </div>
                <FaChevronRight className="transition-transform group-open:rotate-90" />
              </summary>
              <div className="pl-6 mt-2 flex flex-col space-y-2">
                <Link href="/events" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaList size={14} />
                  <span>All Events</span>
                </Link>
                <Link href="/events/add" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaPlus size={14} />
                  <span>Add Event</span>
                </Link>
              </div>
            </details>

            {/* Settings */}
            <Link href="#" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-md">
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
