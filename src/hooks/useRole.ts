"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  auth,
} from "../lib/firebase";

import {
  getUserRole,
} from "../services/user";

export default function useRole() {

  const [role,
    setRole] =
    useState("");

  useEffect(() => {

    async function loadRole() {

      const email =
        auth.currentUser
          ?.email;

      if (!email)
        return;

      const roleData =
        await getUserRole(
          email
        );

      setRole(
        roleData
      );
    }

    loadRole();

  }, []);

  return role;
}