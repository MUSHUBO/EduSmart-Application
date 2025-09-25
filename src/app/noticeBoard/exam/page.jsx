
"use client";

import { useEffect, useState } from "react";
import ExamTable from "@/components2/NoticeBoard/ExamTable";

export default function ExamPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/notice/exam-routine");
        const data = await res.json();
        setExams(data);
            console.log("Fetched exams:", data);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <ExamTable exams={exams} />
    </div>
  );
}

