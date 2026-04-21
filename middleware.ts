// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 1. Grab the login details from the browser
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    // Decode the base64 string sent by the browser
    const [user, pwd] = atob(authValue).split(":");

    // 🛑 2. YOUR SECRET USERNAME AND PASSWORD
    // You can change 'admin' and 'rsleather123' to whatever you want!
    if (user === "admin" && pwd === "rsleather123") {
      return NextResponse.next(); // Password is correct, let them in!
    }
  }

  // 3. If password is wrong or missing, trigger the browser login pop-up
  return new NextResponse("Authentication Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Admin Area"',
    },
  });
}

// 4. IMPORTANT: Only lock down the admin folder!
export const config = {
  matcher: ["/admin/:path*"],
};
