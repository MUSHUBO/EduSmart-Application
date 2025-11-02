"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";

const ScrollUp = () => {
    const audioRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.05;
            audioRef.current.play();
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-3 sm:bottom-12 sm:right-6
                     w-10 h-10 md:w-11 md:h-11
                     bg-primary text-muted hover:text-primary border-2 border-primary hover:bg-muted
                     rounded-md flex justify-center items-center transform -rotate-90 hover:-translate-y-1
                     duration-300 ease-in-out cursor-pointer z-50"
                >
                    <MdOutlineDoubleArrow
                        size={36}
                        className="w-8 h-8 md:w-10 md:h-10"
                    />
                </button>
            )}

            <audio ref={audioRef} src="/audio/back-to-top.mp3" />
        </>
    );
};

export default ScrollUp;