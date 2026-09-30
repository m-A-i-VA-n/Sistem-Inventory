"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "../../src/components/layout/DashboardLayout";
import useAuth from "../../src/hooks/useAuth";

import {
  getInventory,
  addInventory,
  deleteInventory,
  updateInventory,
} from "../../src/services/inventory";

import { exportToExcel } from "../../src/utils/exportExcel";

export default function DataBarang() {
  useAuth();

  const [items, setItems] = useState<any[]>([]);
  const [role, setRole] = useState("staff");
  const [search, setSearch] = useState("");

  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [stok, setStok] = useState("");
  const [satuan, setSatuan] = useState("");
  const [editId, setEditId] = useState("");

  const isAdmin = role === "admin";

  useEffect(() => {
    setRole(localStorage.getItem("role") || "staff");
    loadData();
  }, []);

  async function loadData() {
    const data = await getInventory();
    setItems(data);
  }

  async function handleTambahBarang() {
    if (!isAdmin) {
      alert("Akses ditolak");
      return;
    }

    if (!kodeBarang || !namaBarang || !stok || !satuan) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      if (editId) {
        await updateInventory(editId, {
          kodeBarang,
          namaBarang,
          stok: Number(stok),
          satuan,
        });
        alert("Barang berhasil diupdate");
      } else {
        await addInventory({
          kodeBarang,
          namaBarang,
          stok: Number(stok),
          satuan,
        });
        alert("Barang berhasil ditambahkan");
      }

      setEditId("");
      setKodeBarang("");
      setNamaBarang("");
      setStok("");
      setSatuan("");
      loadData();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  }

  async function handleDelete(id: string) {
    if (!isAdmin) {
      alert("Akses ditolak");
      return;
    }

    const confirmDelete = confirm("Hapus barang ini?");
    if (!confirmDelete) return;

    try {
      await deleteInventory(id);
      loadData();
      alert("Barang berhasil dihapus");
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus barang");
    }
  }

  function handleEdit(item: any) {
    if (!isAdmin) return;

    setEditId(item.id);
    setKodeBarang(item.kodeBarang);
    setNamaBarang(item.namaBarang);
    setStok(item.stok.toString());
    setSatuan(item.satuan);
  }

  function handleExportExcel() {
    const exportData = items.map((item) => ({
      Kode: item.kodeBarang,
      NamaBarang: item.namaBarang,
      Stok: item.stok,
      Satuan: item.satuan,
    }));

    exportToExcel(exportData, "Inventaris");
  }

  const thStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#f5f5f5",
    textAlign: "left" as const,
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "12px",
  };
  const inputStyle = {
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  minWidth: "180px",
};

const primaryButton = {
  backgroundColor: "#4f46e5",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const successButton = {
  backgroundColor: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const dangerButton = {
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const editButton = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px",
};

  return (
  <DashboardLayout>
    <h1
      style={{
        marginBottom: "20px",
      }}
    >
      Data Barang
    </h1>

    {/* SEARCH */}
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Cari kode atau nama barang..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "350px",
          padding: "12px",
          border:
            "1px solid #d1d5db",
          borderRadius: "8px",
        }}
      />
    </div>

    {/* FORM */}
    {isAdmin && (
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
        <h3>
          {editId
            ? "Edit Barang"
            : "Tambah Barang"}
        </h3>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Kode Barang"
            value={kodeBarang}
            onChange={(e) =>
              setKodeBarang(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Nama Barang"
            value={namaBarang}
            onChange={(e) =>
              setNamaBarang(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Stok"
            value={stok}
            onChange={(e) =>
              setStok(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Satuan"
            value={satuan}
            onChange={(e) =>
              setSatuan(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            onClick={
              handleTambahBarang
            }
            style={
              editId
                ? successButton
                : primaryButton
            }
          >
            {editId
              ? "Update Barang"
              : "Tambah Barang"}
          </button>

          {editId && (
            <button
              onClick={() => {
                setEditId("");
                setKodeBarang("");
                setNamaBarang("");
                setStok("");
                setSatuan("");
              }}
              style={dangerButton}
            >
              Batal
            </button>
          )}
        </div>
      </div>
    )}

    {/* EXPORT */}
    <button
      onClick={
        handleExportExcel
      }
      style={{
        ...primaryButton,
        marginBottom: "20px",
      }}
    >
      📊 Export Excel
    </button>

    {!isAdmin && (
      <p
        style={{
          color: "#6b7280",
        }}
      >
        Anda dalam mode Staff.
      </p>
    )}

    {/* TABLE */}
    <div
      style={{
        backgroundColor:
          "#ffffff",
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
              Kode
            </th>

            <th style={thStyle}>
              Nama Barang
            </th>

            <th style={thStyle}>
              Stok
            </th>

            <th style={thStyle}>
              Satuan
            </th>

            <th style={thStyle}>
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {items
            .filter((item) => {
              const keyword =
                search.toLowerCase();

              return (
                item.namaBarang
                  ?.toLowerCase()
                  .includes(
                    keyword
                  ) ||
                item.kodeBarang
                  ?.toLowerCase()
                  .includes(
                    keyword
                  )
              );
            })
            .map((item) => (
              <tr
                key={item.id}
              >
                <td style={tdStyle}>
                  {
                    item.kodeBarang
                  }
                </td>

                <td style={tdStyle}>
                  {
                    item.namaBarang
                  }
                </td>

                <td style={tdStyle}>
                  {item.stok}
                </td>

                <td style={tdStyle}>
                  {
                    item.satuan
                  }
                </td>

                <td style={tdStyle}>
                  {isAdmin ? (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(
                            item
                          )
                        }
                        style={
                          editButton
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        style={
                          dangerButton
                        }
                      >
                        Hapus
                      </button>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </DashboardLayout>
);
}