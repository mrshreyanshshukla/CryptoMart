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

export default function GlobalMarketCapChart({ data }) {
  const chartData = {
    labels: ["BTC", "ETH", "USDT", "BNB", "SOL", "Others"],
    datasets: [
      {
        label: "Market Cap",
        data: [
          data.total_market_cap.btc,
          data.total_market_cap.eth,
          data.market_cap_percentage.usdt * data.total_market_cap.usd / 100,
          data.total_market_cap.bnb,
          data.market_cap_percentage.sol * data.total_market_cap.usd / 100,
          data.total_market_cap.usd * (100 - Object.values(data.market_cap_percentage).reduce((a, b) => a + b, 0)) / 100
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
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
        text: "Global Cryptocurrency Market Cap Distribution",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "$" + (value / 1e9).toFixed(2) + "B";
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}