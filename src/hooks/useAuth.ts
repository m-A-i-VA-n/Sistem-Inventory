"use client";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../lib/firebase";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
} from "react";

export default function useAuth() {
  const router =
    useRouter();

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          if (!user) {
            router.push(
              "/login"
            );
          }
        }
      );

    return () =>
      unsubscribe();
  }, [router]);
}