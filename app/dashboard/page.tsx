"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "../../src/components/layout/DashboardLayout";
import DashboardCard from "../../src/components/DashboardCard";
import TransactionChart from "../../src/components/TransactionChart";

import {
getDashboardStats,
getLowStockItems,
} from "../../src/services/dashboard";

import useAuth from "../../src/hooks/useAuth";

export default function Dashboard() {
useAuth();

const [stats, setStats] = useState({
totalBarang: 0,
totalStok: 0,
stokMenipis: 0,
barangMasuk: 0,
barangKeluar: 0,
});

const [lowStock, setLowStock] = useState<any[]>([]);

useEffect(() => {
loadStats();
}, []);

async function loadStats() {
const data = await getDashboardStats();


setStats(data);

const lowStockData = await getLowStockItems();

setLowStock(lowStockData);


}

return ( <DashboardLayout> <div className="dashboard-page"> <div className="dashboard-heading"> <h1>Dashboard Inventaris</h1> <p>
Ringkasan kondisi dan aktivitas inventaris saat ini. </p> </div>


    <div className="dashboard-cards">
      <DashboardCard
        title="Total Barang"
        value={stats.totalBarang}
        color="#4f46e5"
      />

      <DashboardCard
        title="Total Stok"
        value={stats.totalStok}
        color="#2563eb"
      />

      <DashboardCard
        title="Barang Masuk"
        value={stats.barangMasuk}
        color="#16a34a"
      />

      <DashboardCard
        title="Barang Keluar"
        value={stats.barangKeluar}
        color="#ea580c"
      />

      <DashboardCard
        title="Stok Menipis"
        value={stats.stokMenipis}
        color="#dc2626"
      />
    </div>

    <div className="dashboard-restock">
      <div className="dashboard-restock-header">
        <h2>⚠ Barang Perlu Restock</h2>
        <span>{lowStock.length} barang</span>
      </div>

      {lowStock.length === 0 ? (
        <div className="dashboard-empty">
          <p>Tidak ada barang yang perlu direstock.</p>
        </div>
      ) : (
        <div className="dashboard-restock-list">
          {lowStock.map((item) => (
            <div
              key={item.id}
              className="dashboard-restock-item"
            >
              <div>
                <strong>{item.namaBarang}</strong>
                <p>
                  Sisa stok: {item.stok} {item.satuan}
                </p>
              </div>

              <span className="dashboard-stock-warning">
                Menipis
              </span>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="dashboard-chart">
      <div className="dashboard-chart-header">
        <h2>Aktivitas Barang</h2>
        <p>Perbandingan barang masuk dan keluar.</p>
      </div>

      <TransactionChart
        masuk={stats.barangMasuk}
        keluar={stats.barangKeluar}
      />
    </div>
  </div>
</DashboardLayout>


);
}
