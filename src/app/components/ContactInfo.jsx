"use client";

import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-primary">
        Feel Free To Connect With Us
      </h2>
      <p className="text-center text-gray-600 mb-6">
        We value open communication and are here to support you. 
        Feel free to reach us through any of the following contact methods.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
        <div className="border rounded-lg p-5 shadow-sm flex flex-col items-center bg-accent/30">
          <MdEmail className="text-3xl text-primary mb-2" />
          <a href="mailto:info@example.com" className="text-primary font-medium">
            info@example.com
          </a>
        </div>

        <div className="border rounded-lg p-5 shadow-sm flex flex-col items-center bg-accent/30">
          <MdPhone className="text-3xl text-primary mb-2" />
          <span className="font-medium">+91 98765 43210</span>
        </div>

        <div className="border rounded-lg p-5 shadow-sm flex flex-col items-center bg-accent/30">
          <MdLocationOn className="text-3xl text-primary mb-2" />
          <span className="font-medium">Office Hours: 9am – 6pm</span>
        </div>
      </div>
    </div>
  );
}
