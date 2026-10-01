"use client";

import { useEffect, useState } from "react";

import { auth } from "../lib/firebase";
import { getUserRole } from "../services/user";

export default function useRole() {
  const [role, setRole] = useState("");

  useEffect(() => {
    async function loadRole() {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        return;
      }

      try {
        const roleData = await getUserRole(uid);
        setRole(roleData);
      } catch (error) {
        console.error("Failed to load user role:", error);
        setRole("staff");
      }
    }

    loadRole();
  }, []);

  return role;
}