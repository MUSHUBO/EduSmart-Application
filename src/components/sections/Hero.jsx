"use client";
import Image from "next/image";
import React from "react";
import bannerImg from "../../../public/images/banner-img/banner-img.png";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-14 min-h-screen px-4 my-4 md:my-0">
      {/* Left Container */}
      <div className="relative bg-secondary p-4 flex-shrink-0">
        {/* Border with corner circles */}
        <div className="absolute inset-0 border border-foreground">
          <div className="absolute -top-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-popover dark:bg-popover border border-foreground rounded-full"></div>
          <div className="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-popover dark:bg-popover border border-foreground rounded-full"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-popover dark:bg-popover border border-foreground rounded-full"></div>
          <div className="absolute -bottom-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-popover dark:bg-popover border border-foreground rounded-full"></div>
        </div>

        {/* Main Image */}
        <Image
          src={bannerImg}
          width={400}
          height={400}
          alt="Kids"
          className="relative z-10 max-w-[220px] sm:max-w-[300px] md:max-w-[400px] h-auto"
        />
      </div>

      {/* Right Container */}
      <div className="font-medium text-center md:text-left">
        <h5 className="text-popover dark:text-popover text-lg sm:text-xl mb-1 underline underline-offset-8">
          Welcome to EduSmart Application
        </h5>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-popover dark:text-popover mb-4 md:mb-8">
          Where Young Minds Blossom and{" "}
          <span className="text-primary">Dreams Take Flight</span>.
        </h1>

        <p className="text-popover-foreground dark:text-popover-foreground text-sm sm:text-base">
          Our kinder garden school provides a nurturing and stimulating
          environment, fostering a love for learning that lasts a lifetime.
          Join us as we embark on an exciting educational journey together!
        </p>
      </div>
    </div>
  );
};

export default Hero;
