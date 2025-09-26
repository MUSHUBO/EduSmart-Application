"use client";

import React, { useEffect } from 'react';
import resetLottie from "../../../../public/lotttie-file/resetLottie.json"
import Lottie from 'lottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Resetform from './components/Resetform';


const RegisterPage = () => {
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
        <Resetform />
      </div>

      {/* Right Side */}
      <div data-aos="fade-right" className="max-w-md md:max-w-lg lg:max-w-xl p-4">
        <Lottie animationData={resetLottie} loop={false} />
      </div>
    </div>

  );
};

export default RegisterPage;