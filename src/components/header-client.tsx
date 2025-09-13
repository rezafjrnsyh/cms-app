"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";

export default function HeaderClient() {
  const { isAuthed, logout } = useAuth();

  if (!isAuthed) return null;

  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur" suppressHydrationWarning>
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/home" className="font-semibold">CMS App</Link>
        <div className="flex items-center gap-3 text-sm">
          <Link className="px-3 py-1 rounded hover:bg-gray-100" href="/home">Home</Link>
          <Link className="px-3 py-1 rounded hover:bg-gray-100" href="/settings">Settings</Link>
          <button onClick={logout} className="px-3 py-1 rounded bg-gray-900 text-white hover:opacity-90">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}