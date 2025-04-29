import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";
import { Order, OrderItem } from "types/order";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const rows = await executeQuery("call GetUserOrders(?)", [userId]);
    const orderDetails = rows[0] as Array<Order>;
    const orderItems = rows[1] as Array<OrderItem>;

    return serverResponse({
      success: true,
      data: {
        orderDetails: orderDetails,
        orderItems: orderItems,
      },
    });
  } catch (error) {
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
      data: null,
    });
  }
}

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
