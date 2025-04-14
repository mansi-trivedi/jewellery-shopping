import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextRequest, NextResponse } from "next/server";
import { GetReviewResponse } from "types/review";

export const revalidate = 0;

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetReviewResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const productSku = searchParams.get("product_sku");
    const [rows] = await executeQuery("call GetProductReview(?)", [productSku]);
    const reviews = rows as GetReviewResponse["data"];
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

export async function POST(request: Request) {
  try {
    const payload = (await decodeAndGetUserInfo()) ?? {};
    if (!payload?.userId) {
      return serverResponse({
        success: false,
        message: "unauthorized request",
        status: 401,
      });
    }
    const requestBody = await request.json();
    await executeQuery("call AddProductReview(?, ?, ?, ?, ?)", [
      requestBody.productSku,
      requestBody.review,
      requestBody.rating,
      null,
      payload?.userId,
    ]);
    return serverResponse({
      success: true,
      message: "Review Added",
      data: "",
    });
  } catch (error) {
    // if (error.code === "ER_DUP_ENTRY") {
    //   return serverResponse({
    //     success: false,
    //     message: "Internal Server Error",
    //     error: "You've already submitted a review for this product.",
    //     status: 400,
    //   });
    // }
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
    });
  }
}
