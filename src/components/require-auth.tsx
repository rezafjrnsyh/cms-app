"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthed) router.replace("/?redirected=1");
  }, [isAuthed, router]);

  if (!isAuthed) return null;
  return <>{children}</>;
}