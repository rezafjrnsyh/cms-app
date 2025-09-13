"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type AuthContextType = {
  isAuthed: boolean;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => void;
  setAuthed: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, initialAuthed = false, }: {
  children: React.ReactNode, initialAuthed?: boolean; }) {
  const [isAuthed, setIsAuthed] = useState<boolean>(initialAuthed);

  // baca cookie di client saat mount
  useEffect(() => {
    const has = document.cookie.split("; ").some((c) => c.startsWith("auth=true"));
    if (has !== initialAuthed) setIsAuthed(has);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (u: string, p: string) => {
    const ok = u === "admin" && p === "admin123";
    if (ok) {
      document.cookie = `auth=true; path=/; max-age=${60 * 60 * 8}`;
      setIsAuthed(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    document.cookie = "auth=; path=/; max-age=0";
    setIsAuthed(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout, setAuthed: setIsAuthed }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}