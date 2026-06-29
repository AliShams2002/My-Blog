import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // دریافت کوکی‌ها
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

  // 1. اگر به لاگین رفته و لاگین هست => به صفحه مناسب هدایت کن
  if (pathname === "/login") {
    if (isAuthenticated) {
      const redirectUrl = isAdmin ? "/admin/dashboard" : "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  // 2. محافظت از مسیرهای ادمین
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 3. مسیرهای عمومی - نیازی به چک نیست
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
