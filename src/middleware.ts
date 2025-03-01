import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTVerifyResult } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value || "";
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN);
  try {
    const { payload } = (await jwtVerify(token, secret)) as JWTVerifyResult;
    req.headers.set("User", JSON.stringify(payload));
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/api/wishlist/:slug",
    "/api/wishlist",
    "/api/cart",
    "/api/cart/:slug",
    "/cart",
  ],
};
