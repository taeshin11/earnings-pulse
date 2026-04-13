"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

interface HistoryPoint {
  quarter: string;
  epsEstimate: number;
  epsActual: number;
  surprise: number;
  beat: boolean;
}

interface Props {
  history: HistoryPoint[];
  ticker: string;
}

export default function EPSChart({ history, ticker }: Props) {
  const labels = history.map((h) => h.quarter);

  const data = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Surprise %",
        data: history.map((h) => h.surprise),
        backgroundColor: history.map((h) =>
          h.surprise >= 0 ? "rgba(16,185,129,0.5)" : "rgba(244,63,94,0.5)"
        ),
        borderColor: history.map((h) =>
          h.surprise >= 0 ? "#10b981" : "#f43f5e"
        ),
        borderWidth: 1,
        yAxisID: "y1",
        borderRadius: 4,
      },
      {
        type: "line" as const,
        label: "EPS Estimate",
        data: history.map((h) => h.epsEstimate),
        borderColor: "#a5b4fc",
        backgroundColor: "rgba(165,180,252,0.1)",
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 4,
        pointBackgroundColor: "#a5b4fc",
        yAxisID: "y",
        tension: 0.3,
      },
      {
        type: "line" as const,
        label: "EPS Actual",
        data: history.map((h) => h.epsActual),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.1)",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "#4f46e5",
        yAxisID: "y",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { size: 12 }, color: "#1e1b4b" },
      },
      title: {
        display: true,
        text: `${ticker} EPS History`,
        color: "#1e1b4b",
        font: { size: 14, weight: "bold" as const },
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: { display: true, text: "EPS ($)", color: "#6b7280" },
        grid: { color: "rgba(224,231,255,0.5)" },
        ticks: { color: "#6b7280" },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: { display: true, text: "Surprise (%)", color: "#6b7280" },
        grid: { drawOnChartArea: false },
        ticks: { color: "#6b7280" },
      },
    },
  };

  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e0e7ff", padding: "1.5rem" }}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
