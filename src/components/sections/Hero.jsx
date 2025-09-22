"use client";
import Image from "next/image";
import React from "react";
import bannerImg from "../../../public/images/banner-img/banner-img.png";
import { motion } from "framer-motion";
import CountUp from "react-countup";


const achievementsData = [
  {
    value: "+1050",
    label: "Students Passed Out"
  },
  {
    value: "+19",
    label: "Awards & Recognitions"
  },
  {
    value: "+15",
    label: "Experience Educators"
  }
];

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-14 min-h-screen my-4 lg:my-0">
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
          className="relative z-10 max-w-full sm:max-w-[300px] md:max-w-[400px] h-auto"
        />
      </div>

      {/* Right Container */}
      <div className="px-4">
        <motion.h5
          className="text-popover dark:text-popover text-lg sm:text-xl mb-1 text-center lg:text-start"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to EduSmart Application
        </motion.h5>

        <motion.div
          className="font-medium text-center md:text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-popover dark:text-popover mb-4 md:mb-8">
            Where Young Minds Blossom and{" "}
            <span className="text-primary">Dreams Take Flight</span>.
          </h1>
        </motion.div>

        <motion.div
          className="font-medium text-center md:text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-popover-foreground dark:text-popover-foreground text-sm sm:text-base">
            Our kinder garden school provides a nurturing and stimulating environment, fostering a love for learning that lasts a lifetime. Join us as we embark on an exciting educational journey together!
          </p>
        </motion.div>

        
        {/* Achievements */}
        <motion.div
          className="flex justify-center mt-7 xl:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-accent border-b-4 border-r-4 border-secondary rounded-lg p-4 shadow-md max-w-3xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {achievementsData.map((achievement, index) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.h2
                    className="text-4xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  >
                    <CountUp start={500} end={achievement.value} duration={2} />
                  </motion.h2>
                  <p className="text-md text-gray-600">
                    {achievement.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
