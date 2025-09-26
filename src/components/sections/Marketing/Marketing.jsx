'use client'
import Link from "next/link";
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Marketing() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return (
        <div data-aos="fade-up" className="bg-teal-500 container mx-auto my-10 md:my-16 lg:my-22 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Side Text */}
            <div data-aos="fade-right" className="flex-1 space-y-8 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                    Start today and get certified in <br />
                    <span className="text-white">Fundamentals of digital marketing</span>
                </h2>
                <p className="text-white mt-3">
                    Get unlimited access to 3,550+ of our top courses for your team.
                </p>
                <Link href={"/"} className="relative inline-flex items-center rounded-lg justify-center px-4 py-4 md:px-5 md:py-3 lg:px-6 lg:py-3.5 overflow-hidden font-mono font-medium tracking-tighter text-white bg-secondary group">
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#FFFFFF] rounded-full group-hover:w-56 group-hover:h-56"></span>
                    <span className="group-hover:text-secondary relative flex text-sm md:text-base duration-500 lg:text-lg font-semibold items-center gap-3">
                        Get Started Now
                    </span>
                </Link>
            </div>

            {/* Right Side Image */}
            <div className="relative flex-1 flex justify-center items-center">
                {/* Circle Background */}
                <div data-aos="fade-left"
                    className="
      absolute w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 
      bg-secondary rounded-full 
      right-0 md:right-5 lg:right-20 
      top-1/2 -translate-y-1/2 
      z-0
    "
                ></div>

                {/* Image */}
                <img
                    src="/images/cta.jpg"
                    alt="Marketing Student"
                    className="
      rounded-full 
      w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 
      object-cover shadow-lg 
      relative z-10
    "
                />

            </div>

        </div>
    );
}
