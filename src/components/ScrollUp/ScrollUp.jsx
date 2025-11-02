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
            if (window.scrollY > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="hidden md:flex fixed bottom-12 right-5 w-11 h-11 bg-primary text-muted hover:text-primary border-2 border-primary hover:bg-muted rounded-md justify-center items-center transform -rotate-90 hover:-translate-y-1 duration-500 ease-in-out cursor-pointer"
                >
                    <MdOutlineDoubleArrow size={36} />
                </button>
            )}

            <audio ref={audioRef} src="/audio/back-to-top.mp3" />
        </div>
    );
};

export default ScrollUp;