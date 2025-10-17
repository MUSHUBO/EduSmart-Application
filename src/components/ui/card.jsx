
"use client";

export function Card({ children, className }) {
  return <div className={`bg-gray-800/80 border border-gray-700 rounded-2xl shadow-md p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }) {
  return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h2 className={`text-xl font-bold text-white ${className}`}>{children}</h2>;
}

export function CardContent({ children, className }) {
  return <div className={`text-gray-300 ${className}`}>{children}</div>;
}
