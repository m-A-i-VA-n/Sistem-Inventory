import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export async function getDashboardStats() {
  const inventorySnapshot =
    await getDocs(
      collection(db, "inventory")
    );

  const transactionSnapshot =
    await getDocs(
      collection(db, "transactions")
    );

  const inventory =
    inventorySnapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

  const transactions =
    transactionSnapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

  const totalBarang =
    inventory.length;

  const totalStok =
    inventory.reduce(
      (total: number, item: any) =>
        total + Number(item.stok),
      0
    );

  const stokMenipis =
    inventory.filter(
      (item: any) =>
        Number(item.stok) < 100
    ).length;

  const barangMasuk =
    transactions.filter(
      (trx: any) =>
        trx.type === "masuk"
    ).length;

  const barangKeluar =
    transactions.filter(
      (trx: any) =>
        trx.type === "keluar"
    ).length;

  return {
    totalBarang,
    totalStok,
    stokMenipis,
    barangMasuk,
    barangKeluar,
  };
}
export async function getLowStockItems() {
  const snapshot = await getDocs(
    collection(db, "inventory")
  );

  const items = snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );

  return items.filter(
    (item: any) =>
      Number(item.stok) < 100
  );
}