"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

export default function Library() {

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
    <div className="px-2 md:px-2 lg:px-2 py-6 md:py-6 lg:py-6">
      <div className="text-center max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-popover dark:text-popover">
          Our <span className="text-secondary">Library</span>
        </h2>
        <p className="text-lg text-popover-foreground dark:text-popover-foreground mb-10 mt-3">
          Explore our curated selection of books, from classics to modern masterpieces. Browse by top rated, most commented, or new arrivals.
        </p>
      </div>
      {
        booksData.length > 0 ?
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <span className="text-popover-foreground dark:text-popover-foreground text-sm">({book.comments.length} comments)</span>
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
          :
          <div className="flex justify-center items-center"> 
            <Bars
            height="50"
            width="50"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
           </div>
      }

    </div>
  );
}
