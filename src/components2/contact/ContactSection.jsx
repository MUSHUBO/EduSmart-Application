"use client";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  { icon: <MapPin size={36} />, title: "Office Address", details: "Dhaka, Bangladesh" },
  { icon: <Phone size={36} />, title: "Call Us", details: "+8801912716966" },
  { icon: <Mail size={36} />, title: "Email Us", details: "edusmartbd@gmail.com" },
  { icon: <Clock size={36} />, title: "Open Time", details: "Mon - Fri (10.00AM - 5.00PM)" },
];

export default function ContactSection() {
  return (
    <section className="py-12 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {contactInfo.map((item, i) => (
          <div
            key={i}
            className="bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow-md hover:shadow-lg p-6 text-center transition-all duration-300 border-b-6 border-primary border-r-4 "
          >
           
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] mb-4">
              {item.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm">{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
