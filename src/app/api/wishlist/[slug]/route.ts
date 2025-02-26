import { response } from "@/app/api/utils/constants";
import pool from "@/app/libs/mysql";
import { RowDataPacket } from "mysql2";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // const userHeader = request.headers.get("authToken");
    // if (!userHeader) {
    //   return new Response(JSON.stringify({ error: "Unauthorized" }), {
    //     status: 401,
    //   });
    // }
    const userId = (await params).slug;
    const db = await pool.getConnection();
    const [rows] = await db.query<RowDataPacket[][]>("call getWishlist(?)", [
      userId,
    ]);
    const products = rows[0];
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
