import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id");
  const skuId = searchParams.get("sku_id");

  let query = "call getAllProducts()";
  let values: Array<string | number | null> = [];

  if (productId) {
    query = "call GetProductByIdOrSKU(?, ?)";
    values = [productId, null];
  } else if (skuId) {
    query = "call GetProductByIdOrSKU(?, ?)";
    values = [null, skuId];
  }

  try {
    const rows = await executeQuery(query, values);
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
