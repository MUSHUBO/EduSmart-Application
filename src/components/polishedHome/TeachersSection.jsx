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

const iconVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: (i) => ({
        x: 0,
        opacity: 1,
        transition: {
            delay: i * 0.15, // ek ek kore asar jonno
            duration: 0.4,
            ease: "easeOut",
        },
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

                {/* Teachers Grid */}
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {teachers.map((teacher) => {
                        const [isHovered, setIsHovered] = useState(false);

                        return (
                            <motion.div
                                key={teacher.id}
                                className="relative bg-card shadow-md rounded-xl overflow-hidden group cursor-pointer"
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {/* Image */}
                                <div className="relative w-full h-72">
                                    <img
                                        src={teacher.img}
                                        alt={teacher.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Social Icons */}
                                    <motion.div className="absolute top-3 right-3 flex flex-col gap-3">
                                        {[
                                            teacher.socials.facebook,
                                            teacher.socials.twitter,
                                            teacher.socials.linkedin,
                                            teacher.socials.instagram,
                                        ].map((link, i) => (
                                            //   <motion.a
                                            //     key={i}
                                            //     href={link}
                                            //     target="_blank"
                                            //     rel="noopener noreferrer"
                                            //     custom={i}
                                            //     variants={iconVariants}
                                            //     initial="hidden"
                                            //     animate={isHovered ? "visible" : "hidden"}
                                            //     className="bg-primary text-white p-2 rounded-full shadow hover:bg-primary/80"
                                            //   >
                                            //     {i === 0 && <FaFacebookF />}
                                            //     {i === 1 && <FaTwitter />}
                                            //     {i === 2 && <FaLinkedinIn />}
                                            //     {i === 3 && <FaInstagram />}
                                            //   </motion.a>
                                            <motion.a
                                                key={i}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                custom={i}
                                                variants={iconVariants}
                                                initial="hidden"
                                                animate={isHovered ? "visible" : "hidden"}
                                                transition={{
                                                    x: { type: "tween", duration: 0.5 },
                                                    opacity: { duration: 0.5, delay: isHovered ? i * 0.15 : 1 }, // hover-out e 1s wait kore fade
                                                }}
                                                className="bg-primary text-white p-2 rounded-full shadow hover:bg-primary/80"
                                            >
                                                {i === 0 && <FaFacebookF />}
                                                {i === 1 && <FaTwitter />}
                                                {i === 2 && <FaLinkedinIn />}
                                                {i === 3 && <FaInstagram />}
                                            </motion.a>

                                        ))}
                                    </motion.div>
                                </div>

                                {/* Info */}
                                <div className="text-center flex justify-between my-5">
                                    <div className="pl-5">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {teacher.name}
                                        </h3>
                                        <p className="text-primary font-medium text-sm mt-1">
                                            {teacher.role}
                                        </p>
                                    </div>
                                    <div className="border rounded-l-2xl p-3 text-center bg-primary/80">
                                        <FaShare />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
