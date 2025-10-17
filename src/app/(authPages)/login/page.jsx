"use client";
import React, { useEffect, Suspense } from 'react';
import loginlottie from "../../../../public/lotttie-file/loginLottie.json";
import Lottie from 'lottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoginFormNey from './components/LoginFormNey';

export default function LoginPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    // ✅ Suspense যোগ করো
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-4 md:py-8 lg:py-12">
        {/* Left Side */}
        <div data-aos="fade-left" className="p-4 w-xl md:w-2xl lg:w-3xl">
          <LoginFormNey />
        </div>

        {/* Right Side */}
        <div data-aos="fade-right" className="max-w-sm md:max-w-md lg:max-w-lg p-4">
          <Lottie animationData={loginlottie} loop={true} />
        </div>
      </div>
    </Suspense>
  );
}

// 🧩 Prevent Turbopack prerendering
export const dynamic = "force-dynamic";