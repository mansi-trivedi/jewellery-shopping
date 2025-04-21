import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";

export async function POST(request: Request) {
  try {
    const payload = (await decodeAndGetUserInfo()) ?? {};
    const requestBody = await request.json();
    const { productId, quantity } = requestBody ?? {};
    await executeQuery("call updateItemQuantity(?, ?, ?)", [
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
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get("cart_id");
    await executeQuery("call DeleteCartAndItems(?)", [cartId]);
    return serverResponse({
      success: true,
      message: "Cart and cart items removed successfully",
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
