"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DashboardLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const response = await fetch("/api/dashboard-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    router.refresh();
  };

  return (
    <main className="section-wrap py-16">
      <div className="glass-panel mx-auto max-w-sm rounded-3xl p-6">
        <h1 className="text-2xl">Dashboard analytics</h1>
        <p className="mt-2 text-sm text-white/75">Accès protégé par variable d&apos;environnement.</p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mot de passe"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
          />
          <button type="submit" className="cta-primary w-full">
            {status === "loading" ? "Vérification..." : "Accéder"}
          </button>
          {status === "error" ? <p className="text-xs text-red-300">Mot de passe invalide.</p> : null}
        </form>
      </div>
    </main>
  );
}
