
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../src/lib/firebase";
import { getUserProfile } from "../../src/services/user";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;
      const profile = await getUserProfile(uid);

      console.log("UID:", uid);
      console.log("PROFILE:", profile);

      const role = profile?.role || "staff";
      const name = profile?.nama || userCredential.user.email || "";

      localStorage.setItem("uid", uid);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login gagal");
    }
  }

  return (
    <main className="login-screen">
      <div className="login-overlay" />

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              
            </div>

            <h1>Login Inventaris</h1>

            <p>
              Silakan masuk untuk mengakses sistem inventaris
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="login-field">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

