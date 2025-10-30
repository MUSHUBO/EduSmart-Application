"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/notice/add-event")
      .then((res) => {
        setEvents(res.data.events || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Loading events...</p>;
  }

  if (events.length === 0) {
    return <p className="text-center text-gray-500 py-10">No events found.</p>;
  }

  return (
    <section className="py-10 px-4 md:px-10">
      <h2 className="text-2xl font-bold text-center mb-8">Upcoming Events</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="relative bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden border border-base-300"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={event.image || "/placeholder.jpg"}
                alt={event.title}
                className="w-full h-48 object-cover"
              />

              {/* Fees Tag */}
              {event.fees && (
                <div className="absolute top-2 right-2 bg-primary text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md">
                  ${event.fees}
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold line-clamp-1">{event.title}</h3>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPin size={14} className="mr-1" />
                <span className="truncate">{event.location}</span>
              </div>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={14} className="mr-1" />
                <span>
                  {new Date(event.startDate).toLocaleDateString()} -{" "}
                  {new Date(event.endDate).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {event.details}
              </p>

              {/* Buttons */}
              <div className="flex justify-between items-center pt-3">
                <Link
                href={`/noticeBoard/event/${event._id}`}
                className="text-sm font-medium text-primary hover:underline"
                >
                View Details
                </Link>


                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => alert("Redirect to payment page (coming soon)")}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
