import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const auth = req.cookies.get("auth")?.value;
  const token = req.cookies.get("Token")?.value;
  const pathname = req.nextUrl.pathname;

  if (!auth || !token) {
    // Redirect unauthenticated users to login
    // Allow all assets and API routes to load (avoids breaking styles/scripts)
    if (
      pathname.startsWith("/_next/") || // Next.js internal assets
      pathname.startsWith("/static/") || // Your static assets (if any)
      pathname.startsWith("/images/") ||
      pathname.startsWith("/api/") || // API routes
      pathname.startsWith("/favicon.ico") || // Favicon
      pathname.startsWith("/login") // Allow full login path including "/login/*"
    ) {
      return NextResponse.next();
    }
    // return NextResponse.redirect(new URL("/login", req.url));
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname); // Add last visited page as query param

    const response = NextResponse.redirect(loginUrl);
    response.cookies.set("redirectTo", pathname, { path: "/", httpOnly: true }); // Store in cookie as fallback
    return response;
  }

  // Redirect authenticated users away from /login to /dashboard
  if (auth && token && pathname === "/login") {
    // return NextResponse.redirect(new URL("/dashboard", req.url));
    const redirectTo = req.cookies.get("redirectTo")?.value || "/dashboard";

    const response = NextResponse.redirect(new URL(redirectTo, req.url));
    response.cookies.delete("redirectTo"); // Clear after use
    return response;
  }
  return NextResponse.next(); // Allow the request to continue
}

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/users/:path*",
//     "/contracts/:path*",
//     "/reports/:path*",
//     "/accounts/:path*",
//     "/avinsights/:path*",
//     "/bank/:path*",
//     "/batch/:path*",
//     "/cod/:path*",
//     "/giftmake/:path*",
//     "/importexcel/:path*",
//     "/marketing/:path*",
//     "/plan/:path*",
//     "/salesreferralorder/:path*",
//     "/vehicles/:path*",
//   ],
// };
