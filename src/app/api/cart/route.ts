import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";

export const revalidate = 0;

export async function GET() {
  const payload = (await decodeAndGetUserInfo()) ?? {};
  try {
    const rows = await executeQuery("call GetCartByUser(?)", [payload?.userId]);
    const cart = rows[0][0];
    return serverResponse({
      success: true,
      data: cart,
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
    const requestBody = await request.json();
    console.log(requestBody);
    const { cartId, productId, quantity } = requestBody ?? {};
    await executeQuery("call AddProductToCart(?, ?, ?)", [
      cartId ?? "6e00eace-e7a6-11ef-a79b-00059a3c7a00",
      productId,
      quantity,
    ]);
    return serverResponse({
      success: true,
      message: "Product added successfully into cart",
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
