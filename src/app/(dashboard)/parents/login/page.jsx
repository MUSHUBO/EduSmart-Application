"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ParentLogin() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch("/api/parent/login", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!data.success) return setErr(data.message || "Login failed");
      localStorage.setItem("parentToken", data.token);
      router.push("/parent/dashboard");
    } catch {
      setErr("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6">
      <div className="max-w-md w-full bg-[var(--card)] rounded-2xl p-6 shadow">
        <h2 className="text-2xl font-semibold text-[var(--popover-foreground)] mb-2">Parent Login</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">Enter your registered parent email to view your child’s insights.</p>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="parent@example.com" className="input input-bordered w-full" />
          {err && <div className="text-sm text-red-500">{err}</div>}
          <button type="submit" className="w-full py-2 rounded-full bg-[var(--primary)] text-white mt-2">Login</button>
        </form>
      </div>
    </div>
  );
}
