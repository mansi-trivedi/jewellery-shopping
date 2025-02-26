import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";

export async function GET() {
  const payload = (await decodeAndGetUserInfo()) ?? {};
  console.log(payload);
  try {
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
