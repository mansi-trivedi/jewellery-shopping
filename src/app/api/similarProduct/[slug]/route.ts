import { executeQuery } from "@/app/libs/mysql";
import { NextRequest } from "next/server";
import serverResponse from "@/app/utils/nextServerResponse";
import { NextResponse } from "next/server";
import { ProductAPIProps } from "types/product";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<ProductAPIProps["getProductCategoryApiResponse"]>> {
  try {
    const slug = (await params).slug;
    const [rows] = await executeQuery("call getSimilarProducts(?)", [slug]);
    const products = rows as Array<ProductAPIProps["product"]>;
    return serverResponse({
      success: true,
      data: {
        products: products,
      },
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
