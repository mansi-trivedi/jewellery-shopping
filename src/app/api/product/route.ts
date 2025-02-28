import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextResponse } from "next/server";
import { Product, ProductAPIServerSidePropsTypes } from "types/product";

export const revalidate = 0;

export async function GET(
  request: Request
): Promise<NextResponse<ProductAPIServerSidePropsTypes>> {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id");
  const skuId = searchParams.get("sku_id");
  const pageSize = searchParams.get("page_size");
  const pageNumber = searchParams.get("page_number");

  let query = "call getAllProducts(?, ?)";
  let values: Array<string | number | null> = [pageNumber, pageSize];

  if (productId) {
    query = "call GetProductByIdOrSKU(?, ?)";
    values = [productId, null];
  } else if (skuId) {
    query = "call GetProductByIdOrSKU(?, ?)";
    values = [null, skuId];
  }

  try {
    const rows = await executeQuery(query, values);
    const products = rows[0] as Product[];
    const paginationInfo = rows[1]?.[0] || {};

    if (productId || skuId) {
      return serverResponse({
        success: true,
        data: {
          products: products,
        },
      });
    }

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
