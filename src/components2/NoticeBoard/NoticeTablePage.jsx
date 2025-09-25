"use client";

import { useEffect, useState } from "react";
import NoticeTable from "./NoticeTable";


export default function NoticeTablePage() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const res = await fetch("/api/notice/seed");
      const data = await res.json();
      console.log(data)
      setNotices(data);
    };
    fetchNotices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Notice Board</h1>
      <NoticeTable notices={notices} />
    </div>
  );
}
