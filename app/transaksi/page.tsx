"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "../../src/components/layout/DashboardLayout";

import {
  getTransactions,
} from "../../src/services/transaction";

export default function TransaksiPage() {
  const [transactions, setTransactions] =
    useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data =
      await getTransactions();

    setTransactions(data);
  }

  const thStyle = {
    border: "1px solid #e5e7eb",
    padding: "14px",
    backgroundColor: "#f9fafb",
    textAlign: "left" as const,
    fontWeight: "bold",
  };

  const tdStyle = {
    border: "1px solid #e5e7eb",
    padding: "14px",
  };

  function formatTanggal(
    createdAt: any
  ) {
    if (!createdAt) return "-";

    if (createdAt.seconds) {
      return new Date(
        createdAt.seconds * 1000
      ).toLocaleString("id-ID");
    }

    return new Date(
      createdAt
    ).toLocaleString("id-ID");
  }

  return (
    <DashboardLayout>

      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Riwayat Transaksi
      </h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "10px",
          }}
        >
          Ringkasan
        </h3>

        <p
          style={{
            color: "#6b7280",
            margin: 0,
          }}
        >
          Total Transaksi:
          {" "}
          <strong>
            {transactions.length}
          </strong>
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>
                Tanggal
              </th>

              <th style={thStyle}>
                Barang
              </th>

              <th style={thStyle}>
                Tipe
              </th>

              <th style={thStyle}>
                Qty
              </th>

              <th style={thStyle}>
                Operator
              </th>
            </tr>
          </thead>

          <tbody>

            {transactions.map(
              (trx) => (
                <tr
                  key={trx.id}
                  style={{
                    transition:
                      "0.2s",
                  }}
                >
                  <td style={tdStyle}>
                    {formatTanggal(
                      trx.createdAt
                    )}
                  </td>

                  <td style={tdStyle}>
                    {trx.namaBarang}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        backgroundColor:
                          trx.type ===
                          "masuk"
                            ? "#dcfce7"
                            : "#fee2e2",

                        color:
                          trx.type ===
                          "masuk"
                            ? "#166534"
                            : "#991b1b",

                        padding:
                          "6px 12px",

                        borderRadius:
                          "999px",

                        fontSize:
                          "13px",

                        fontWeight:
                          "bold",
                      }}
                    >
                      {trx.type ===
                      "masuk"
                        ? "Barang Masuk"
                        : "Barang Keluar"}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    {trx.qty}
                  </td>

                  <td style={tdStyle}>
                    {trx.operator}
                  </td>
                </tr>
              )
            )}

            {transactions.length ===
              0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "30px",
                    color:
                      "#6b7280",
                  }}
                >
                  Belum ada transaksi
                </td>
              </tr>
            )}

          </tbody>
        </table>

      </div>

    </DashboardLayout>
  );
}