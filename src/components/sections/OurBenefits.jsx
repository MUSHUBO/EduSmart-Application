"use client";
import React from "react";
import {
    FaGraduationCap,
    FaCrown,
    FaShieldAlt,
    FaFlag,
    FaFutbol,
    FaHandsHelping,
} from "react-icons/fa";
import { motion } from "framer-motion";

const BenefitsData = [
    {
        title: "Holistic Learning Approach",
        description:
            "Our curriculum focuses on nurturing cognitive, social, emotional, and physical development, ensuring a well-rounded education.",
        icon: <FaGraduationCap />,
    },
    {
        title: "Experienced Educators",
        description:
            "Our passionate and qualified teachers create a supportive and stimulating learning environment.",
        icon: <FaCrown />,
    },
    {
        title: "Nurturing Environment",
        description:
            "We prioritize safety and provide a warm and caring atmosphere for every child.",
        icon: <FaShieldAlt />,
    },
    {
        title: "Play-Based Learning",
        description:
            "We believe in the power of play to foster creativity, problem-solving skills, and imagination.",
        icon: <FaFlag />,
    },
    {
        title: "Individualized Attention",
        description:
            "Our small class sizes enable personalized attention, catering to each child's unique needs.",
        icon: <FaFutbol />,
    },
    {
        title: "Parent Involvement",
        description:
            "We foster a strong parent-school partnership to ensure seamless communication and collaboration.",
        icon: <FaHandsHelping />,
    },
];

const OurBenefits = () => {
    return (
        <div className="my-12 md:my-20 lg:my-28 lg:mt-0 bg-background text-foreground">
            {/* Title */}
            <div className="text-center">
                <h1 className="text-4xl font-bold">Our Benefits</h1>
                <p className="mt-2 text-muted-foreground">
                    With a dedicated team of experienced educators, state-of-the-art facilities, and a comprehensive curriculum,
                    <br /> we aim to lay a strong foundation for your child's future.
                </p>
            </div>

            {/* Card Grid */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 px-4 lg:px-0">
                {BenefitsData.map((benefit, index) => (
                    <motion.div
                        key={index}
                        className="relative bg-[#f3f7fa] dark:bg-[#1b2433] border border-accent/30 rounded-xl p-6 shadow-lg
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: index * 0.15 }}
                    >
                        {/* Icon */}
                        <div className="absolute -top-6 left-6 w-12 h-12 bg-primary text-primary-foreground rounded-md flex items-center justify-center shadow-md border text-xl">
                            {benefit.icon}
                        </div>

                        {/* Text */}
                        <div className="pt-8">
                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground">{benefit.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OurBenefits;