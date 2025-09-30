"use client";

import Link from "next/link";
import Image from "next/image";

export default function ContactBanner({ title}) {
  return (
    <section className="relative h-[250px] md:h-[320px] flex items-center justify-center">

      <Image
        src='/assets/contact/02.jpeg'
        alt={title}
        fill
        priority
        className="object-cover"
      />

    
      <div className="absolute inset-0 bg-black/50"></div>

  
      <div className="relative z-10 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>

        <div className="text-sm md:text-base">
          <Link href="/" className="hover:text-[var(--secondary)] transition">
            Home
          </Link>
          <span className="mx-2">&gt;&gt;</span>
          <Link
            href="/contact"
            className="text-[var(--secondary)] font-medium"
          >
            {title}
          </Link>
        </div>
      </div>
    </section>
  );
}
