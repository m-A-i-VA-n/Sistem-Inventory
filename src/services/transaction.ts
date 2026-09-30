import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export async function addTransaction(
  data: any
) {
  return await addDoc(
    collection(db, "transactions"),
    {
      ...data,
      createdAt:
        new Date().toISOString(),
    }
  );
}

export async function getTransactions() {
  const q = query(
    collection(
      db,
      "transactions"
    ),
    orderBy(
      "createdAt",
      "desc"
    )
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
}