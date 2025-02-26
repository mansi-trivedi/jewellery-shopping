import { response } from "@/app/api/utils/constants";
// import { verifyPassword } from "@/app/api/services/hashPassword";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import { SignJWT } from "jose";
// import { executeQuery } from "@/app/libs/mysql";

export async function POST(request: Request) {
  console.log(request);
  try {
    // const res = await request.json();
    // const rows = await executeQuery("call login(?)", [res.email]);
    // const user = rows[0][0];
    // const result = await verifyPassword(res.password, user.password);
    // if (!result) {
    //   throw new Error("Incorrect Password");
    // }
    const userPayload = {
      userEmail: "mansi@gmail.com",
      userId: "6e00eace-e7a6-11ef-a79b-00059a3c7a00",
    };
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN);
    const token = await new SignJWT(userPayload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);
    const nextResponse = NextResponse.json(
      {
        status: response.success,
        data: "data",
      },
      { status: 200 }
    );
    nextResponse.cookies.set("authToken", token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    });
    return nextResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { status: response.error, error: error.message },
      { status: 400 }
    );
  }
}
