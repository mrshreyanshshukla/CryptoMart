"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PriceChart({ priceHistory }) {
  const chartData = {
    labels: priceHistory.history.map((entry) =>
      new Date(entry.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price (USD)",
        data: priceHistory.history.map((entry) => entry.price),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Price History",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return "$" + value.toFixed(2);
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
