import React from "react";

export default function Library() {
 const libraryData = [
  {
    id: 1,
    name: "The Great Gatsby",
    image: "https://images.unsplash.com/photo-1581092795369-8ef6fa8f1b1c?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    comments: 120,
  },
  {
    id: 2,
    name: "To Kill a Mockingbird",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    comments: 200,
  },
  {
    id: 3,
    name: "1984",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    comments: 150,
  },
  {
    id: 4,
    name: "Pride and Prejudice",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    comments: 170,
  },
  {
    id: 5,
    name: "Moby Dick",
    image: "https://images.unsplash.com/photo-1523475496153-3b7f6e0e81f1?auto=format&fit=crop&w=400&q=80",
    rating: 4.2,
    comments: 90,
  },
  {
    id: 6,
    name: "War and Peace",
    image: "https://images.unsplash.com/photo-1576101815422-b7e1784f23f8?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    comments: 130,
  },
  {
    id: 7,
    name: "Hamlet",
    image: "https://images.unsplash.com/photo-1590487981018-bf7b83a6b8e5?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    comments: 110,
  },
  {
    id: 8,
    name: "The Odyssey",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    comments: 95,
  },
  {
    id: 9,
    name: "Crime and Punishment",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    comments: 125,
  },
  {
    id: 10,
    name: "The Catcher in the Rye",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    rating: 4.1,
    comments: 100,
  },
  {
    id: 11,
    name: "Jane Eyre",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    comments: 115,
  },
  {
    id: 12,
    name: "Brave New World",
    image: "https://images.unsplash.com/photo-1531219432768-9f7d601e3b1d?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    comments: 140,
  },
];


    return (
        <div className="py-12 md:py-18 lg:py-24">
            <div className="text-center max-w-3xl mx-auto px-6">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-popover dark:text-popover">
                    Our <span className="text-secondary">Library</span>
                </h2>
                <p className="text-lg text-popover-foreground dark:text-popover-foreground mb-10 mt-3">
                     Explore our curated selection of books, from classics to modern masterpieces. Browse by top rated, most commented, or new arrivals.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {libraryData.map((book) => (
                    <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        <img src={book.image} alt={book.name} className="w-full h-52 object-cover" />
                        <div className="p-4">
                            <h2 className="font-semibold text-lg mb-2">{book.name}</h2>
                            <div className="flex items-center mb-2">
                                <div className="text-yellow-400 mr-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i}>
                                            {i < Math.floor(book.rating) ? "★" : "☆"}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-gray-600 text-sm">({book.comments} comments)</span>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
