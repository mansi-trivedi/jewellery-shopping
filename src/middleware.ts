import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTVerifyResult } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value || "";
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN);
  try {
    if (token && req.nextUrl.pathname.endsWith("/login")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (token) {
      const { payload } = (await jwtVerify(token, secret)) as JWTVerifyResult;
      req.headers.set("User", JSON.stringify(payload));
      return NextResponse.next();
    }

    // If no token is present and it's a protected non-API route, redirect to login
    if (
      !req.nextUrl.pathname.startsWith("/api/") &&
      req.nextUrl.pathname !== "/login"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next(); // Allow access to public pages or API routes without a token
  } catch (error) {
    console.error("Token verification failed:", error);
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
}

export const config = {
  matcher: [
    "/api/cart",
    "/api/cart/:slug",
    "/cart",
    "/api/wishlist",
    "/wishlist",
    "/login",
  ],
};
