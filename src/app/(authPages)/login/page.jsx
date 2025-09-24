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
    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <div data-aos="fade-left" className="p-4 w-xl md:w-2xl lg:w-3xl">
        <LoginFormNey></LoginFormNey>
      </div>
      <div data-aos="fade-right" className="max-w-sm md:max-w-md lg:max-w-lg p-4">
        <Lottie animationData={loginlottie} loop={true} />
      </div>
    </div>

  );
};

export default LoginPage;