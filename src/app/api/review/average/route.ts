import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextRequest, NextResponse } from "next/server";
import { GetAverageReviewResponse } from "types/review";

export const revalidate = 0;
export async function GET(
  request: NextRequest
): Promise<NextResponse<GetAverageReviewResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const productSku = searchParams.get("product_sku");
    const [rows] = await executeQuery("call GetProductAvgReview(?)", [
      productSku,
    ]);
    const averageReview = rows[0] as GetAverageReviewResponse["data"];
    return serverResponse({
      success: true,
      data: averageReview,
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
