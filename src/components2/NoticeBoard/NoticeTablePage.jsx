"use client";

import { useEffect, useState } from "react";
import NoticeTable from "./NoticeTable";

export default function NoticeTablePage() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const res = await fetch("/api/notice/seed");
      const data = await res.json();
      setNotices(data);
    };
    fetchNotices();
  }, []);

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Notice Board</h1>
      <div className="overflow-x-auto">
        <NoticeTable notices={notices} />
      </div>
    </div>
  );
}
