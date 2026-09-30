"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../src/components/layout/DashboardLayout";

import {
  getInventory,
  kurangiStok,
} from "../../src/services/inventory";

import {
  addTransaction,
} from "../../src/services/transaction";

import useAuth from "../../src/hooks/useAuth";

export default function BarangKeluar() {
  useAuth();

  const [items, setItems] =
    useState<any[]>([]);

  const [selectedItem,
    setSelectedItem] =
    useState("");

  const [qty, setQty] =
    useState("");

  useEffect(() => {
    loadBarang();
  }, []);

  async function loadBarang() {
    const data =
      await getInventory();

    setItems(data);
  }

  async function handleSubmit() {
    if (
      !selectedItem ||
      !qty
    ) {
      alert(
        "Lengkapi data terlebih dahulu"
      );
      return;
    }

    try {
      const barang =
        items.find(
          (item) =>
            item.id === selectedItem
        );

      await kurangiStok(
        selectedItem,
        Number(qty)
      );

      await addTransaction({
        namaBarang:
          barang.namaBarang,
        qty:
          Number(qty),
        type:
          "keluar",
        operator:
          "Admin",
        createdAt:
          new Date(),
      });

      alert(
        "Barang keluar berhasil"
      );

      setSelectedItem("");
      setQty("");

      loadBarang();
    } catch (error: any) {
      alert(
        error.message
      );
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
        Barang Keluar
      </h1>

      <div
        style={{
          backgroundColor:
            "#ffffff",
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
          Catat Barang Keluar
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

            {items.map(
              (item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.namaBarang}
                </option>
              )
            )}
          </select>

          {selectedBarang && (
            <div
              style={{
                backgroundColor:
                  "#fef2f2",
                border:
                  "1px solid #fecaca",
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
            placeholder="Jumlah Keluar"
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
              handleSubmit
            }
            style={{
              backgroundColor:
                "#dc2626",
              color: "white",
              border: "none",
              padding:
                "14px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Simpan Barang Keluar
          </button>

        </div>
      </div>

    </DashboardLayout>
  );
}