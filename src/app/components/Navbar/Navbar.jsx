"use client";
import { LogIn, LogOut, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RiMenuLine, RiMenuUnfold2Fill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { useAuth } from '@/Hoks/UseAuth/UseAuth';
import { Bounce, toast } from 'react-toastify';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const { user, logoutAccount } = useAuth()
    const pathname = usePathname()
    const router = useRouter()

    console.log(pathname);
    const logoutHandler = () => {
        logoutAccount()
            .then(() => {
                toast.success('Logout Successfully', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
                router.push("/")
            })
            .then(error => {
                toast.error(`${error.code}`, {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
            })
    }
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    const nav = <>
        <li>
            <Link
                href="/"
                className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200 
                ${pathname === "/" ? "text-primary dark:text-primary border-b-2 border-primary" : ""}`}
            >
                Home
            </Link>
        </li>

        <li>
            <Link
                href="/about"
                className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200 
                ${pathname === "/about" ? "text-primary dark:text-primary border-b-2 border-primary" : ""}`}
            >
                About
            </Link>
        </li>

        <li>
            <Link
                href="/contact"
                className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200 
                ${pathname === "/contact" ? "text-primary dark:text-primary border-b-2 border-primary" : ""}`}
            >
                Contact
            </Link>
        </li>

        <li>
            <Link
                href="/admission"
                className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200 
                ${pathname === "/admission" ? "text-primary dark:text-primary border-b-2 border-primary" : ""}`}
            >
                Admission
            </Link>
        </li>
        <li>
            <Link
                href="/assignment"
                className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200 
                ${pathname === "/assignment" ? "text-primary dark:text-primary border-b-2 border-primary" : ""}`}
            >
                Assignments
            </Link>
        </li>
          <li>
            <Link
                href="/noticeBoard"
                className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200 
                ${pathname === "/noticeBoard" ? "text-primary dark:text-primary border-b-2 border-primary" : ""}`}
            >
                Notice
            </Link>
        </li>
          <li>
            <Link
                href="/student_life"
                className={`cursor-pointer dark:hover:text-primary text-popover dark:text-popover hover:text-primary duration-200 
                ${pathname === "/student_life" ? "text-primary dark:text-primary border-b-2 border-primary" : ""}`}
            >
                Student Life
            </Link>
        </li>
    </>


    useEffect(() => {
        const handleScroll = () => {
            const navbarHeight = document.getElementById("navbarId").offsetHeight;
            if (window.scrollY > navbarHeight) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div id="navbarId" className={`navbar bg-background shadow-sm border-b border-primary/55 z-50 transition-all duration-500 ease-in-out sticky ${isFixed
            ? 'fixed top-0 left-0 right-0 backdrop-blur-xl bg-background/60 translate-y-0'
            : 'relative -top-30'
            }`}>
            <div className="navbar-start">
                <div
                    className="dropdown max-w-8 p-1 cursor-pointer max-h-8"
                >
                    <div
                        className="btn bg-transparent border-none shadow-none hover:bg-primary hover:text-popover p-1 rounded-sm -mt-1 w-full h-full text-primary lg:hidden"
                        role="button"
                        tabIndex={0}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <RiMenuUnfold2Fill size={18} /> : <RiMenuLine size={18} />}
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu text-base-100 font-medium dark:text-white menu-sm dropdown-content bg-secondary rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {nav}
                    </ul>
                </div>
                <Link className='max-w-[100px] md:max-w-[180px]' href={"/"}>
                    <img src="/images/eduSmart.png" alt="eduSmart.png" />
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
                        {isDark ? <Sun className="md:w-6 md:h-6  lg:w-7 h-7 text-primary" /> : <Moon fill='#FF8D4D' className="md:w-6 md:h-6 lg:w-7 lg:h-7  text-primary" />}
                    </button>
                </div>
                <div>
                    <div className='md:w-7 md:h-7 lg:w-8 h-8 rounded-full  '>
                        {
                            user?.email ?  <img className='w-full rounded-full' src={user?.photoURL} alt={user?.photoURL} /> : <IoPersonSharp className='w-full h-full text-primary ' />
                        }
                        
                    </div>
                </div>
                <div className="">

                    {
                        user?.email ? <button onClick={logoutHandler} className="rounded relative inline-flex group items-center justify-center px-2.5 md:px-3.5 py-1.5 md:py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-primary/85 active:shadow-none shadow-lg bg-gradient-to-tr from-primary/85 to-primary/90 border-primary text-black">
                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                            <span className="relative font-medium flex justify-center items-center text-sm md:text-base gap-1.5"><LogOut size={19} /> Logout</span>
                        </button> : <Link href="/login" className="rounded relative inline-flex group items-center justify-center px-2.5 md:px-3.5 py-1.5 md:py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-primary/85 active:shadow-none shadow-lg bg-gradient-to-tr from-primary/85 to-primary/90 border-primary text-black">
                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                            <span className="relative font-medium flex justify-center items-center text-sm md:text-base gap-1.5"><LogIn size={19} /> Login</span>
                        </Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;