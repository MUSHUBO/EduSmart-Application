import { useEffect, useState } from "react";
import { Users, Bell, Calendar, Trophy } from "lucide-react";

export default function StatsCards() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch("/api/notice/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, []);

  const cards = [
    { icon: Users, title: "Total Students", value: stats.students || 0, border: "border-blue-500" },
    { icon: Bell, title: "Active Notices", value: stats.notices || 0, border: "border-green-500" },
    { icon: Calendar, title: "Upcoming Events", value: stats.events || 0, border: "border-purple-500" },
    { icon: Trophy, title: "Achievements", value: stats.achievements || 0, border: "border-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className={`p-3 sm:p-4 bg-background text-foreground rounded-lg shadow flex items-center gap-3 border-t-4 ${item.border}`}>
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-current" />
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground">{item.title}</p>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{item.value}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
