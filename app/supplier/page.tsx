"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../src/components/layout/DashboardLayout";

import useAuth from "../../src/hooks/useAuth";

import {
  getSuppliers,
  addSupplier,
  deleteSupplier,
} from "../../src/services/supplier";

export default function SupplierPage() {
  useAuth();

  const [suppliers,
    setSuppliers] =
    useState<any[]>([]);

  const [nama,
    setNama] =
    useState("");

  const [telepon,
    setTelepon] =
    useState("");

  const [alamat,
    setAlamat] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data =
      await getSuppliers();

    setSuppliers(data);
  }

  async function handleTambah() {
    if (
      !nama ||
      !telepon
    ) {
      alert(
        "Lengkapi data supplier"
      );
      return;
    }

    try {

      await addSupplier({
        nama,
        telepon,
        alamat,
      });

      setNama("");
      setTelepon("");
      setAlamat("");

      loadData();

      alert(
        "Supplier berhasil ditambahkan"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Gagal menambahkan supplier"
      );

    }
  }

  async function handleDelete(
    id: string
  ) {
    const ok =
      confirm(
        "Hapus supplier?"
      );

    if (!ok) return;

    await deleteSupplier(id);

    loadData();
  }

  const thStyle = {
    border: "1px solid #e5e7eb",
    padding: "12px",
    backgroundColor: "#f9fafb",
    textAlign: "left" as const,
  };

  const tdStyle = {
    border: "1px solid #e5e7eb",
    padding: "12px",
  };

  return (
    <DashboardLayout>

      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Supplier
      </h1>

      {/* FORM SUPPLIER */}

      <div
        style={{
          backgroundColor:
            "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "24px",
        }}
      >

        <h3
          style={{
            marginTop: 0,
          }}
        >
          Tambah Supplier
        </h3>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >

          <input
            placeholder="Nama Supplier"
            value={nama}
            onChange={(e) =>
              setNama(
                e.target.value
              )
            }
            style={{
              padding: "12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              minWidth: "250px",
            }}
          />

          <input
            placeholder="Telepon"
            value={telepon}
            onChange={(e) =>
              setTelepon(
                e.target.value
              )
            }
            style={{
              padding: "12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              minWidth: "200px",
            }}
          />

          <input
            placeholder="Alamat"
            value={alamat}
            onChange={(e) =>
              setAlamat(
                e.target.value
              )
            }
            style={{
              padding: "12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              minWidth: "250px",
            }}
          />

          <button
            onClick={
              handleTambah
            }
            style={{
              backgroundColor:
                "#4f46e5",
              color: "white",
              border: "none",
              padding:
                "12px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Tambah Supplier
          </button>

        </div>
      </div>

      {/* TABEL SUPPLIER */}

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

        <h3
          style={{
            marginTop: 0,
            marginBottom: "20px",
          }}
        >
          Daftar Supplier
        </h3>

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
                Nama
              </th>

              <th style={thStyle}>
                Telepon
              </th>

              <th style={thStyle}>
                Alamat
              </th>

              <th style={thStyle}>
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>

            {suppliers.map(
              (supplier) => (
                <tr
                  key={
                    supplier.id
                  }
                >

                  <td style={tdStyle}>
                    {
                      supplier.nama
                    }
                  </td>

                  <td style={tdStyle}>
                    {
                      supplier.telepon
                    }
                  </td>

                  <td style={tdStyle}>
                    {
                      supplier.alamat
                    }
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        handleDelete(
                          supplier.id
                        )
                      }
                      style={{
                        backgroundColor:
                          "#dc2626",
                        color:
                          "white",
                        border:
                          "none",
                        padding:
                          "8px 14px",
                        borderRadius:
                          "6px",
                        cursor:
                          "pointer",
                      }}
                    >
                      Hapus
                    </button>
                  </td>

                </tr>
              )
            )}

          </tbody>
        </table>

      </div>

    </DashboardLayout>
  );
}