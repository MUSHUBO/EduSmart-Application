"use client";

import React, { useEffect } from 'react';
import loginlottie from "../../../../public/lotttie-file/loginLottie.json"
import Lottie from 'lottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoginFormNey from './components/LoginFormNey';



const LoginPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
      {/* Left Side */}
      <div data-aos="fade-left" className="p-4">
        <LoginFormNey></LoginFormNey>
      </div>

      {/* Right Side */}
      <div data-aos="fade-right" className="max-w-md md:max-w-lg lg:max-w-xl p-4">
        <Lottie animationData={loginlottie} loop={true} />
      </div>
    </div>

  );
};

export default LoginPage;