import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isAuthApi = request.nextUrl.pathname.startsWith("/api/auth");
  const isLoginApi = request.nextUrl.pathname.startsWith("/api/login");

  if (isAuthApi || isLoginApi) return NextResponse.next();

  const session = request.cookies.get("eco-session");

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};