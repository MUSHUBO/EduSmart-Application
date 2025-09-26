"use client";

import { useState } from "react";

export default function NoticeTable({ notices = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotices = notices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-background text-foreground p-4 rounded shadow w-full">
      <h2 className="font-semibold mb-4 text-lg text-center sm:text-left">
        Notices
      </h2>

      {/* Table for medium screens and above */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm sm:text-base border-collapse">
          <thead>
            <tr className="text-left border-b bg-muted">
              <th className="p-2 whitespace-nowrap">Date</th>
              <th className="p-2 whitespace-nowrap">Title</th>
              <th className="p-2 whitespace-nowrap">Department</th>
              <th className="p-2 whitespace-nowrap">Download</th>
              <th className="p-2 whitespace-nowrap">View</th>
            </tr>
          </thead>
          <tbody>
            {currentNotices.map((n) => (
              <tr
                key={n._id}
                className="border-b hover:bg-primary-foreground transition-colors"
              >
                <td className="p-2 whitespace-nowrap">
                  {n.date ? new Date(n.date).toLocaleDateString() : "—"}
                </td>
                <td className="p-2 break-words">{n.title}</td>
                <td className="p-2 whitespace-nowrap">{n.department}</td>
                <td className="p-2">
                  {n.download ? (
                    <a
                      href={n.download}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      📂
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2">
                  {n.view ? (
                    <a
                      href={n.view}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:underline"
                    >
                      👁
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="sm:hidden flex flex-col gap-3">
        {currentNotices.map((n) => (
          <div
            key={n._id}
            className="border rounded-lg p-4 shadow-sm bg-muted flex flex-col gap-2"
          >
            <div className="flex justify-between text-sm">
              <span className="font-semibold">📅 Date:</span>
              <span>{n.date ? new Date(n.date).toLocaleDateString() : "—"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">📌 Title:</span>
              <span className="text-right">{n.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">🏢 Department:</span>
              <span>{n.department}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">📂 Download:</span>
              {n.download ? (
                <a
                  href={n.download}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Download
                </a>
              ) : (
                "—"
              )}
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">👁 View:</span>
              {n.view ? (
                <a
                  href={n.view}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:underline"
                >
                  View
                </a>
              ) : (
                "—"
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition"
        >
          ⬅ Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border transition ${
              currentPage === page
                ? "bg-blue-500 text-white font-bold"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
