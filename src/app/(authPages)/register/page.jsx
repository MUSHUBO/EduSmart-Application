"use client";

import React, { useEffect } from 'react';
import RegisterForm from './components/RegisterForm';
import signuplottie from "../../../../public/lotttie-file/signupLottie.json"
import Lottie from 'lottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const RegisterPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <div data-aos="fade-left" className="p-4 w-xl md:w-2xl lg:w-3xl">
        <RegisterForm />
      </div>

      {/* Right Side */}
     <div data-aos="fade-right" className="max-w-sm md:max-w-md lg:max-w-lg p-4">
        <Lottie animationData={signuplottie} loop={true} />
      </div>
    </div>

  );
};

export default RegisterPage;