"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { SectorEntry } from "@/lib/data";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  sectors: SectorEntry[];
}

export default function BeatRateChart({ sectors }: Props) {
  const sorted = [...sectors].sort((a, b) => b.beatRate - a.beatRate);

  const data = {
    labels: sorted.map((s) => s.sector),
    datasets: [
      {
        label: "Beat Rate (%)",
        data: sorted.map((s) => s.beatRate),
        backgroundColor: sorted.map((s) =>
          s.beatRate >= 70
            ? "rgba(16,185,129,0.7)"
            : s.beatRate >= 50
            ? "rgba(245,158,11,0.7)"
            : "rgba(244,63,94,0.7)"
        ),
        borderColor: sorted.map((s) =>
          s.beatRate >= 70 ? "#10b981" : s.beatRate >= 50 ? "#f59e0b" : "#f43f5e"
        ),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Sector EPS Beat Rates (Last 4 Quarters)",
        color: "#1e1b4b",
        font: { size: 14, weight: "bold" as const },
        padding: { bottom: 16 },
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (ctx: any) => `Beat Rate: ${ctx.parsed.x}%`,
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: { callback: (v: string | number) => `${v}%`, color: "#6b7280" },
        grid: { color: "rgba(224,231,255,0.5)" },
      },
      y: {
        ticks: { color: "#374151", font: { size: 12 } },
        grid: { display: false },
      },
    },
  };

  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e0e7ff", padding: "1.5rem" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
