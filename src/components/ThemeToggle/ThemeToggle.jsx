"use client";
import { FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { useEffect, useState } from "react";

export default function ThemeToggle() {

  // theme changer 

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Apply theme to html element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <div className="p-0.5 rounded-full hover:bg-primary/30 duration-500 max-w-19 fixed top-40 -rotate-90 z-20">
      <div className="p-1 rounded-full bg-primary/30">
        <label
          className={`relative flex items-center cursor-pointer w-14 h-8 border-2 border-primary rounded-full transition-colors duration-300 ${(theme !== "dark") ? "bg-[#010515]" : "bg-[#FAFAFA]"
            }`}
        >
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleToggle}
            className="sr-only"
          />

          {/* Toggle knob */}
          <div
            className={`absolute w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${(theme !== "dark") ? "translate-x-6 bg-transparent" : "bg-transparent"
              }`}
          >
            {(theme === "dark") ? (
              <FaMoon className="text-primary p-1.5 rotate-45 text-2xl bg-[#010515] rounded-full" />
             
            ) : (
               <MdSunny className="text-primary p-1.5 text-[24px] bg-[#FAFAFA] rounded-full" />
            )}
          </div>
        </label>
      </div>
    </div>


  );
}

