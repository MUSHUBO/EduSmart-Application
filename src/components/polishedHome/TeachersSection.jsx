"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaShare,
} from "react-icons/fa";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Social Icon Animation (right → left)
const iconVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.45, ease: "easeOut" },
  }),
};

const teachers = [
  {
    id: 1,
    name: "Angela T. Vigil",
    role: "Associate Professor",
    img: "/images/teachers/01.jpg",
    socials: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: 2,
    name: "Frank A. Mitchell",
    role: "Associate Professor",
    img: "/images/teachers/02.jpg",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    name: "Susan D. Lunsford",
    role: "CEO & Founder",
    img: "/images/teachers/03.jpg",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 4,
    name: "Dennis A. Pruitt",
    role: "Associate Professor",
    img: "/images/teachers/04.jpg",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
];

export default function TeachersSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold uppercase tracking-wide">
            Our Teachers
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
            Meet With Our <span className="text-primary">Teachers</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground text-sm md:text-base">
            It is a long established fact that a reader will be distracted by the
            readable content.
          </p>
        </motion.div>

        {/* Teachers Grid */}
        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {teachers.map((teacher) => {
            const [isHovered, setIsHovered] = useState(false);

            return (
              <motion.div
                key={teacher.id}
                className="relative bg-card shadow-md rounded-xl overflow-hidden group cursor-pointer p-4"
                variants={cardVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Image */}
                <div className="relative w-full h-72 overflow-hidden rounded-lg">
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Social Icons (center vertically) */}
                  <div className="absolute inset-0 flex items-center justify-end">
                    <div className="flex flex-col gap-4">
                      {[
                        teacher.socials.facebook,
                        teacher.socials.twitter,
                        teacher.socials.linkedin,
                        teacher.socials.instagram,
                      ].map((link, i) => (
                        <motion.a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          custom={i}
                          variants={iconVariants}
                          initial="hidden"
                          animate={isHovered ? "visible" : "hidden"}
                          className="bg-primary text-white p-3 rounded-full shadow 
                                     transition-colors duration-300 
                                     hover:bg-secondary"
                        >
                          {i === 0 && <FaFacebookF />}
                          {i === 1 && <FaTwitter />}
                          {i === 2 && <FaLinkedinIn />}
                          {i === 3 && <FaInstagram />}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex justify-between items-center mt-5">
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-foreground">
                      {teacher.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mt-1">
                      {teacher.role}
                    </p>
                  </div>
                  <div
                    className="border rounded-full p-3 bg-primary/80 text-white cursor-pointer 
                               transition-colors duration-300 hover:bg-secondary"
                  >
                    <FaShare />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
