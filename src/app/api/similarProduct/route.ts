import { executeQuery } from "@/app/libs/mysql";
import { NextRequest } from "next/server";
import serverResponse from "@/app/utils/nextServerResponse";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    const rows = await executeQuery("call getSimilarProducts(?)", [slug]);
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
