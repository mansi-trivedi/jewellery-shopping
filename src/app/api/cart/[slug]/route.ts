import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const userId = (await params).slug;
    const rows = await executeQuery("call getCart(?)", [userId]);
    const products = rows[0];
    return serverResponse({
      success: true,
      data: products,
    });
  } catch (error: unknown) {
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
    });
  }
}
