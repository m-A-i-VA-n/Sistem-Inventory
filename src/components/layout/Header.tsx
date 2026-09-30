"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { auth } from "../../lib/firebase";

export default function Header() {
  const router = useRouter();

  const [name, setName] = useState("User");
  const [role, setRole] = useState("staff");

  useEffect(() => {
    setName(localStorage.getItem("name") || "User");
    setRole(localStorage.getItem("role") || "staff");
  }, []);

  async function handleLogout() {
    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin logout?"
    );

    if (!confirmLogout) return;

    try {
      await signOut(auth);

      localStorage.removeItem("uid");
      localStorage.removeItem("role");
      localStorage.removeItem("name");

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Gagal logout");
    }
  }

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      {/* Kiri */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            color: "#111827",
          }}
        >
          Sistem Inventaris Barang
        </h2>

        <p
          style={{
            marginTop: "5px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Kelola stok dan transaksi inventaris
        </p>
      </div>

      {/* Kanan */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Notifikasi */}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            fontSize: "22px",
          }}
        >
          🔔

          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-8px",
              backgroundColor: "#ef4444",
              color: "white",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </span>
        </div>

        {/* User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#4f46e5",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>

          <div>
            <div
              style={{
                fontWeight: 600,
                color: "#111827",
              }}
            >
              {name}
            </div>

            <div
              style={{
                fontSize: "13px",
                color:
                  role === "admin"
                    ? "#059669"
                    : "#2563eb",
              }}
            >
              {role === "admin"
                ? "Admin"
                : "Staff"}
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}