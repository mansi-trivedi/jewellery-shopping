import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";

export const revalidate = 0;

export async function GET() {
  const payload = (await decodeAndGetUserInfo()) ?? {};
  try {
    const rows = await executeQuery("call GetCartItems(?)", [payload?.userId]);
    const cartItems = rows[0];
    return serverResponse({
      success: true,
      data: cartItems,
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
    const { productId, quantity } = requestBody ?? {};
    await executeQuery("call AddToCart(?, ?, ?)", [
      payload.userId,
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

export async function DELETE(request: Request) {
  try {
    const payload = (await decodeAndGetUserInfo()) ?? {};
    const requestBody = await request.json();
    const { cartItemId } = requestBody ?? {};
    await executeQuery("call RemoveCartItem(?, ?, ?)", [
      payload.userId,
      cartItemId,
    ]);
    return serverResponse({
      success: true,
      message: "Product removed successfully from your cart",
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
