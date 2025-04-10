import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextRequest } from "next/server";

export const revalidate = 0;
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productSku = searchParams.get("product_sku");
    const [rows] = await executeQuery("call GetProductAvgReview(?)", [
      productSku,
    ]);
    const reviews = rows;
    return serverResponse({
      success: true,
      data: reviews,
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
