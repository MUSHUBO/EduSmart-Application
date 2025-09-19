"use client";

import { MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className=" py-8 px-6">
      <div className="relative max-w-6xl mx-auto bg-muted dark:bg-muted rounded-2xl shadow-md border border-gray-200 p-8 overflow-hidden">
     
        <div className="absolute top-0 left-0 flex flex-wrap w-24 h-24">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 ${
                i % 2 === 0 ? "bg-primary" : "bg-black"
              }`}
            ></div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
         
          <div className="space-y-4 p-7">
            <button
                                    className="btn border-primary hover:bg-primary shadow-md px-6 border-b-4 border-r-4"
                                >
                                    Contact Us <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
            <h2 className="text-2xl md:text-3xl font-bold text-popover dark:text-popover">
              Feel Free To Connect With Us
            </h2>
            <p className="text-popover-foreground dark:text-popover-foreground text-sm md:text-base">
              We value open communication and are eager to assist you with any
              inquiries. Feel free to reach out to us through any of the
              following contact methods.
            </p>
          </div>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm">
              <MdEmail className="text-primary text-xl" />
              <span className="text-popover-foreground dark:text-popover-foreground">eduSmart@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm">
              <FaPhoneAlt className="text-primary text-xl" />
              <span className="text-popover-foreground dark:text-popover-foreground">+88 9183 23  2309</span>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm">
              <MdLocationOn className="text-primary text-xl" />
              <span className="text-popover-foreground dark:text-popover-foreground">Somewhere in the World</span>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm">
              <MdAccessTime className="text-primary text-xl" />
              <span className="text-popover-foreground dark:text-popover-foreground">Office Hours: 10am - 6pm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
