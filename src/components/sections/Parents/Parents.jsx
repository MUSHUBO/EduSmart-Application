"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
const people = [
  {
    id: 1,
    name: "Michael Carter",
    role: "Father of Grade 6 Student",
    email: "michael.carter@example.com",
    profile: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Mother of Grade 4 Student",
    email: "emily.johnson@example.com",
    profile: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 3,
    name: "David Martinez",
    role: "Father of Grade 8 Student",
    email: "david.martinez@example.com",
    profile: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: 4,
    name: "Sophia Brown",
    role: "Mother of Grade 5 Student",
    email: "sophia.brown@example.com",
    profile: "https://randomuser.me/api/portraits/women/46.jpg"
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Father of Grade 7 Student",
    email: "james.wilson@example.com",
    profile: "https://randomuser.me/api/portraits/men/29.jpg"
  },
  {
    id: 6,
    name: "Olivia Anderson",
    role: "Mother of Grade 3 Student",
    email: "olivia.anderson@example.com",
    profile: "https://randomuser.me/api/portraits/women/71.jpg"
  },
  {
    id: 7,
    name: "Robert Garcia",
    role: "Father of Grade 9 Student",
    email: "robert.garcia@example.com",
    profile: "https://randomuser.me/api/portraits/men/21.jpg"
  },
  {
    id: 8,
    name: "Isabella Lee",
    role: "Mother of Grade 2 Student",
    email: "isabella.lee@example.com",
    profile: "https://randomuser.me/api/portraits/women/15.jpg"
  }
];

const safeImage = e => {
    const target = e.target;
    target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [breakpoint]);
    return isMobile;
};
export default function Parents() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const isMobile = useIsMobile();
    const containerRadius = isMobile ? 130 : 200;
    const profileSize = isMobile ? 60 : 80;
    const containerSize = containerRadius * 2 + 100;
    const getRotation = React.useCallback(index => (index - activeIndex) * (360 / people.length), [activeIndex]);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    const next = () => setActiveIndex(i => (i + 1) % people.length);
    const prev = () => setActiveIndex(i => (i - 1 + people.length) % people.length);
    const handleProfileClick = React.useCallback(index => {
        if (index === activeIndex) return;
        setActiveIndex(index);
    }, [activeIndex]);
    React.useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'ArrowLeft') prev(); else if (event.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return <div className="flex flex-col items-center p-4 relative min-h-[400px] transition-colors duration-300">

        <div data-aos="fade-up" className="text-center max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-popover dark:text-popover">
                Our <span className="text-secondary">Parents Say's </span>
            </h2>
            <p className="text-lg text-popover-foreground dark:text-popover-foreground mb-10 mt-3">
                parents share their honest experiences and stories. Their words inspire us to keep growing together.
            </p>
        </div>

        <div className="relative flex items-center justify-center" style={{
            width: containerSize,
            height: containerSize
        }}>
            { }
            <div className="absolute rounded-full border border-secondary/70 dark:border-gray-700" style={{
                width: containerRadius * 2,
                height: containerRadius * 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }} />

            { }
            <AnimatePresence mode="wait">
                <motion.div key={people[activeIndex].id} initial={{
                    opacity: 0,
                    scale: 0.95
                }} animate={{
                    opacity: 1,
                    scale: 1
                }} exit={{
                    opacity: 0,
                    scale: 0.95
                }} transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }} className="z-10 bg-primary dark:bg-primary backdrop-blur-sm shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 rounded-xl p-3 md:p-4 w-48 md:w-52 text-center">
                    <motion.img initial={{
                        opacity: 0,
                        scale: 0.8
                    }} animate={{
                        opacity: 1,
                        scale: 1
                    }} transition={{
                        duration: 0.3,
                        delay: 0.1
                    }} src={people[activeIndex].profile} alt={people[activeIndex].name} onError={safeImage} className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto -mt-10 md:-mt-12 border-4 border-white dark:border-black object-cover shadow-md" />
                    <motion.div initial={{
                        opacity: 0,
                        y: 5
                    }} animate={{
                        opacity: 1,
                        y: 0
                    }} transition={{
                        duration: 0.3,
                        delay: 0.15
                    }}>
                        <h2 className="mt-2 text-base md:text-lg font-bold text-gray-950">
                            {people[activeIndex].name}
                        </h2>
                        <div className="flex items-center justify-center text-xs md:text-sm text-gray-700 mt-1">
                            <Briefcase size={12} className="mr-1" />
                            <span className="truncate">{people[activeIndex].role}</span>
                        </div>
                        <div className="flex items-center justify-center text-xs text-gray-600 mt-0.5">
                            <Mail size={12} className="mr-1" />
                            <span className="truncate">{people[activeIndex].email}</span>
                        </div>
                    </motion.div>
                    <motion.div initial={{
                        opacity: 0
                    }} animate={{
                        opacity: 1
                    }} transition={{
                        duration: 0.3,
                        delay: 0.2
                    }} className="flex justify-center items-center mt-3 space-x-2">
                        <button onClick={prev} className="p-1.5 cursor-pointer rounded-full bg-secondary transition-colors">
                            <ChevronLeft size={16} className="text-gray-300 font-bold" />
                        </button>

                        <button className="px-4 py-1 text-sm cursor-pointer rounded-full bg-secondary text-white  dark:bg-secondary/95 transition-colors">
                            Connect
                        </button>



                        <button onClick={next} className="p-1.5 cursor-pointer rounded-full bg-secondary transition-colors">
                            <ChevronRight size={16} className="text-gray-300 font-bold" />
                        </button>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            { }
            {people.map((p, i) => {
                const rotation = getRotation(i);
                return <motion.div key={p.id} animate={{
                    transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`
                }} transition={{
                    duration: 0.8,
                    ease: [0.34, 1.56, 0.64, 1]
                }} style={{
                    width: profileSize,
                    height: profileSize,
                    position: "absolute",
                    top: `calc(50% - ${profileSize / 2}px)`,
                    left: `calc(50% - ${profileSize / 2}px)`
                }}>
                    { }
                    <motion.div animate={{
                        rotate: -rotation
                    }} transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1]
                    }} className="w-full h-full">
                        <motion.img src={p.profile} alt={p.name} onError={safeImage} onClick={() => handleProfileClick(i)} whileHover={{
                            scale: 1.1
                        }} whileTap={{
                            scale: 0.95
                        }} className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300 ${i === activeIndex ? "border-4 border-secondary dark:border-secondary/hover:border-secondary/90 shadow-lg" : "border-2 border-gray-300 dark:border-gray-600 hover:border-secondary/90 dark:hover:border-secondary"}`} />
                    </motion.div>
                </motion.div>;
            })}
        </div>
    </div>;
}