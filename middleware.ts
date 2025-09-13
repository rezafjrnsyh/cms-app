import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthed = req.cookies.get("auth")?.value === "true";
  const { pathname } = req.nextUrl;

  if (!isAuthed && (pathname.startsWith("/home") || pathname.startsWith("/setting"))) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("redirected", "1");
    return NextResponse.redirect(url);
  }

  if (isAuthed && pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/setting/:path*"],
};