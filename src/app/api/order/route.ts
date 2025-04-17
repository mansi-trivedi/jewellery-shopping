import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { totalPrice, paypalOrderId, userId, paymentStatus } =
      requestBody ?? {};

    /** Inserting order with paypal order id in order table */
    const [rows] = await executeQuery(
      "call InsertNewOrderWithPaypalId(?, ?, ?, ?)",
      [totalPrice, userId, paymentStatus, paypalOrderId]
    );
    const orderId = (rows[0]?.orderId ?? "") as string;

    return serverResponse({
      success: true,
      message: "Order added successfully",
      data: orderId,
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
    const requestBody = await request.json();
    const { orderId } = requestBody ?? {};
    /** Deleting order from table */
    await executeQuery("call DeleteOrder(?)", [orderId]);
    return serverResponse({
      success: true,
      message: "order deleted successfully",
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
