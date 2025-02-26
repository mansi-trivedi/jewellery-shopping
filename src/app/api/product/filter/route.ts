import db from "@/app/libs/mysql";
import { RowDataPacket } from "mysql2";
import { NextResponse, NextRequest } from "next/server";
import { response } from "../../utils/constants";

// GET Request Handler
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const price = searchParams.get("price");
  const category = searchParams.get("category");

  try {
    // Build the query dynamically
    let query = "SELECT * FROM product WHERE 1=1";
    const queryParams = [];
    // Filter by category
    if (category) {
      const categoryIds = await getCategoryId(category);
      const placeholders = categoryIds.map(() => '?').join(', ')
      query += ` AND categoryId IN (${placeholders})`;
      queryParams.push(...categoryIds);
    }

    // Filter by price range
    if (price) {
      const [minPrice, maxPrice] = price.split("-").map(Number);
      query += " AND price BETWEEN ? AND ?";
      queryParams.push(minPrice, maxPrice);
    }

    const [rows] = await db.query(query, queryParams);
    return NextResponse.json(
          { status: response.success, data: rows },
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

const getCategoryId = async (category: string) => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT categoryId FROM category where category.name = ?",
    category
  );
  const categoriesId = rows.map((row) => row.categoryId)
  return categoriesId;
};
