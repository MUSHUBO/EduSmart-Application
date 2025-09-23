"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

// Images import
import bannerImg from "../../../public/images/banner-img/banner1.jpg";
import bannerImg2 from "../../../public/images/banner-img/banner2.jpg";
import bannerImg3 from "../../../public/images/banner-img/banner3.jpg";

// Slides Data with individual achievements
const slides = [
  {
    image: bannerImg,
    title: "Where Young Minds Blossom with Creativity and Curiosity",
    subtitle:
      "Our kindergarten school provides a nurturing and stimulating environment, fostering a love for learning from the very first day.",
    achievements: [
      { value: 1050, label: "Students Passed Out" },
      { value: 12, label: "Creative Workshops" },
      { value: 8, label: "Sports Events Organized" },
    ],
  },
  {
    image: bannerImg2,
    title: "Dreams Take Flight in a World of Knowledge and Fun",
    subtitle:
      "We inspire creativity, critical thinking, and curiosity in every child, helping them explore their unique talents and abilities.",
    achievements: [
      { value: 19, label: "Awards & Recognitions" },
      { value: 7, label: "Science Projects" },
      { value: 5, label: "Field Trips" },
    ],
  },
  {
    image: bannerImg3,
    title: "Learn, Play, Grow: Building Confident Young Leaders",
    subtitle:
      "Education made fun and engaging, combining play-based learning with essential life skills to shape confident, well-rounded children.",
    achievements: [
      { value: 15, label: "Experience Educators" },
      { value: 20, label: "Art Exhibitions" },
      { value: 10, label: "Music Performances" },
    ],
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-14 my-4 lg:my-14 min-h-[500px]">
      {/* Left Container: Image */}
      <div className="relative p-4 flex-shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Image
              src={slides[currentSlide].image}
              width={500}   // আগে ছিল 400
              height={500}  // আগে ছিল 400
              alt="Banner"
              className="max-w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[500px] h-auto rounded-md"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Container: Title + Subtitle + Achievements */}
      <div className="px-4 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-popover dark:text-popover mb-4 md:mb-8">
              {slides[currentSlide].title}
            </h1>
            <p className="text-popover-foreground dark:text-popover-foreground text-sm sm:text-base">
              {slides[currentSlide].subtitle}
            </p>

            {/* Achievements Section */}
            <div className="flex justify-center mt-7 xl:mt-14">
              <div className="bg-accent border-b-4 border-r-4 border-secondary rounded-lg p-4 shadow-md max-w-3xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {slides[currentSlide].achievements.map((achievement, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <motion.h2
                        className="text-4xl font-bold text-gray-800 mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      >
                        <CountUp start={0} end={achievement.value} duration={2} />
                      </motion.h2>
                      <p className="text-md text-gray-600">{achievement.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;