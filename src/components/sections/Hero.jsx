"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

// Images import
import bannerImg from "../../../public/images/banner-img/banner1.jpg";
import bannerImg2 from "../../../public/images/banner-img/banner2.jpg";
import bannerImg3 from "../../../public/images/banner-img/banner3.jpg";

// Slides Data
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

  // Slide auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden mt-2 mb-24">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt="Banner"
            fill
            className="object-cover object-center rounded-lg"
            priority
          />
          <div className="absolute inset-0 bg-black/50 rounded-lg" /> {/* Dark overlay */}
        </motion.div>
      </AnimatePresence>

      {/* Text Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <motion.h1
          key={slides[currentSlide].title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-4xl mb-4"
        >
          {slides[currentSlide].title}
        </motion.h1>
        <p className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl">
          {slides[currentSlide].subtitle}
        </p>

        {/* Achievements */}
        <div className="mt-8 bg-white/20 backdrop-blur-md rounded-lg p-6 max-w-4xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {slides[currentSlide].achievements.map((achievement, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.h2
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <CountUp start={0} end={achievement.value} duration={2} />
                </motion.h2>
                <p className="text-md">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;