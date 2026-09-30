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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  masuk: number;
  keluar: number;
};

export default function TransactionChart({
  masuk,
  keluar,
}: Props) {

  const data = {
    labels: [
      "Barang Masuk",
      "Barang Keluar",
    ],

    datasets: [
      {
        label: "Jumlah Transaksi",

        data: [
          masuk,
          keluar,
        ],

        backgroundColor: [
          "#3b82f6", // Biru
          "#ef4444", // Merah
        ],

        borderColor: [
          "#2563eb",
          "#dc2626",
        ],

        borderWidth: 2,
        borderRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },

      title: {
        display: true,
        text: "Grafik Transaksi Inventaris",
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "#e5e7eb",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "30px",
        backgroundColor: "#ffffff",
        padding: "24px",
        borderRadius: "16px",

        boxShadow:
          "0 4px 12px rgba(0,0,0,0.05)",

        border:
          "1px solid #e5e7eb",
      }}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}