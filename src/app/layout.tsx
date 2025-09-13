import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import HeaderClient from "@/components/header-client";
import { cookies } from "next/headers";

export const metadata = { title: "CMS App", description: "Take-Home CMS" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isAuthed = (await cookies()).get("auth")?.value === "true";
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gray-50 text-gray-900">
        <AuthProvider initialAuthed={isAuthed}>
          <HeaderClient />      {/* Navbar dikontrol client */}
          <main className="mx-auto max-w-5xl p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
