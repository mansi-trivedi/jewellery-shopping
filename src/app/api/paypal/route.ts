// import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";
import axios from "axios";
import getToken from "./paypalToken";

export const revalidate = 0;

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
    console.log("requestBody", requestBody);
    const accessToken = await getToken();

    const paypalResponse = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "1",
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { id: orderId } = paypalResponse.data;
    return serverResponse({
      success: true,
      message: "Added to Wishlist",
      data: orderId,
    });
  } catch (error) {
    console.log("error", error);
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
    });
  }
}
