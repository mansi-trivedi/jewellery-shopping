import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { totalPrice, paypalOrderId, userId, paymentStatus } =
      requestBody ?? {};

    /** Inserting order with paypal order id in order table */
    await executeQuery("call InsertNewOrderWithPaypalId(?, ?, ?, ?)", [
      totalPrice,
      userId,
      paymentStatus,
      paypalOrderId,
    ]);

    return serverResponse({
      success: true,
      message: "Order added successfully",
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
