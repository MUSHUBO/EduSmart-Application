"use client";

import EventList from "@/components2/NoticeBoard/Event/EventList";


export default function EventsPage() {
  return (
    <div className="max-w-[1280px] mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Upcoming Events</h1>
      <EventList
       />
    </div>
  );
}
