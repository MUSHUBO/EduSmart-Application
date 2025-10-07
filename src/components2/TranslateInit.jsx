// "use client";
// import { useEffect } from "react";

// export default function TranslateInit() {
//   useEffect(() => {
//     if (document.getElementById("googleTranslateScript")) return;

//     const script = document.createElement("script");
//     script.id = "googleTranslateScript";
//     script.src =
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     script.async = true;
//     document.body.appendChild(script);

//     window.googleTranslateElementInit = function () {
//       if (!document.getElementById("google_translate_element")) return;
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,bn",
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element"
//       );
//     };
//   }, []);

//   return <div id="google_translate_element" className="hidden" />;
// }
