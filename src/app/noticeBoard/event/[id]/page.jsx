"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch("/api/notice/add-event")
      .then((res) => res.json())
      .then((data) => {
        const found = data.events.find((e) => e._id === id);
        setEvent(found);
      })
      .catch(console.error);
  }, [id]);

  if (!event) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4  my-4 space-y-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <img
        src={event.image || "/placeholder.jpg"}
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <p><strong>Location:</strong> {event.location}</p>
      <p>
        <strong>Dates:</strong> {new Date(event.startDate).toLocaleDateString()} -{" "}
        {new Date(event.endDate).toLocaleDateString()}
      </p>
      <p><strong>Fees:</strong> ${event.fees}</p>
      <p>{event.details}</p>

      <button
        className="btn btn-primary"
        onClick={() => alert("Redirect to payment page (coming soon)")}
      >
        Book Now
      </button>
    </div>
  );
}
