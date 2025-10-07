"use client";

import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";

export default function GoogleTranslate() {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);

  // Initialize Google Translate
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,bn",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    if (!document.getElementById("googleTranslateScript")) {
      const script = document.createElement("script");
      script.id = "googleTranslateScript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  // Change language
  const changeLanguage = (code) => {
    setLang(code);
    const combo = document.querySelector("select.goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
    } else {
      const host = window.location.hostname.replace(/^www\./, "");
      document.cookie = `googtrans=/en/${code};path=/;domain=${host}`;
      document.cookie = `googtrans=/en/${code};path=/;`;
      window.location.reload();
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Hidden Google Element */}
      <div
        id="google_translate_element"
        style={{ position: "absolute", left: "-9999px", top: 0 }}
      />

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2  py-2  p-2 cursor-pointer rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors "
      >
        <FaGlobe className=" text-primary  transition md:w-6 md:h-6  lg:w-7 h-7" />
   
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
          <button
            onClick={() => changeLanguage("en")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            En
          </button>
          <button
            onClick={() => changeLanguage("bn")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Bn
          </button>
        </div>
      )}
    </div>
  );
}
