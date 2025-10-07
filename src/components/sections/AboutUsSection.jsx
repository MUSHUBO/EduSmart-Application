"use client";
import React from 'react';
import { BookOpen, Globe, Phone, ArrowRight, Quote } from 'lucide-react';
import Image from 'next/image';
import { motion } from "framer-motion";
import Link from 'next/link';


// Images import
import mainImagePath from "../../../public/assets/about_us-images/about-us01.jpg"

const AboutUsSection = () => {

  // Helper Component for the service cards
  const ServiceCard = ({ icon: Icon, title, description }) => {
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-3 bg-orange-100 text-orange-500 rounded-lg shadow-sm">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-popover mb-1">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  };

  // Variants for defining reusable animations in Framer Motion
  const leftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16">

          {/* === LEFT COLUMN: Image and Service Badge === */}
          <motion.div
            className="relative flex-1 w-full lg:w-5/12"
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Main image container with colored borders */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              {/* Orange top bar */}
              <div className="absolute top-0 left-0 w-full h-4 bg-orange-500 rounded-t-xl z-10" />
              {/* Main Image */}
              <Image
                src={mainImagePath}
                alt="Group of students walking on campus"
                className="w-full h-auto object-cover"
              />
              {/* Green bottom-right accent */}
              <div className="absolute bottom-0 right-0 h-10 w-2/3 bg-teal-700 opacity-100 rounded-tl-[80px]" />
              <div className="absolute bottom-0 right-0 h-2/3 w-10 bg-teal-700 opacity-100 rounded-tl-[100px]" />
            </div>

            {/* 5+ Years of Quality Service Badge */}
            <motion.div
              className="absolute  -left-7 md:-left-12  bottom-14 md:bottom-20  w-62 md:w-72  py-2 md:py-6  px-4 border-l-5 border-primary bg-muted shadow-xl text-center"
              animate={{ y: [0, -30, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              <div className="flex justify-center items-center gap-4">
                <div>
                  <span className="text-2xl md:text-3xl lg:text-5xl text-primary font-medium">5+</span>
                </div>

                <div className="text-popover text-md md:text-lg font-medium text-start">
                  <p className="">YEARS EXPERIENCE</p>
                  <p className="leading-tight">JUST ACHIVED</p>
                </div>
              </div>
            </motion.div>

            {/* Left End */}
          </motion.div>

          {/* === RIGHT COLUMN: Content === */}
          <motion.div
            className="w-full flex-1 pt-6 lg:pt-0"
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-md font-semibold uppercase tracking-widest text-orange-500 mb-2">
              <span className='bg-accent-foreground/50 px-4 py-1 rounded-md'>About Us</span>
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-popover mb-6 leading-tight">
              Our Education System <br />
              <span className="text-secondary">Inspires</span> You More.
            </h2>

            <p className="text-gray-600 mb-8 max-w-xl">
              There are many variations of passages available but the majority have suffered
              alteration in some form by injected humour randomised words which don't look
              even slightly believable. If you are going to use passage...
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:pb-10 border-b border-gray-300">
              {/* Aligned to the Left layout */}
              <div className='flex flex-col gap-6'>
                {/* Education Services Card */}
                <ServiceCard
                  icon={BookOpen}
                  title="Education Services"
                  description="It is a long established fact that reader will to using content."
                />

                {/* International Hubs Card */}
                <ServiceCard
                  icon={Globe}
                  title="International Hubs"
                  description="It is a long established fact that reader will to using content."
                />
              </div>

              {/*  Aligned to the right layout */}
              <div className="relative">
                {/* Overlay Quote Box */}
                <div className="w-52 h-52 p-5 bg-amber-100 rounded-2xl hidden lg:block">
                  <p className="text-gray-600 mb-2">
                    It is a long established fact that a reader will be distracted by the
                    content of a page when looking at its reader for the long words layout.
                  </p>
                  <div className="absolute bottom-5 right-22 text-6xl font-extrabold text-secondary select-none -translate-x-3 translate-y-3">
                    <Quote className="w-10 h-10 fill-secondary" />
                  </div>
                </div>
              </div>

            </div>

            <div className='divider divide-gray-800'></div>

            {/* Call to Action and Contact */}
            <div className="flex sm:flex-row flex-col-reverse gap-6 items-center sm:mt-4">
              <Link
                href={'/about'}
                className="flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
                DISCOVER MORE <ArrowRight className="ml-2 w-5 h-5" />
              </Link>

              <div className="flex items-center space-x-3">
                <div className="p-3 bg-teal-600 text-white rounded-full">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Now</p>
                  <a href="tel:+21236547898" className="text-xl font-bold text-gray-900 hover:text-orange-500 transition duration-300">
                    +2 123 654 7898
                  </a>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;