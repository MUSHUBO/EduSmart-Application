"use client";

import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";

export default function Translate() {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);

useEffect(() => {
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,bn,hi,es,ar",
        autoDisplay: false,
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


  const removeTranslateBar = () => {
    document.querySelectorAll(
      "iframe.goog-te-banner-frame, .goog-te-banner-frame, .goog-te-balloon-frame, #goog-gt-tt"
    ).forEach(el => el.remove());
    document.body.style.top = "0px";
  };

 
  removeTranslateBar();
  const observer = setInterval(removeTranslateBar, 1000);
  return () => clearInterval(observer);
}, []);

  // ✅ Change Language
  const changeLanguage = (code) => {
    setLang(code);
    const combo = document.querySelector("select.goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
    }
    setOpen(false);
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "bn", label: "বাংলা" },
    { code: "hi", label: "हिन्दी" },
    { code: "es", label: "Español" },
    { code: "ar", label: "العربية" },
  ];

  return (
    <div className="relative select-none">
      {/* Hidden Google Element */}
      <div
        id="google_translate_element"
        style={{ position: "absolute", left: "-9999px" }}
      />

      {/* 🌐 Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-2 p-2 rounded-full
                   text-[var(--foreground)]
                   hover:bg-[var(--muted)] hover:text-[var(--primary)]
                   transition-all duration-200"
      >
        <FaGlobe className="text-[var(--primary)] w-6 h-6" />
      </button>

      {/* 🌍 Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg border
                     border-[var(--border)] bg-[var(--background)]
                     text-[var(--foreground)] z-50"
        >
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => changeLanguage(l.code)}
              className={`block w-full text-left px-4 py-2 transition-colors
                ${
                  lang === l.code
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "hover:bg-[var(--muted)] hover:text-[var(--primary)]"
                }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
