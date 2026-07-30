import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get cookies from the request
  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;

  let user = null;
  try {
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch (error) {
    console.error("Error parsing user:", error);
  }

  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  // 1. If user is on login page and already authenticated, redirect to appropriate page
  if (pathname === "/login") {
    if (isAuthenticated) {
      const redirectUrl = isAdmin ? "/admin/dashboard" : "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect admin routes - require authentication and admin role
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 3. Public routes - no checks needed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
