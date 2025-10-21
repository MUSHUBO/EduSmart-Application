"use client";
import { useEffect, useState } from "react";

export default function ChildSelector({ onChange }) {
  const [children, setChildren] = useState([]);
  const [sel, setSel] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("parentToken");
    if (!token) return;
    fetch("/api/parent/children", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.success) { setChildren(d.data); setSel(d.data[0]?._id || ""); if (onChange) onChange(d.data[0]); }});
  }, []);

  return (
    <div className="flex items-center gap-3">
      <select value={sel} onChange={(e) => {
        setSel(e.target.value);
        const c = children.find(ch => String(ch._id) === e.target.value);
        if (onChange) onChange(c);
      }} className="select select-bordered">
        {children.map(c => <option key={c._id} value={c._id}>{c.studentFirstName} {c.studentLastName}</option>)}
      </select>
    </div>
  );
}
