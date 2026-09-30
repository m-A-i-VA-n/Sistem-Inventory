"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [role, setRole] = useState("staff");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "staff");
  }, []);

  const isAdmin = role === "admin";

  const menuStyle = {
    display: "block",
    padding: "12px 16px",
    marginBottom: "8px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#111827",
    fontWeight: 500,
  };

  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        padding: "24px",
        boxShadow: "2px 0 10px rgba(0,0,0,0.04)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          marginBottom: "24px",
          paddingBottom: "20px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#4f46e5",
            fontWeight: "bold",
          }}
        >
          InvSys
        </h2>

        <p
          style={{
            marginTop: "8px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Role: {isAdmin ? "Admin" : "Staff"}
        </p>
      </div>

      {/* Menu */}
      <div
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "#9ca3af",
          marginBottom: "10px",
          textTransform: "uppercase",
        }}
      >
        Menu Utama
      </div>

      <nav>
        <Link href="/dashboard" style={menuStyle}>
          📊 Dashboard
        </Link>

        <Link href="/data-barang" style={menuStyle}>
          📦 Data Barang
        </Link>

        <Link href="/barang-masuk" style={menuStyle}>
          ⬇️ Barang Masuk
        </Link>

        <Link href="/barang-keluar" style={menuStyle}>
          ⬆️ Barang Keluar
        </Link>

        <Link href="/transaksi" style={menuStyle}>
          📋 Riwayat Transaksi
        </Link>

        {isAdmin && (
          <>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#9ca3af",
                marginTop: "20px",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              Pengaturan
            </div>

            <Link href="/supplier" style={menuStyle}>
              🚚 Supplier
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}