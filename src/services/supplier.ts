import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export async function getSuppliers() {
  const snapshot = await getDocs(
    collection(db, "suppliers")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addSupplier(
  data: any
) {
  return await addDoc(
    collection(db, "suppliers"),
    data
  );
}

export async function deleteSupplier(
  id: string
) {
  return await deleteDoc(
    doc(db, "suppliers", id)
  );
}