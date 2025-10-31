"use client";

import { useEffect, useState } from "react";

import SearchNotice from "./SearchNotice";
import NoticeTablePage from "./NoticeTablePage";
import ExamPage from "./UpcomingExam";
import EventList from "./Event/EventList";
import StatsCards from "./StatsCard";

export default function NoticeBoard() {
  const [stats, setStats] = useState({});
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("/api/notice/seed")
      .then((res) => res.json())
      .then((data) => setNotices(data));
  }, []);

  const weeklyAttendance = [
    { day: "Sun", present: 960, absent: 40 },
    { day: "Mon", present: 950, absent: 50 },
    { day: "Tue", present: 900, absent: 80 },
    { day: "Wed", present: 980, absent: 20 },
    { day: "Thu", present: 970, absent: 30 },
  ];

  const dataByDept = [
    { name: "Science", value: 12 },
    { name: "Arts", value: 8 },
    { name: "Commerce", value: 6 },
    { name: "Sports", value: 15 },
    { name: "Cultural", value: 10 },
  ];

  const deptColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="mx-auto max-w-[1280px] space-y-6 p-3 sm:p-4 md:p-6 text-foreground">
  
{/* 💖 Elegant Breaking News Section */}
<div className="relative bg-gradient-to-r from-[#FF416C] via-[#FF4B2B] to-[#FF9966] text-white rounded-xl shadow-lg overflow-hidden border border-[#ffb199]/60">
  <div className="flex flex-col sm:flex-row items-center py-3 px-4 gap-3">
    {/* Title */}
    <span className="font-bold text-white text-sm sm:text-base md:text-lg flex items-center tracking-wide drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">
      BREAKING NEWS
      <span className="mx-2 text-white text-lg font-extrabold">|</span>
    </span>

    {/* Marquee Section */}
    <div className="overflow-hidden w-full relative">
      {/* Soft Fade on Edges */}
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[#FF416C] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#FF9966] to-transparent pointer-events-none"></div>

      {/* Moving Text */}
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "marquee 110s linear infinite",
        }}
        className="text-xs sm:text-sm md:text-base text-white"
      >
        {notices.length > 0 ? (
          notices.map((n, i) => {
            const daysAgo = [2, 5, 8, 10, 12][i % 5];
            return (
              <span
                key={i}
                className="mr-20 inline-block px-4 py-1 rounded-md bg-white/20 hover:bg-white/30 backdrop-blur-sm font-medium transition-all"
              >
                <span className="text-yellow-200 font-semibold">
                  {daysAgo} days ago:
                </span>{" "}
                <span className="text-white">{n.title}</span>{" "}
                <a
                  href={n.view}
                  target="_blank"
                  className="underline text-yellow-300 hover:text-white"
                >
                  View
                </a>
              </span>
            );
          })
        ) : (
          <span>✨ No new notices right now</span>
        )}
      </div>
    </div>
  </div>

  {/* Animation */}
  <style jsx>{`
    @keyframes marquee {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `}</style>
</div>





      {/* Top Stats */}
     
<StatsCards></StatsCards>
    <EventList></EventList>

       

      {/* Other Sections */}
      <div className="space-y-3">
        <ExamPage></ExamPage>
        <SearchNotice />
        <NoticeTablePage />
      </div>
    </div>
  );
}
