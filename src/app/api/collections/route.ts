import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextResponse } from "next/server";
import { Product, ProductAPIServerSidePropsTypes } from "types/product";

export const revalidate = 0;

export async function GET(
  request: Request
): Promise<NextResponse<ProductAPIServerSidePropsTypes>> {
  const { searchParams } = new URL(request.url);
  const pageNumber = searchParams.get("page_number");
  const pageSize = searchParams.get("page_size");
  const categoryName = searchParams.get("category_name");

  try {
    const rows = await executeQuery("call GetProductsByCategory(?, ?, ?)", [
      pageNumber,
      pageSize,
      categoryName,
    ]);
    const products = rows[0] as Product[];
    const paginationInfo = rows[1]?.[0] || {};
    return serverResponse({
      success: true,
      data: {
        products: products,
        totalProducts: paginationInfo?.totalProducts ?? null,
        currentPage: paginationInfo?.currentPage ?? null,
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
