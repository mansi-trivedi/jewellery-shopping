import { response } from "@/app/api/utils/constants";
import { executeQuery } from "@/app/libs/mysql";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    const rows = await executeQuery("call GetProductByIdOrSKU(?, ?)", [
      null,
      slug,
    ]);
    const products = rows[0][0];
    return NextResponse.json(
      { status: response.success, data: products },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { status: response.error, error: error.message },
      { status: 400 }
    );
  }
}
