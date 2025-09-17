"use client";
import { LogIn, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
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
        <li><Link href={"/"} className='cursor-pointer hover:text-primary duration-200'>Home</Link></li>
        <li><Link href={"/about"} className={`cursor-pointer hover:text-primary duration-200  ${pathname === "/about" && "text-primary border-b-2 border-primary"
            }`}>About</Link></li>
        <li><Link href={"/contact"} className={`cursor-pointer hover:text-primary duration-200 ${pathname === "/contact" && "text-primary border-b-2 border-primary"
            }`}>Contact</Link></li>
    </>
    return (
        <div className="navbar bg-background shadow-sm border-b border-primary/55">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu text-base-100 font-medium dark:text-white menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {nav}
                    </ul>
                </div>
                <Link className='max-w-[100px]' href={"/"}>
                    {
                        isDark ? <img src="/images/edusmart_dark.png" alt="edusmarty_icon" /> : <img src="/images/edusmart_light.png" alt="edusmarty_icon" />
                    }

                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" flex gap-7 items-center text-base-100 font-medium dark:text-white menu-horizontal px-1">
                    {nav}
                </ul>
            </div>
            <div className='navbar-end gap-10'>
                <div>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
                <div className="">
                    <Link href="/login" class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-primary/85 active:shadow-none shadow-lg bg-gradient-to-tr from-primary/85 to-primary/90 border-primary text-black">
                        <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span class="relative flex justify-center items-center gap-1.5"><LogIn size={18} /> Button Text</span>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Navbar;