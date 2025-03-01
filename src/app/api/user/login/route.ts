import { verifyPassword } from "@/app/api/services/hashPassword";
import { SignJWT } from "jose";
import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const rows = await executeQuery("call login(?)", [res.email]);
    const user = rows[0][0];
    const isPasswordValid = await verifyPassword(res.password, user.password);
    if (!isPasswordValid) {
      return serverResponse({
        success: false,
        message: "Internal Server Error",
        status: 400,
      });
    }
    const userPayload = {
      userEmail: user.email,
      userId: user.userId,
    };
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN);
    const token = await new SignJWT(userPayload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const nextResponse = serverResponse({
      success: true,
      message: "Login successful",
    });
    nextResponse.cookies.set("authToken", token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    });
    return nextResponse;
  } catch (error) {
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
    });
  }
}
