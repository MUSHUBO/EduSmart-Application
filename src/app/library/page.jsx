"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Library() {
  // const libraryData = [
  //   {
  //     id: 1,
  //     name: "Mathematics for Beginners",
  //     image: "https://i.ibb.co.com/cc6LpMp7/9781474998543-Mathematics-for-Beginners-Hardcover-Usborne-Books-02-cc4e2511-b7f0-49a7-8836-f1139e847.webp",
  //     rating: 4.5,
  //     comments: 120,
  //   }
  // ];

  const [booksData, setbooksData] = useState([]);

  useEffect(() => {
    axios.get("/api/books")
      .then((res) => {
        console.log("Data:", res.data.data);
        setbooksData(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="px-6 md:px-9 lg:px-12 py-12 md:py-18 lg:py-24">
      <div className="text-center max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-popover dark:text-popover">
          Our <span className="text-secondary">Library</span>
        </h2>
        <p className="text-lg text-popover-foreground dark:text-popover-foreground mb-10 mt-3">
          Explore our curated selection of books, from classics to modern masterpieces. Browse by top rated, most commented, or new arrivals.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {booksData.map((book) => (
          <div key={book._id} className="bg-muted dark:bg-muted rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img src={book.photoUrl} alt={book.name} className="w-full h-52 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">{book.name}</h2>
              <div className="flex items-center justify-between mb-2">
                <div className="text-secondary mr-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.floor(book.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-popover-foreground dark:text-popover-foreground text-sm">({book.comments} comments)</span>
              </div>
              <Link href={`/library/${book._id}`}  >
              <button className="w-full bg-primary/90 text-white py-2 rounded hover:bg-primary duration-300 cursor-pointer transition-colors">


                
                  View
                  </button>
                </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
