"use client";

import React from 'react';
import RegisterForm from './components/RegisterForm';
import signuplottie from "../../../../public/lotttie-file/signupLottie.json"
import Lottie from 'lottie-react';


const RegisterPage = () => {
  return (
    <div className='flex justify-center gap-10 items-center'>
      <RegisterForm></RegisterForm>
      <div className='max-w-[450px]'>
        <Lottie animationData={signuplottie} loop={true} />
      </div>

    </div>
  );
};

export default RegisterPage;