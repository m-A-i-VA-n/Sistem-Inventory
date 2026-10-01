import { doc, getDoc } from "firebase/firestore";

import { db } from "../lib/firebase";

export type UserProfile = {
  id: string;
  nama?: string;
  role?: string;
  email?: string;
};

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  const data = snap.data();

  return {
    id: snap.id,
    nama: data.nama,
    role: data.role,
    email: data.email,
  };
}

export async function getUserRole(
  uid: string
): Promise<string> {
  const profile = await getUserProfile(uid);

  return profile?.role || "staff";
}