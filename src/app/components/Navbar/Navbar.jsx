"use client";
import { LogIn, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RiMenuLine, RiMenuUnfold2Fill } from "react-icons/ri";

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname()
    console.log(pathname);
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);
    const nav = <>
        <li><Link href={"/"} className='cursor-pointer text-black dark:text-white dark:hover:text-primary hover:text-primary duration-200'>Home</Link></li>
        <li><Link href={"/about"} className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200  ${pathname === "/about" && "text-primary dark:text-primary border-b-2 border-primary"
            }`}>About</Link></li>
        <li><Link href={"/contact"} className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200 ${pathname === "/contact" && "text-primary dark:text-primary border-b-2 border-primary"
            }`}>Contact</Link></li>
        <li><Link href={"/noticeBoard"} className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200 ${pathname === "/contact" && "text-primary dark:text-primary border-b-2 border-primary"
            }`}>Notice</Link></li>
    </>
    return (
        <div className="navbar bg-background shadow-sm border-b border-primary/55">
            <div className="navbar-start">
                <div className="dropdown p-1">
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="btn btn-ghost p-0 text-primary lg:hidden"
                        role="button"
                        tabIndex={0}
                    >
                        {isOpen ? <RiMenuUnfold2Fill size={18} /> : <RiMenuLine size={18} />}
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu text-base-100 font-medium dark:text-white menu-sm dropdown-content bg-secondary rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {nav}
                    </ul>
                </div>
                <Link className='max-w-[100px] md:max-w-[140px]' href={"/"}>
                    {
                        isDark ? <img src="/images/edusmart_dark.png" alt="edusmarty_dark_icon" /> : <img src="/images/edusmart_light.png" alt="edusmarty_light_icon" />
                    }

                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" flex gap-7 items-center text-base-100 font-medium dark:text-white menu-horizontal px-1">
                    {nav}
                </ul>
            </div>
            <div className='navbar-end gap-2 md:gap-5 lg:gap-8'>
                <div>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2 cursor-pointer rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isDark ? <Sun className="h-5 w-5 text-primary" /> : <Moon fill='#FF8D4D' className="h-5 w-5 text-primary" />}
                    </button>
                </div>
                <div className="">
                    <Link href="/login" className="rounded relative inline-flex group items-center justify-center px-2.5 md:px-3.5 py-1.5 md:py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-primary/85 active:shadow-none shadow-lg bg-gradient-to-tr from-primary/85 to-primary/90 border-primary text-black">
                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span className="relative font-medium flex justify-center items-center text-sm md:text-base gap-1.5"><LogIn  size={19}/> Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;