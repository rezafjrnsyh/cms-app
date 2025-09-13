"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const sp = useSearchParams();

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const ok = await login(username, password);
    setLoading(false);

    if (ok) {
      router.push("/home");
    } else {
      setErr("Invalid credentials");
    }
  };

  return (
    <div className="mx-auto grid max-w-md gap-4">
      <div className="rounded-lg border bg-white p-6">
        <h1 className="mb-2 text-2xl font-semibold">Login</h1>
        <p className="mb-6 text-sm text-gray-600">
          Use <b>admin</b> / <b>admin123</b>
        </p>

        <form onSubmit={onSubmit} className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span>Username</span>
            <input
              name="username"
              className="border px-3 py-2"
              autoComplete="username"
              disabled={loading}
              required
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Password</span>
            <input
              name="password"
              className="border px-3 py-2"
              type="password"
              autoComplete="current-password"
              disabled={loading}
              required
            />
          </label>

            {sp.get("redirected")==="1" && <p className="text-sm text-amber-700">Please login first.</p>}
            {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            type="submit"
            className="mt-2 rounded bg-gray-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}