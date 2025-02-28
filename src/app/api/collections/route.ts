import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextResponse } from "next/server";
import { Product, ProductAPIServerSidePropsTypes } from "types/product";

export const revalidate = 0;

export async function GET(
  request: Request
): Promise<NextResponse<ProductAPIServerSidePropsTypes>> {
  const { searchParams } = new URL(request.url);
  const categoryName = searchParams.get("category_name");

  try {
    const rows = await executeQuery("call GetProductsByCategory(?)", [
      categoryName,
    ]);
    const products = rows[0] as Product[];
    return serverResponse({
      success: true,
      data: {
        products: products,
      },
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
