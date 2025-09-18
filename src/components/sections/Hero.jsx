"use client";
import Image from 'next/image';
import React from 'react';
import bannerImg from "../../../public/images/banner-img/banner-img.png"

const Hero = () => {
  return (
    <div className='flex items-center justify-center gap-14 min-h-screen'>
      {/* Left Container */}
      <div className='bg-secondary'>
        <Image
          src={bannerImg}
          width={1000}
          height={1000}
          alt="Picture of the author"
        />
      </div>

      {/* Right Container */}
      <div className='font-medium'>
        <h5 className='text-black text-xl mb-1 underline underline-offset-8'>Welcome to EduSmart Application</h5>

        <h1 className='text-5xl font-extrabold text-black mb-5 md:mb-8'>
          Where Young Minds Blossom and <span className='text-primary'> Dreams Take Flight</span>.
        </h1>

        <p className='text-black'>
          Our kinder garden school provides a nurturing and stimulating environment, fostering a love for learning that lasts a lifetime. Join us as we embark on an exciting educational journey together!
        </p>
      </div>
    </div>
  );
};

export default Hero;