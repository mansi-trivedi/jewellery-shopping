import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextResponse } from "next/server";
import { CartAPIProps } from "types/cart";

export const revalidate = 0;

export async function GET(): Promise<
  NextResponse<CartAPIProps["getCartResponse"]>
> {
  const payload = (await decodeAndGetUserInfo()) ?? {};
  try {
    const rows = await executeQuery("call GetCart(?)", [payload?.userId]);
    const cart = rows[0] as Array<CartAPIProps["cart"]>;
    return serverResponse({
      data: cart,
      status: 200,
      success: true,
      message: "Cart fetched successfully",
    });
  } catch (error) {
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
    });
  }
}
