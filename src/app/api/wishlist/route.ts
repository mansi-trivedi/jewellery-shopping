import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";

export const revalidate = 0;

export async function GET() {
  const payload = (await decodeAndGetUserInfo()) ?? {};
  try {
    if (!payload?.userId) {
      return serverResponse({
        success: false,
        message: "unauthorized request",
        status: 401,
      });
    }
    const [rows] = await executeQuery("call getWishlist(?)", [payload?.userId]);
    const products = rows;
    return serverResponse({
      success: true,
      data: products,
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

export async function POST(request: Request) {
  try {
    const payload = (await decodeAndGetUserInfo()) ?? {};
    if (!payload?.userId) {
      return serverResponse({
        success: false,
        message: "unauthorized request",
        status: 401,
      });
    }
    const requestBody = await request.json();
    await executeQuery("call AddWishList(?, ?)", [
      payload?.userId,
      requestBody.productId,
    ]);
    return serverResponse({
      success: true,
      message: "Added to Wishlist",
      data: "",
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

export async function DELETE(request: Request) {
  try {
    const payload = (await decodeAndGetUserInfo()) ?? {};
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("product_id");
    if (!payload?.userId) {
      return serverResponse({
        success: false,
        message: "unauthorized request",
        status: 401,
      });
    }
    await executeQuery("call RemoveFromWishList(?)", [productId]);
    return serverResponse({
      success: true,
      message: "Item successfully removed from your wish list",
      data: "",
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
