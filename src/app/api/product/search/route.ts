import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextResponse } from "next/server";
import { Product, ProductSkuAPIServerSidePropTypes } from "types/product";

export async function GET(
  request: Request
): Promise<NextResponse<ProductSkuAPIServerSidePropTypes>> {
  const { searchParams } = new URL(request.url);
  const search_term = searchParams.get("search_term");

  let query = "";
  let values: Array<string | number | null> = [];

  query = "CALL SearchProducts(?)";
  values = [search_term];

  try {
    const [rows] = await executeQuery(query, values);
    let products: Product[] = [];
    products = rows as Product[];

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
