"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CirclePlus } from "lucide-react";


// Images import
import slide1 from "../../../public/assets/banner-slides/slide1.jpg";
import slide2 from "../../../public/assets/banner-slides/slide2.jpg"

// Slides Data
const slidesData = [
  {
    image: slide1,
    preTitle: "Enjoy smooth learning",
    title: "Where Young Minds Blossom with Creativity and Curiosity",
    subtitle:
      "Our kindergarten school provides a nurturing and stimulating environment, fostering a love for learning from the very first day.",
  },
  {
    image: slide2,
    preTitle: "Enjoy smooth learning",
    title: "Dreams Take Flight in a World of Knowledge and Fun",
    subtitle:
      "We inspire creativity, critical thinking, and curiosity in every child, helping them explore their unique talents and abilities.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slidesData[currentSlide];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-gray-900">
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
            src={slide.image}
            alt="Banner"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
        </motion.div>
      </AnimatePresence>

      {/* Text Overlay */}
      <div className="relative z-10 flex flex-col items-start justify-center text-left h-full px-4 md:px-24">
        <motion.div
          key={slide.title}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="text-orange-400 text-sm sm:text-lg md:text-xl font-medium mb-4"
          >
            {slide.preTitle}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-4xl mb-4"
          >
            {slide.title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl"
          >
            {slide.subtitle}
          </motion.p>

          {/* buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              <CirclePlus className="" />
              Learn More
            </button>
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-secondary text-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              <CirclePlus className="" />
              Our Courses
            </button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default Hero;