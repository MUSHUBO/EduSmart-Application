"use client";
import { PieChart, Pie, Cell } from "recharts";

export default function FocusGauge({ score = 70 }) {
  const percent = score / 100;
  const data = [
    { name: "filled", value: percent },
    { name: "empty", value: 1 - percent },
  ];

  const COLORS = ["#10b981", "#e5e7eb"]; // green + gray

  return (
    <div className="flex flex-col items-center">
      <PieChart width={160} height={100}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className="text-2xl font-bold text-[var(--popover-foreground)] -mt-4">
        {score}
      </div>
    </div>
  );
}
