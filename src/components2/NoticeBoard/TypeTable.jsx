"use client";

import { useState } from "react";

export default function TypeTable({ notices = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotices = notices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-background text-foreground p-4 rounded shadow overflow-x-auto">
      <table className="table-auto w-full text-sm sm:text-base">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Download</th>
            <th className="p-2">View</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.map((n) => (
            <tr key={n._id} className="border-b hover:bg-primary-foreground">
              <td className="p-2 text-center">
                {n.download ? (
                  <a
                    href={n.download}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    📂 Download
                  </a>
                ) : (
                  "—"
                )}
              </td>
              <td className="p-2 text-center">
                {n.view ? (
                  <a
                    href={n.view}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:underline"
                  >
                    👁 View
                  </a>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
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
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
