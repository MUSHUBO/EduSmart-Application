"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Wishlist() {
  // Dummy wishlist data
  const [wishlist, setWishlist] = useState([]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="p-6 min-h-screen bg-[var(--background)]">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-64 text-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--accent)] text-[var(--secondary-foreground)] p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-2">No Wishlist Items</h2>
            <p className="text-[var(--foreground)]">You haven’t added any items to your wishlist yet. Start exploring courses to add your favorites!</p>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlist.map((item, idx) => (
              <motion.div
                key={item._id}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                variants={fadeUp}
                custom={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-[var(--card-foreground)] rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform"
              >
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1">{item.title}</h2>
                  <p className="text-sm text-[var(--muted-foreground)]">{item.author}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
