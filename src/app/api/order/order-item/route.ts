import { CompleteOrderAndCreateItemsParams } from "@/app/data/order";
import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";

export async function POST(request: Request) {
  try {
    const payload = (await decodeAndGetUserInfo()) ?? {};
    const requestBody: CompleteOrderAndCreateItemsParams = await request.json();

    const {
      orderId,
      paymentStatus,
      orderItems,
      paymentId,
      paymentDate,
      paymentMethod,
      amount,
      addressLine1,
      addressLine2,
      adminAria1,
      adminAria2,
      countryCode,
      postalCode,
      recipientName,
    } = requestBody ?? {};

    // 1. Validate the request body
    if (
      !orderId ||
      !paymentStatus ||
      !orderItems ||
      !Array.isArray(orderItems) ||
      !paymentId ||
      !paymentDate ||
      !paymentMethod ||
      amount === undefined ||
      payload.userId === undefined
    ) {
      return serverResponse({
        success: false,
        message:
          "Invalid request body.  orderId, paymentStatus, orderItems (as an array), paymentId, paymentDate, paymentMethod, amount and userId are required.",
        status: 400,
      });
    }

    // 2.  Convert orderItems to JSON string.
    const orderItemsJson = JSON.stringify(
      orderItems.map((item) => ({
        ...item,
        price: parseFloat(item.price.toString()),
      }))
    );

    // 3. Execute the stored procedure
    await executeQuery(
      "CALL CompleteOrderAndCreateItems(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        orderId,
        paymentStatus,
        orderItemsJson,
        paymentId,
        paymentDate,
        paymentMethod,
        amount,
        payload.userId,
        addressLine1,
        addressLine2,
        adminAria1,
        adminAria2,
        postalCode,
        countryCode,
        recipientName,
      ]
    );

    return serverResponse({
      success: true,
      message: "Order completed and payment details added successfully",
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
