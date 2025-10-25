"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const NavLinks = ({ pathname }) => {
    const navbg = pathname !== "/"
  const links = [
    { href: "/", label: "Home" },
    {
      label: "Courses",
      children: [
        { href: "/allCourses", label: "All Courses" },
        { href: "/CourseCreationForm", label: "Add Course" },
      ],
    },
    {
      label: "Pages",
      children: [
        { href: "/about", label: "About Us" },
        { href: "/student_life", label: "Student Life" },
      ],
    },
    {
      label: "Pages2",
      children: [
        { href: "/assignment", label: "Assignments" },
        { href: "/bookForm", label: "BookForm" },
        { href: "/library", label: "Library" },
        { href: "/admission", label: "Admission" },
        { href: "/ai_assistant", label: "AI Assistant" },
      ],
    },
    { href: "/noticeBoard", label: "Notice" },
    { href: "/contact", label: "Contact" },
    { href: "/aionix", label: "Aionix" },
    // { href: "/admin-dashboard", label: "DashBoard-1" },
  ];

  return (
    <>
      {links.map((link, i) => (
        <li key={i} className="relative group">
          {/* Parent Link */}
          {link.children ? (
            <span
              className={`flex items-center gap-1 cursor-pointer px-1 py-2 ${navbg && "text-popover"} ${
                pathname === link.href
                  ? "text-primary dark:text-primary border-b-2 border-primary"
                  : ""
              }`}
            >
              {link.label}
              <ChevronDown size={16} className={`transition-transform group-hover:rotate-180`} />
            </span>
          ) : (
            <Link
              href={link.href}
              className={`px-1 py-2 cursor-pointer ${navbg && "text-popover"} ${
                pathname === link.href
                  ? "text-primary dark:text-primary border-b-2 border-primary"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          )}

          {/* Dropdown */}
          {link.children && (
            <ul
              className="absolute left-0 top-full mt-2 w-44 rounded-lg bg-primary shadow-lg opacity-0 invisible 
              group-hover:opacity-100 group-hover:visible transition-all duration-300"
            >
              {link.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={`block px-4 py-2 rounded-md duration-200 ${
                      pathname === child.href
                        ? "text-[#FFFFFF] dark:text-[#000000] font-semibold"
                        : "text-[#000000] dark:text-[#FFFFFF]"
                    }`}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default NavLinks;