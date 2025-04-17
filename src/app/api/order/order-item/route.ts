import { CompleteOrderAndCreateItemsParams } from "@/app/data/order";
import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";

export async function POST(request: Request) {
  try {
    const requestBody: CompleteOrderAndCreateItemsParams = await request.json();
    const { orderId, paymentStatus, orderItems } = requestBody ?? {};

    // 1. Validate the request body
    if (
      !orderId ||
      !paymentStatus ||
      !orderItems ||
      !Array.isArray(orderItems)
    ) {
      return serverResponse({
        success: false,
        message:
          "Invalid request body.  orderId, paymentStatus, and orderItems (as an array) are required.",
        status: 400,
      });
    }

    const orderItemsJson = JSON.stringify(
      orderItems.map((item) => ({
        ...item,
        price: parseFloat(item.price.toString()),
      }))
    );
    /** Updating required table after payment approval */
    await executeQuery("call CompleteOrderAndCreateItems(?, ?, ?)", [
      orderId,
      paymentStatus,
      orderItemsJson,
    ]);
    return serverResponse({
      success: true,
      message: "Order item added successfully",
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
