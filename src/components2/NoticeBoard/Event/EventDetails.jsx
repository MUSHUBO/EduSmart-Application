"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/notice/add-event/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error("Error loading event:", err));
  }, [id]);

  if (!event) {
    return <p className="text-center py-10 text-gray-500">Loading event details...</p>;
  }

  return (
    <section className="py-10 px-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={event.image || "/default-event.jpg"}
          alt={event.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 space-y-3">
          <h1 className="text-2xl font-bold text-gray-800">{event.title}</h1>
          <p className="text-gray-500">📅 {new Date(event.date).toLocaleDateString()}</p>
          <p className="text-gray-600">📍 {event.location}</p>
          <p className="text-gray-700 pt-3">{event.description || "No description available."}</p>

          {/* Book Now Button */}
          <button
            onClick={() => router.push(`/payment?event=${event._id}`)}
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}
