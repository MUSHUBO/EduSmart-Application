"use client";

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Star } from "lucide-react";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import { motion } from "framer-motion";

export default function MyCreatedBooks() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/myAddBooks?email=${user.email}`);
        const data = await res.json();
        if (data.success) {
          setBooks(data.data);
        } else {
          console.error("Failed to fetch books:", data.message);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading your created books...
      </div>
    );

  return (
    <div className="w-11/12 mx-auto py-14 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary flex items-center justify-center gap-3">
        <BookOpen size={36} /> My Created Books
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          You haven’t created any books yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book, i) => (
            <motion.div
              key={book._id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:-translate-y-1 hover:border-primary flex flex-col"
            >
              {/* Book Image */}
              <div className="relative w-full h-60">
                {/* {book.photoUrl ? (
                  <Image
                    src={book.photoUrl}
                    alt={book.name}
                    width={400}
                    height={240}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )} */}
                <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 text-sm rounded-md">
                  {book.category || "Uncategorized"}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {book.name?.slice(0, 40) || "Untitled Book"}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {book.description?.slice(0, 120) || "No description available."}
                  {book.description?.length > 120 && "..."}
                </p>

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center text-sm text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <BookOpen size={16} className="text-primary" />
                    {book.edition || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    {book.rating?.length ? book.rating[0] : "N/A"}
                  </span>
                </div>

                <Link
                  href={book.pdfDriveUrl}
                  target="_blank"
                  className="mt-auto inline-block text-center w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary/90 transition-all"
                >
                  View PDF
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
