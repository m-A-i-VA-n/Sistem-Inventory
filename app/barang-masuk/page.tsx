"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "../../src/components/layout/DashboardLayout";

import {
  getInventory,
  tambahStok,
} from "../../src/services/inventory";

import {
  addTransaction,
} from "../../src/services/transaction";

export default function BarangMasuk() {
  const [items, setItems] = useState<any[]>([]);

  const [selectedItem, setSelectedItem] =
    useState("");

  const [qty, setQty] =
    useState("");

  useEffect(() => {
    loadBarang();
  }, []);

  async function loadBarang() {
    const data = await getInventory();
    setItems(data);
  }

  async function handleBarangMasuk() {
    if (!selectedItem || !qty) {
      alert("Lengkapi data terlebih dahulu");
      return;
    }

    const item = items.find(
      (i) => i.id === selectedItem
    );

    if (!item) {
      alert("Barang tidak ditemukan");
      return;
    }

    try {
      await tambahStok(
        selectedItem,
        Number(qty)
      );

      await addTransaction({
        type: "masuk",
        barangId: item.id,
        namaBarang: item.namaBarang,
        qty: Number(qty),
        operator: "Admin",
      });

      alert("Barang masuk berhasil");

      setSelectedItem("");
      setQty("");

      loadBarang();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan transaksi");
    }
  }

  const selectedBarang =
    items.find(
      (item) =>
        item.id === selectedItem
    );

  return (
    <DashboardLayout>

      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Barang Masuk
      </h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
          maxWidth: "800px",
        }}
      >

        <h3
          style={{
            marginTop: 0,
            marginBottom: "20px",
          }}
        >
          Catat Barang Masuk
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >

          <select
            value={selectedItem}
            onChange={(e) =>
              setSelectedItem(
                e.target.value
              )
            }
            style={{
              padding: "12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "15px",
            }}
          >
            <option value="">
              Pilih Barang
            </option>

            {items.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.namaBarang}
              </option>
            ))}
          </select>

          {selectedBarang && (
            <div
              style={{
                backgroundColor:
                  "#ecfdf5",
                border:
                  "1px solid #86efac",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <strong>
                Stok Saat Ini:
              </strong>{" "}
              {selectedBarang.stok}{" "}
              {
                selectedBarang.satuan
              }
            </div>
          )}

          <input
            type="number"
            placeholder="Jumlah Masuk"
            value={qty}
            onChange={(e) =>
              setQty(
                e.target.value
              )
            }
            style={{
              padding: "12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "15px",
            }}
          />

          <button
            onClick={
              handleBarangMasuk
            }
            style={{
              backgroundColor:
                "#16a34a",
              color: "white",
              border: "none",
              padding:
                "14px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Simpan Barang Masuk
          </button>

        </div>
      </div>

    </DashboardLayout>
  );
}