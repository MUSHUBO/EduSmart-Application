"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

export default function SearchNotice() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("date");

  const handleSearch = () => {
    console.log("Searching:", query, "Sorting by:", sort);
  };

  return (
    <div className="bg-background text-foreground rounded-xl shadow p-3 flex flex-col md:flex-row items-center gap-3 w-full">
      {/* 🔍 Search Input */}
      <div className="flex items-center w-full md:flex-1 bg-muted rounded-lg px-3 py-2">
        <Search className="w-5 h-5 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Search notices by content or department..."
          className="bg-transparent outline-none w-full text-foreground placeholder:text-muted-foreground"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* 📅 Sort Dropdown */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg px-3 py-2 bg-background text-foreground shadow-sm"
      >
        <option value="date">Sort by Date</option>
        <option value="department">Sort by Department</option>
      </select>

      {/* ✅ Apply Filters Button */}
      <button
        onClick={handleSearch}
        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
      >
        <Filter className="w-5 h-5" />
        Apply Filters
      </button>
    </div>
  );
}
