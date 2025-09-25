"use client";

import { useEffect, useState } from "react";
import TypeTable from "./TypeTable";


export default function Type({ type, title }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`/api/notice/type?type=${type}`);
        const data = await res.json();
        setNotices(data);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [type]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title} Notices</h1>
      <TypeTable notices={notices} />
    </div>
  );
}
