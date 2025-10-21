"use client";
import { PieChart, Pie, Cell } from "recharts";

export default function FocusGauge({ score = 70 }) {
  const percent = Math.max(0, Math.min(100, +score));
  const data = [
    { name: "filled", value: percent },
    { name: "empty", value: 100 - percent },
  ];
  const COLORS = ["#10b981", "#e6e6e6"]; 

  return (
    <div className="flex flex-col items-center">
      <PieChart width={180} height={110}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={52}
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
      <div className="mt-[-32px] text-2xl font-bold text-[var(--popover-foreground)]">{percent}</div>
      <div className="text-sm text-[var(--muted-foreground)]">Focus</div>
    </div>
  );
}
