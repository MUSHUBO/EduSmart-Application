import React from "react";

export default function Library() {
 const libraryData = [
  {
    id: 1,
    name: "Mathematics for Beginners",
    image: "https://i.ibb.co.com/cc6LpMp7/9781474998543-Mathematics-for-Beginners-Hardcover-Usborne-Books-02-cc4e2511-b7f0-49a7-8836-f1139e847.webp",
    rating: 4.5,
    comments: 120,
  },
  {
    id: 2,
    name: "Physics Essentials",
    image: "https://i.ibb.co.com/999vKTDB/images.png",
    rating: 4.8,
    comments: 200,
  },
  {
    id: 3,
    name: "Introduction to Chemistry",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    comments: 150,
  },
  {
    id: 4,
    name: "Biology Simplified",
    image: "https://i.ibb.co.com/DPjnX6zy/download.jpg",
    rating: 4.7,
    comments: 170,
  },
  {
    id: 5,
    name: "World History Overview",
    image: "https://i.ibb.co.com/QvQDSmWP/TIMEGRID-POSTCLASSICAL-AP-WORLD-HISTORY-FREEMANPEDIA.webp",
    rating: 4.2,
    comments: 90,
  },
  {
    id: 6,
    name: "Geography Made Easy",
    image: "https://i.ibb.co.com/d40F1bsk/geooo-768x512.webp",
    rating: 4.4,
    comments: 130,
  },
  {
    id: 7,
    name: "English Grammar Guide",
    image: "https://i.ibb.co.com/fVQZsth1/download.jpg",
    rating: 4.6,
    comments: 110,
  },
  {
    id: 8,
    name: "Economics Principles",
    image: "https://i.ibb.co.com/d4MkG6kN/images.jpg",
    rating: 4.5,
    comments: 125,
  }
];



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
                {libraryData.map((book) => (
                    <div key={book.id} className="bg-muted dark:bg-muted rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        <img src={book.image} alt={book.name} className="w-full h-52 object-cover" />
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
                            <button className="w-full bg-secondary text-white py-2 rounded hover:bg-primary duration-300 cursor-pointer transition-colors">
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
