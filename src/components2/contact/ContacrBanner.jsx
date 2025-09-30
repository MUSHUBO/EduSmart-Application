"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
export default function ContactBanner({ title}) {
  return (
    <section className="relative w-full h-[70vh] md:h-[50vh] overflow-hidden flex items-center justify-center">

      <Image
        src='/assets/achievements-imgs/01.jpg'
        alt='Student Contact'
        fill
        priority
        className="object-cover object-center z-0 opacity-95"
      />


          <div className="absolute inset-0 bg-black/40 z-10"></div>
    
         
          <motion.div
            className="relative z-20 text-center px-4 md:px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             
           
     
            <div className="text-xl text-primary mb-3">
              <Link href="/" className="hover:underline text-white">
                Home
              </Link>{" "}
              <span className="mx-2">››</span>{" "}
              <span className="font-semibold text-primary">Contact US</span>
            </div>
          </motion.div>
      

  
      
      
    </section>
  );
}
