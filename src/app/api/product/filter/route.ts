import { NextRequest } from "next/server";
import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";

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
      const placeholders = categoryIds.map(() => "?").join(", ");
      query += ` AND categoryId IN (${placeholders})`;
      queryParams.push(...categoryIds);
    }

    // Filter by price range
    if (price) {
      const [minPrice, maxPrice] = price.split("-").map(Number);
      query += " AND price BETWEEN ? AND ?";
      queryParams.push(minPrice, maxPrice);
    }

    const rows = await executeQuery(query, queryParams);
    return serverResponse({
      success: true,
      data: rows,
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

const getCategoryId = async (category: string) => {
  const rows = await executeQuery(
    "SELECT categoryId FROM category where category.name = ?",
    [category]
  );
  const categoriesId = rows.map((row) => row.categoryId);
  return categoriesId;
};
