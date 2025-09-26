// src/components/page/Navbar/NavLinks.jsx
import Link from 'next/link';

const NavLinks = ({ pathname }) => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/admission", label: "Admission" },
    { href: "/assignment/new", label: "Assignments" },
    { href: "/noticeBoard", label: "Notice" },
  ];

  return (
    <>
      {links.map(link => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`cursor-pointer dark:hover:text-primary text-white hover:text-primary duration-200 
              ${pathname === link.href ? "text-primary dark:text-primary border-b-2 border-primary" : ""}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavLinks;