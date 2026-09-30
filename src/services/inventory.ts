import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  increment
} from "firebase/firestore";

import { db } from "../lib/firebase";

export async function getInventory() {
  const snapshot = await getDocs(
    collection(db, "inventory")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addInventory(item: any) {
  return await addDoc(
    collection(db, "inventory"),
    item
  );
}

export async function deleteInventory(id: string) {
  return await deleteDoc(
    doc(db, "inventory", id)
  );
}
export async function tambahStok(
  id: string,
  qty: number
) {
  const ref = doc(db, "inventory", id);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error("Barang tidak ditemukan");
  }

  const currentStock =
    snapshot.data().stok || 0;

  await updateDoc(ref, {
    stok: currentStock + qty,
  });
}
export async function kurangiStok(
  id: string,
  qty: number
) {
  const barangRef =
    doc(db, "inventory", id);

  const snapshot =
    await getDoc(barangRef);

  if (!snapshot.exists()) {
    throw new Error(
      "Barang tidak ditemukan"
    );
  }

  const currentStock =
    snapshot.data().stok || 0;

  if (currentStock < qty) {
    throw new Error(
      "Stok tidak mencukupi"
    );
  }

  await updateDoc(
    barangRef,
    {
      stok:
        currentStock - qty,
    }
  );
}

export async function updateInventory(
  id: string,
  data: any
) {
  const barangRef =
    doc(db, "inventory", id);

  await updateDoc(
    barangRef,
    data
  );
}
