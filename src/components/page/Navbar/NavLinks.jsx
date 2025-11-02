"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FaCaretRight } from "react-icons/fa";

const NavLinks = ({ pathname }) => {
  const navbg = pathname !== "/";
  const links = [
    { href: "/", label: "Home" },
    { href: "/allCourses", label: "Courses" },
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
        { href: "/library", label: "Library" },
        { href: "/admission", label: "Admission" },
        { href: "/ai_assistant", label: "AI Assistant" },
      ],
    },
    { href: "/noticeBoard", label: "Notice" },
    { href: "/aionix", label: "Aionix" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {links.map((link, i) => (
        <li key={i} className="relative group">
          {/* === Parent Link === */}
          {link.children ? (
            <span
              className={`flex items-center gap-1 px-2 py-2 cursor-pointer transition-colors duration-200
              ${navbg && "text-popover"}
              ${pathname === link.href
                  ? "text-primary border-b-2 border-primary dark:text-primary"
                  : "hover:text-primary"
                }`}
            >
              {link.label}
              <ChevronDown
                size={14}
                className="ml-1 transition-transform duration-300 group-hover:rotate-180"
              />
            </span>
          ) : (
            <Link
              href={link.href}
              className={`px-2 py-2 border-b-2 border-transparent transition-all duration-300 
              ${navbg && "text-popover"} 
              ${pathname === link.href
                  ? "text-primary border-primary dark:text-primary"
                  : "hover:text-primary hover:border-primary"
                }`}
            >
              {link.label}
            </Link>
          )}

          {/* === Dropdown Menu === */}
          {link.children && (
            <ul
              className="absolute left-0 top-full mt-2 w-46 rounded-lg bg-accent
              dark:bg-muted/80 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible 
              transition-all duration-300 backdrop-blur-sm border border-primary/30"
            >
              {link.children.map((child) => (
                <li
                  key={child.href}
                  className="border-b border-gray-500 dark:border-white/20 last:border-none hover:border-primary dark:hover:border-primary transition-colors duration-300"                >
                  <Link
                    href={child.href}
                    className={`relative flex items-center px-4 py-2.5 text-sm font-medium 
                    transition-all duration-300 group/item 
                    ${pathname === child.href
                        ? "text-primary dark:text-primary"
                        : "text-foreground dark:text-card-foreground"
                      } 
                    hover:text-primary`}
                  >
                    {/* Icon – hidden by default, shown on hover */}
                    <FaCaretRight
                      size={12}
                      className="absolute left-2 opacity-0 -translate-x-2 
                      transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                    />
                    <span className="pl-0 group-hover/item:pl-4 transition-all duration-300">
                      {child.label}
                    </span>
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