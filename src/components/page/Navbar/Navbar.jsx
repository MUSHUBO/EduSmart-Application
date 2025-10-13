"use client";
import { LogIn, LogOut, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RiMenuLine, RiMenuUnfold2Fill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { useAuth } from '@/Hooks/UseAuth/UseAuth';
import { Bounce, toast } from 'react-toastify';
import NavLinks from './NavLinks';
import Image from 'next/image';
import logo from '../../../../public/images/eduSmart.png'

import Translate from '@/components2/Translate';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const { user, logoutAccount } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  // console.log(pathname);
  
  const logoutHandler = async () => {
    try {
      await logoutAccount();
      toast.success('Logout Successfully', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
      });
      router.push("/");
    } catch (error) {
      toast.error(error?.code || error?.message || "Logout failed", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
      });
    }
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);


  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbarId");
      if (!navbar) return; // ✅ Null check
      const navbarHeight = navbar.offsetHeight;
      if (window.scrollY > navbarHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // ata dashboard e asle jeno navbar na dekhai sei jonno
  const currentPathname = usePathname();
  if (currentPathname.includes("dashboard")) {
    return <></>;
  }


  return (
    <div
      id="navbarId"
      className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isFixed
        ? "backdrop-blur-xl bg-background/90 font-extrabold shadow-sm shadow-accent"
        : "bg-transparent text-white dark:text-white"
        }`}
    >
      {/* Navbar */}
      <div className="w-11/12 mx-auto px-4 flex justify-between items-center">
        <div className="navbar-start">
          <div className="dropdown max-w-8 p-1 cursor-pointer max-h-8">
            <div
              className="btn bg-transparent border-none shadow-none hover:bg-primary hover:text-popover p-1 rounded-sm -mt-1 w-full h-full text-primary lg:hidden"
              role="button"
              tabIndex={0}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <RiMenuUnfold2Fill size={18} /> : <RiMenuLine size={18} />}
            </div>

            {/* Menu Links */}
            <ul
              tabIndex={0}
              className="menu text-base-100 font-medium dark:text-white menu-sm dropdown-content bg-secondary rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <NavLinks pathname={pathname} />
            </ul>
          </div>

          {/* Logo */}
          <Link className='max-w-[100px] md:max-w-[150px]' href={"/"}>
            {
              isDark ?
                <Image
                  src={logo}
                  alt="edusmarty_light_icon"
                  width={150}
                  height={50}
                  className="w-full h-auto"
                />
                :
                <Image
                  src={logo}
                  alt="edusmarty_dark_icon"
                  width={150}
                  height={50}
                  className="w-full h-auto"
                />
            }
          </Link>
        </div>


        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-7 items-center font-medium menu-horizontal px-1">
            <NavLinks pathname={pathname} />
          </ul>
        </div>


        <div className='navbar-end gap-2 md:gap-4'>
          {/* Light/Dark Mode Button */}
          <div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 cursor-pointer rounded-full text-gray-600 dark:text-gray-300 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors"
            >
              {isDark ? <Sun className="md:w-6 md:h-6  lg:w-7 h-7 text-primary" /> : <Moon fill='#2fbfa7' className="md:w-6 md:h-6 lg:w-7 lg:h-7  text-primary" />}
            </button>
          </div>


          {/* Language Change */}
          <Translate></Translate>


          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mt-1 rounded-full overflow-hidden border border-gray-300 focus:outline-none"
            >
              {user?.email ? (
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={user?.photoURL || "default-avatar"}
                  alt="User Avatar"
                />
              ) : (
                <IoPersonSharp className="w-full h-full text-primary" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 z-50">
                {user?.email ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      href="/admin-dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-all"
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/my-profile"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-all"
                    >
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        logoutHandler();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-all"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>


          {/* Login/Logout button */}
          <div>
            {
              user?.email ?
                <button onClick={logoutHandler} className="rounded relative inline-flex group items-center justify-center px-2.5 md:px-3.5 py-1.5 md:py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-primary/85 active:shadow-none shadow-lg bg-gradient-to-tr from-primary/85 to-primary/90 border-primary text-black">
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative font-medium flex justify-center items-center text-sm md:text-base gap-1.5">
                    <LogOut size={19} /> Logout
                  </span>
                </button>
                :
                <Link href="/login" className="rounded relative inline-flex group items-center justify-center px-2.5 md:px-3.5 py-1.5 md:py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-primary/85 active:shadow-none shadow-lg bg-gradient-to-tr from-primary/85 to-primary/90 border-primary text-black">
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative font-medium flex justify-center items-center text-sm md:text-base gap-1.5">
                    <LogIn size={19} /> Login
                  </span>
                </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;