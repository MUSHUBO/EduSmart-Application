"use client";
import { LogIn, LogOut, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RiMenuLine, RiMenuUnfold2Fill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { useAuth } from '@/Hoks/UseAuth/UseAuth';
import { Bounce, toast } from 'react-toastify';
import NavLinks from './NavLinks';
import Image from 'next/image';
import logo from '../../../../public/images/eduSmart.png'

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
    <div
      id="navbarId"
      className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isFixed
        ? "backdrop-blur-xl bg-background/60 shadow-md"
        : "bg-transparent"
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
          <ul className="flex gap-7 items-center text-base-100 font-medium dark:text-white menu-horizontal px-1">
            <NavLinks pathname={pathname} />
          </ul>
        </div>


        <div className='navbar-end gap-2 md:gap-5 lg:gap-8'>
          {/* Light/Dark Mode Button */}
          <div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 cursor-pointer rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="md:w-6 md:h-6  lg:w-7 h-7 text-primary" /> : <Moon fill='#FF8D4D' className="md:w-6 md:h-6 lg:w-7 lg:h-7  text-primary" />}
            </button>
          </div>

          {/* Profile Avatar */}
          <div>
            <div className='md:w-7 md:h-7 lg:w-8 h-8 rounded-full  '>
              {
                user?.email ?
                  <img className='w-full rounded-full' src={user?.photoURL} alt={user?.photoURL} /> :
                  <IoPersonSharp className='w-full h-full text-primary ' />
              }

            </div>
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