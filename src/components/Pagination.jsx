
import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(totalPages, page + 1));

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={prev}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-slate-700 text-sm">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>
      <button
        onClick={next}
        disabled={page === totalPages}
        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
