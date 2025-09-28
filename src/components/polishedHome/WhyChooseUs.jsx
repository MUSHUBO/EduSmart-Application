"use client";

import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaBookOpen, FaLaptopCode, FaTags } from "react-icons/fa";
import Image from "next/image";

const cards = [
    {
        icon: <FaChalkboardTeacher className="text-3xl text-white" />,
        title: "Our Expert Teachers",
        text: "There are many variations of the passages available suffered.",
    },
    {
        icon: <FaBookOpen className="text-3xl text-white" />,
        title: "Courses Material",
        text: "There are many variations of the passages available suffered.",
    },
    {
        icon: <FaLaptopCode className="text-3xl text-white" />,
        title: "Online Courses",
        text: "There are many variations of the passages available suffered.",
    },
    {
        icon: <FaTags className="text-3xl text-white" />,
        title: "Affordable Price",
        text: "There are many variations of the passages available suffered.",
    },
];

// Variants
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function WhyChooseUs() {
    return (
        <section
            style={{
                backgroundImage: "url('/images/teachers/whyImageBg.jpg')",
            }}
            className="relative py-16 px-6 md:px-20 my-10 bg-[#0e4a49] bg-no-repeat bg-left-bottom bg-cover"
        >
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Text & Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                    className=""
                >
                    <motion.p
                        className="text-orange-500 font-semibold uppercase mb-2 tracking-wide"
                        variants={cardVariants}
                    >
                        Why Choose Us
                    </motion.p>

                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-white leading-snug mb-4"
                        variants={cardVariants}
                    >
                        We Are Expert & <span className="text-orange-400">Do Our Best</span> For Your Goal
                    </motion.h2>

                    <motion.p className="text-white/80 mb-8 max-w-md" variants={cardVariants}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when many desktop and web page editors looking at its layout.
                    </motion.p>

                    <motion.div className="grid sm:grid-cols-2 gap-6" variants={containerVariants}>
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#008080]/90 p-5 rounded-lg shadow-md hover:shadow-lg transition text-white"
                                variants={cardVariants}
                            >
                                <div className="mb-3">{card.icon}</div>
                                <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                                <p className="text-sm text-white/90">{card.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={imageVariants}
                >
                    <Image
                        src="/images/teachers/why.jpg"
                        alt="Students"
                        width={370}
                        height={370}
                        className="border-primary border-8 rounded-b-full rounded-tl-full rounded-left-full object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
}
